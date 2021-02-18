import React, { useContext } from 'react'
import { AppContext } from '../store'
import { Divider } from './Divider'

export const NavigationButtons = () => {
    const [state, actions] = useContext(AppContext)

    return <div className="m-3 buttons-list">
        <i className="bi bi-house" onClick={() => actions.selectFile()}></i>
        <Divider plain={true} />
        <i className="bi bi-arrow-left-square" onClick={() => actions.gotoParent()}></i>
    </div>
}