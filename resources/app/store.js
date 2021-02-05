/** Simple redux-like store */

import axios from 'axios'
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { dangerNotification, successNotification } from './utils'

export const AppContext = createContext()

export const notificatioID = () => [Math.random().toString(36).substr(2), Math.random().toString(36).substr(2)].join('-')

// Raw Actions

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
const UPDATE_FILE = "UPDATE_FILE"
const DELETE_FILE = "DELETE_FILE"

const SELECT_FILE = "SELECT_FILE"
const LOAD_FILES = "LOAD_FILES"

// Actions

// Notifications
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

    return id;
}

const removeNotification = dispatch => id => {
    const defaultTimeout = 400

    // Animation
    dispatch({ type: HIDE_NOTIFICATION, payload: { id } })

    setTimeout((dispatch) => {
        dispatch({ type: REMOVE_NOTIFICATION, payload: { id } })

    }, 2000, dispatch)
}

// Containers
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

// Files
const loadFiles = (dispatch, state) => () => {
    if (state.selectedContainer) {
        axios.get(`${process.env.APP_URL}api/file`, { params: { container_id: state.selectedContainer } }).then((response) => {
            dispatch({ type: LOAD_FILES, payload: response.data.data })
            notify(dispatch)(successNotification('Files loaded'))
        }).catch(() => {
            notify(dispatch)(dangerNotification('Cannot load the files.'))
        })
    }
}


const selectFile = dispatch => id => {
    dispatch({ type: SELECT_FILE, payload: id })
}

const gotoParent = (dispatch, state) => () => {
    const currentFile = state.files.filter(file => file.id === state.selectedFile);
    if(currentFile.length === 1){
        selectFile(dispatch)(currentFile[0].parent_file_id);
    }
}

// Reducer and Provider

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
            var newNotification = state.notifications.get(action.payload.id);

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
            state.containers = action.payload;
            return { ...state }
        case SELECT_CONTAINER:
            state.selectedContainer = action.payload;
            return { ...state }
        // Files
        case LOAD_FILES:
            state.files = action.payload;
            return { ...state }
        case SELECT_FILE:
            state.selectedFile = action.payload;
            return { ...state }
        default:
            return { ...state }
    }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, defaultState)

    const actions = {
        notify: notify(dispatch),
        removeNotification: removeNotification(dispatch),
        loadContainers: loadContainers(dispatch),
        loadFiles: loadFiles(dispatch, state),
        selectContainer: selectContainer(dispatch),
        selectFile: selectFile(dispatch),
        gotoParent: gotoParent(dispatch, state),
    }

    // For testing purpose
    // useEffect(() => {
    //     console.group('## Store state updated ##')
    //     console.log(state)
    //     console.groupEnd();
    // }, [state])

    window.store = [state, dispatch, actions]

    return <AppContext.Provider value={[state, actions]}>
        {[children]}
    </AppContext.Provider>
}