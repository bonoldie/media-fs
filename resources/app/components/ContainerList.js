import React, { useContext } from 'react'
import { AppContext } from '../store'

/**
 * The sidebar container list
 */
export const ContainerList = () => {
    const [state, actions] = useContext(AppContext)

    return <ul className="list-group list-group-flush">
        {
            state.containers.length > 0 && state.containers.map(container =>
                <li className="list-group-item bg-gray rounded-3" key={container.id} onClick={() => actions.selectContainer(container.id)}>{container.name}</li>
            )
        }
    </ul>


}