import axios from 'axios'
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { dangerNotification, downloadFile, successNotification, textToBlob, textToFile, warningNotification } from './utils'

/** Simple redux-like store */

export const AppContext = createContext()

export const notificatioID = () => [Math.random().toString(36).substr(2), Math.random().toString(36).substr(2)].join('-')

/**
 * ##############################
 * ######## RAW ACTIONS #########
 * ##############################
 */

// Notifications
const ADD_NOTIFICATION = "ADD_NOTIFICATION"
const SHOW_NOTIFICATION = "SHOW_NOTIFICATION"
const HIDE_NOTIFICATION = "HIDE_NOTIFICATION"
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION"

// Containers
const CREATE_CONTAINER = "CREATE_CONTAINER"
const UPDATE_CONTAINER = "UPDATE_CONTAINER"
const DELETE_CONTAINER = "DELETE_CONTAINER"

const SELECT_CONTAINER = "SELECT_CONTAINER"
const LOAD_CONTAINERS = "LOAD_CONTAINERS"

// Files
const CREATE_FILE = "CREATE_FILE"
const CREATE_FILE_SUCCESS = "CREATE_FILE_SUCCESS"
const CREATE_FILE_ERROR = "CREATE_FILE_ERROR"

const UPDATE_FILE = "UPDATE_FILE"
const UPDATE_FILE_SUCCESS = "UPDATE_FILE_SUCCESS"
const UPDATE_FILE_ERROR = "UPDATE_FILE_ERROR"

const DELETE_FILE = "DELETE_FILE"
const DELETE_FILE_SUCCESS = "DELETE_FILE_SUCCESS"
const DELETE_FILE_ERROR = "DELETE_FILE_ERROR"

const SELECT_FILE = "SELECT_FILE"
const LOAD_FILES = "LOAD_FILES"


/**
 * ##############################
 * ########## ACTIONS ###########
 * ##############################
 */

/**
 * Notifications
 */

const notify = dispatch => ({ message, options: { type, icon } }) => {
    const id = notificatioID()
    const defaultTimeout = 4000

    // Animation
    dispatch({ type: ADD_NOTIFICATION, payload: { id, message, type, icon } })

    setTimeout(() => dispatch({ type: SHOW_NOTIFICATION, payload: { id } }), 200, dispatch)

    setTimeout((dispatch) => {
        dispatch({ type: HIDE_NOTIFICATION, payload: { id } })

        setTimeout((dispatch) => {
            dispatch({ type: REMOVE_NOTIFICATION, payload: { id } })

        }, 2000, dispatch)
    }, defaultTimeout, dispatch)

    return id
}

const removeNotification = dispatch => id => {
    const defaultTimeout = 400

    // Animation
    dispatch({ type: HIDE_NOTIFICATION, payload: { id } })

    setTimeout((dispatch) => {
        dispatch({ type: REMOVE_NOTIFICATION, payload: { id } })

    }, 2000, dispatch)
}

/**
 * Containers
 */

const loadContainers = dispatch => () => {
    axios.get(`${process.env.APP_URL}api/container`).then((response) => {
        dispatch({ type: LOAD_CONTAINERS, payload: response.data.data })
        notify(dispatch)(successNotification('Containers loaded'))
    }).catch(() => {
        notify(dispatch)(dangerNotification('Cannot load the containers.'))
    })
}

const selectContainer = dispatch => id => {
    dispatch({ type: SELECT_CONTAINER, payload: id })
}

/**
 * Files
 */

const deleteFile = (dispatch, state) => (file) => {
    axios.delete(`${process.env.APP_URL}api/file/${file.file_id}`, { params: { container_id: state.selectedContainer } }).then((response) => {
        notify(dispatch)(successNotification(response.data.message))
        loadFiles(dispatch, state)()
    }).catch((error) => {
        notify(dispatch)(dangerNotification(error.response.data.message))
    })
}

const createFile = (dispatch, state) => (file) => {
    dispatch({ type: CREATE_FILE })

    axios.post(`${process.env.APP_URL}api/file`, { ...file, ...{ container_id: state.selectedContainer } }).then((response) => {
        dispatch({ type: CREATE_FILE_SUCCESS, payload: response.data })
        notify(dispatch)(successNotification(response.data.message))
        loadFiles(dispatch, state)()
    }).catch((error) => {
        dispatch({ type: CREATE_FILE_ERROR, payload: error.response.data })
        notify(dispatch)(dangerNotification(error.response.data.message))
    })
}

const updateFile = (dispatch, state) => (file) => {
    dispatch({ type: UPDATE_FILE })

    axios.put(`${process.env.APP_URL}api/file/${file.id}`, { ...file, ...{ container_id: state.selectedContainer } }).then((response) => {
        dispatch({ type: UPDATE_FILE_SUCCESS, payload: response.data })
        // notify(dispatch)(successNotification(response.data.message))
        loadFiles(dispatch, state)()
    }).catch((error) => {
        dispatch({ type: UPDATE_FILE_ERROR, payload: error.response.data })
        notify(dispatch)(dangerNotification(error.response.data.message))
    })
}

const loadFiles = (dispatch, state) => () => {
    if (state.selectedContainer) {
        axios.get(`${process.env.APP_URL}api/file`, { params: { container_id: state.selectedContainer } }).then((response) => {
            dispatch({ type: LOAD_FILES, payload: response.data.data })
            // notify(dispatch)(successNotification('Files loaded'))
        }).catch(() => {
            // notify(dispatch)(dangerNotification('Cannot load the files.'))
        })
    }
}

// Enter a folder or download a file
const selectFile = (dispatch, state) => id => {
    // Checks if file exists
    if (state.files.filter(file => file.id == id).length > 0) {
        var file = state.files.filter(file => file.id === id)[0]

        // Query file type
        if (file.type === "file") {

            // Try download it
            axios.get(`${process.env.APP_URL}api/file/download/${file.id}`, { params: { container_id: state.selectedContainer } }).then(
                (res) => {
                    var downloadedFile = textToBlob(res.data)

                    //console.log(downloadedFile)

                    if (downloadedFile) {
                        downloadFile(downloadedFile, file.name)

                        notify(dispatch)(successNotification("File downloaded"))
                    } else {
                        notify(dispatch)(warningNotification("File downloaded with encoding error"));
                    }

                }
            ).catch((error) => {
                console.log(error)
                notify(dispatch)(dangerNotification("Cannot donwload the file"))
            })

            return;
        }
    }
    dispatch({ type: SELECT_FILE, payload: id })
}

const gotoParent = (dispatch, state) => () => {
    const currentFile = state.files.filter(file => file.id === state.selectedFile)
    if (currentFile.length === 1) {
        dispatch({ type: SELECT_FILE, payload: currentFile[0].parent_file_id })
    }
}

const getFile = (state) => (id) => {
    const currentFile = state.files.filter(file => file.id === id)
    if (currentFile.length === 1) {
        return currentFile[0]
    }
    return null
}


/**
 * ##############################
 * ########## REDUCER ###########
 * ##############################
 */

const defaultState = {
    files: [],
    containers: [],
    selectedContainer: null,
    selectedFile: null,
    notifications: new Map()
}

const AppReducer = (state, action) => {
    switch (action.type) {
        // Notifications
        case ADD_NOTIFICATION:
            state.notifications.set(action.payload.id, action.payload)
            return { ...state }
        case SHOW_NOTIFICATION:
        case HIDE_NOTIFICATION:
            var newNotification = state.notifications.get(action.payload.id)

            if (!newNotification)
                return { ...state }

            newNotification.show = action.type == SHOW_NOTIFICATION
            state.notifications.set(action.payload.id, newNotification)

            return { ...state }
        case REMOVE_NOTIFICATION:
            state.notifications.delete(action.payload.id)
            return { ...state }
        // Containers
        case LOAD_CONTAINERS:
            state.containers = action.payload
            return { ...state }
        case SELECT_CONTAINER:
            state.selectedContainer = action.payload
            return { ...state }
        // Files
        case LOAD_FILES:
            state.files = action.payload
            return { ...state }
        case SELECT_FILE:
            state.selectedFile = action.payload
            return { ...state }
        default:
            return { ...state }
    }
}

/**
 * ##############################
 * ########## PROVIDER ##########
 * ##############################
 */

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, defaultState)

    const actions = {
        // notifications
        notify: notify(dispatch),
        removeNotification: removeNotification(dispatch),
        // containers
        loadContainers: loadContainers(dispatch),
        selectContainer: selectContainer(dispatch),
        // files    
        loadFiles: loadFiles(dispatch, state),
        selectFile: selectFile(dispatch, state),
        gotoParent: gotoParent(dispatch, state),
        getFile: getFile(state),
        createFile: createFile(dispatch, state),
        deleteFile: deleteFile(dispatch, state),
        updateFile: updateFile(dispatch,state)
    }

    // Testing purpose
    useEffect(() => {
        console.groupCollapsed('## Store state updated ##')
        console.log(state)
        console.groupEnd()
    }, [state])

    window.store = [state, dispatch, actions]

    return <AppContext.Provider value={[state, actions]}>
        {[children]}
    </AppContext.Provider>
}