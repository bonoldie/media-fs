import React, { useContext } from 'react'
import { AppContext } from '../store'
/**
 * App notifications
 */
export const Notification = () => {
    const [state, actions] = useContext(AppContext);

    return (
        <div className="notifications-container">
            {state.notifications.size > 0 && [...state.notifications.values()].map(notification =>
                <div onClick={() => actions.removeNotification(notification.id)} className={`notification bg-${notification.type} ${notification.show ? 'show' : ''}`} key={notification.id}>
                    <h2>{notification.message}</h2>
                    {notification.icon && <i className={`bi bi-${notification.icon}`}></i>}
                </div>
            )}
        </div>
    )
}