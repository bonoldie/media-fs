import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../store'
import { Divider } from './Divider'

export const Navigator = () => {
    const [state, actions] = useContext(AppContext)
    const [showAddFolder, setShowAddFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");


    useEffect(() => {
        actions.loadFiles()
    }, [state.selectedContainer])

    return <>
        <div className="row p-3 flex-grow-1" >
            <div className="p-0 col-sm-12 col-md-3 col-lg-3">
                <ul className="list-group list-group-flush">
                    {
                        state.containers && state.containers.map(container =>
                            <li className="list-group-item bg-gray rounded-3" key={container.id} onClick={() => actions.selectContainer(container.id)}>{container.name}</li>
                        )
                    }
                </ul>

            </div>
            <div className="p-0 col-sm-12 col-md-8 col-lg-8 offset-md-1 offset-lg-1">
                <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item bg-gray">
                        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": 0 }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><i className="bi bi-file-earmark-plus" onClick={() => console.log('TODO')}></i></li>
                                <Divider />
                                <li className="breadcrumb-item"><i className="bi bi-folder-plus" onClick={() => setShowAddFolder(true)}></i></li>
                            </ol>
                        </nav>
                    </li>
                    {
                        showAddFolder ?
                            <li className="list-group-item bg-gray">
                                <label htmlFor="newFolderName" className="form-label">folder name</label>
                                <input type="text" className="form-control" id="newFolderName" placeholder="myfolder" value={newFolderName} onChange={e => setNewFolderName(e.target.value)} />

                                <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": 0 }}>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><i className="bi bi-x" onClick={() => { setShowAddFolder(false); setNewFolderName("") }}></i></li>
                                        <Divider />
                                        <li className="breadcrumb-item"><i className="bi bi-check" onClick={() => {
                                            actions.createFile({ name: newFolderName, type: 'folder' , parent_file_id: state.selectedFile})
                                        }}></i></li>
                                    </ol>
                                </nav>

                            </li>
                            : null
                    }

                    {
                        state.files && state.files.filter(file => file.parent_file_id == state.selectedFile).map(file =>
                            <li className="list-group-item bg-gray" key={file.id} onClick={() => actions.selectFile(file.id)}>{file.name}</li>
                        )
                    }

                </ul>

            </div>

        </div>
    </>
}