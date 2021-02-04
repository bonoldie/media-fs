import React, { useContext, useEffect } from 'react'
import { AppContext, dispatchNotification } from '../store'
import { successNotification } from '../utils';

export const Notification = () => {
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        dispatchNotification(dispatch, successNotification('Hi'))
        dispatchNotification(dispatch, successNotification('Hi'))
        dispatchNotification(dispatch, successNotification('Hi'))
    }, [])

    return (
        <div className="notifications-container">
            {state.notifications.size && [...state.notifications.values()].map(notification =>
                <div className={`notification bg-${notification.type} ${notification.show ? 'show' : ''}`} key={notification.id}>
                    <h2>{notification.message}</h2>
                    {notification.icon && <i className={`bi bi-${notification.icon}`}></i>}
                </div>
            )}
        </div>
    )
}