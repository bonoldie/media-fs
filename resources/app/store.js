/** Simple redux-like store */

import React, { createContext, useContext, useEffect, useReducer } from 'react'

export const AppContext = createContext()

export const notificatioID = () => [Math.random().toString(36).substr(2), Math.random().toString(36).substr(2)].join('-')

// Raw Actions

const ADD_NOTIFICATION = "ADD_NOTIFICATION"
const SHOW_NOTIFICATION = "SHOW_NOTIFICATION"
const HIDE_NOTIFICATION = "HIDE_NOTIFICATION"
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION"

// Actions

export const dispatchNotification = (dispatch, { message, options: { type, icon } }) => {
    const id = notificatioID()
    const defaultTimeout = 4000

    dispatch({ type: ADD_NOTIFICATION, payload: { id, message, type, icon, show: true } })


    setTimeout((dispatch) => {
        dispatch({ type: HIDE_NOTIFICATION, payload: { id } })

        setTimeout((dispatch) => {
            dispatch({ type: REMOVE_NOTIFICATION, payload: { id } })

        }, 2000, dispatch)
    }, defaultTimeout, dispatch)
}

// Reducer and Provider

const defaultState = {
    files: [],
    containers: [],
    notifications: new Map()
}

const AppReducer = (state, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            state.notifications.set(action.payload.id, action.payload)
            return { ...state }
        case HIDE_NOTIFICATION:
            var newNotification = state.notifications.get(action.payload.id);
            newNotification.show = false;
            state.notifications.set(action.payload.id, newNotification)
            return { ...state }
        case REMOVE_NOTIFICATION:
            state.notifications.delete(action.payload.id)
            return { ...state }
        default:
            return { ...state }
    }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, defaultState)

    // For testing purpose
    useEffect(() => {
        console.group('## Store state updated ##')
        console.log(state)
        console.groupEnd();
    }, [state])

    window.store = [state, dispatch]

    return <AppContext.Provider value={[state, dispatch]}>
        {[children]}
    </AppContext.Provider>
}