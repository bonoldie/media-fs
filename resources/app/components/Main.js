import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../store';
import { Navigator } from './Navigator';

/**
 * Main app component
 */
export const Main = () => {
    const [state,actions] = useContext(AppContext)

  
    useEffect(() => {
        actions.loadContainers()
    }, [])

    return <div className="container-fluid">
        <Navigator />
    </div>
}