import React from 'react'
import { ContainerList } from './ContainerList'
import { FileList } from './FileList'

/** 
 * Main files and containers navigator.
 * 
 * Mainly contains lists
 */
export const Navigator = () => {
    return <div className="row p-3 flex-grow-1" >
        <div className="p-0 col-sm-12 col-md-3 col-lg-3">
            <ContainerList />
        </div>
        <div className={`p-0 col-sm-12 col-md-8 col-lg-8 offset-md-1 offset-lg-1 `}>
            <FileList />
        </div>
    </div>
} 