import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../store'
import { Divider } from './Divider'
import { NavigationButtons } from './NavigationButtons'

export const FileList = () => {
    const [state, actions] = useContext(AppContext)
    const [showAddFolder, setShowAddFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");


    useEffect(() => {
        actions.loadFiles()
    }, [state.selectedContainer])

    return <ul className="list-group list-group-flush rounded-3">
        <li className="list-group-item bg-gray">
            <NavigationButtons />

            <div className="m-3 buttons-list">
                <i className="bi bi-file-earmark-plus" onClick={() => console.log('TODO')}></i>
                <Divider plain={true} />
                <i className="bi bi-folder-plus" onClick={() => setShowAddFolder(true)}></i>
            </div>

        </li >
        {   // Folder name input
            showAddFolder ?
                <li className="list-group-item bg-gray">
                    < label htmlFor="newFolderName" className="form-label" > folder name</label >
                    <input type="text" className="form-control" id="newFolderName" placeholder="myfolder" value={newFolderName} onChange={e => setNewFolderName(e.target.value)} />

                    <i className="bi bi-x" onClick={() => { setShowAddFolder(false); setNewFolderName("") }}></i>
                    <Divider plain={true} />
                    <i className="bi bi-check" onClick={() => {
                        actions.createFile({ name: newFolderName, type: 'folder', parent_file_id: state.selectedFile })
                    }}></i>

                </li >
                : null
        }

        {
            state.files && state.files.filter(file => file.parent_file_id == state.selectedFile).map(file =>
                <li className="list-group-item bg-gray" key={file.id} onClick={() => actions.selectFile(file.id)}>
                    {file.name}
                    <div className="buttons-list d-inline float-end">
                        <i className="bi bi-pencil-square"></i>
                        <Divider plain={true} />
                        <i className="bi bi-trash" onClick={(e) => {
                            e.stopPropagation()
                            let really = confirm('Delete `' + file.name + '`?');
                            if(really)
                                actions.deleteFile({file_id: file.id})
                        }}></i>
                    </div>
                </li>
            )
        }

    </ul >


}