import React, { useContext, useEffect } from 'react'
import { AppContext } from '../store';
import { Navigator } from './Navigator';
import { Breadcrumb } from './Breadcrumb';
import { OptionMenu } from './OptionMenu';

/**
 * Main app component
 */
export const Main = () => {
    const [state, actions] = useContext(AppContext)


    useEffect(() => {
        actions.loadContainers()
    }, [])

    return <div className="container-fluid d-flex flex-column" style={{ height: "100%" }}>
        
        <div className="row p-3">
            <div className="col-12  rounded-3 bg-gray" >
                <Breadcrumb />
            </div>
        </div>

        <Navigator />
        <OptionMenu />
    </div>
}