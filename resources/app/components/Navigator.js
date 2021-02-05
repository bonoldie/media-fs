import React, { useContext, useEffect } from 'react'
import { AppContext } from '../store'

export const Navigator = () => {
    const [state, actions] = useContext(AppContext)

    useEffect(() => {
        actions.loadFiles()
    }, [state.selectedContainer])

    return <>
    <div className="row">
        <div className="col-12">
            <i className="bi bi-arrow-left-square-fill" onClick={() => actions.gotoParent()}></i>
        </div>
    </div>
        <div className="row">
            <div className="col-3">
                <ul className="list-group list-group-flush">
                    {
                        state.containers && state.containers.map(container =>
                            <li className="list-group-item" key={container.id} onClick={() => actions.selectContainer(container.id)}>{container.name}</li>
                        )
                    }
                </ul>

            </div>
            <div className="col-9">
                <ul className="list-group list-group-flush">
                    {
                        state.files && state.files.filter(file => file.parent_file_id == state.selectedFile).map(file =>
                            <li className="list-group-item" key={file.id} onClick={() => actions.selectFile(file.id)}>{file.name}</li>
                        )
                    }
                </ul>

            </div>

        </div>
    </>
}