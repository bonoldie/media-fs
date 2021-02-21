import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../store'
import { Divider } from './Divider'
import { NavigationButtons } from './NavigationButtons'

export const FileList = () => {
    const [state, actions] = useContext(AppContext)
    const [showAddFolder, setShowAddFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [showingDropItem, showDropzone] = useState(false)

    useEffect(() => {
        actions.loadFiles()
    }, [state.selectedContainer])


    const setDropEffect = (e) => {
        e.stopPropagation()
        e.preventDefault()

        e.dataTransfer.dropEffect = "copy";
    }

    const storeDropFile = (e) => {
        e.stopPropagation()
        e.preventDefault()

        console.log(e.dataTransfer.files);
    }

    return <div onDragOver={setDropEffect} onDrop={storeDropFile} onDragEnter={() => showDropzone(true)} onDragLeave={() => showDropzone(false)}>
        <ul className="list-group list-group-flush rounded-3 ">
            <li className="list-group-item bg-gray">
                <div className="m-3 buttons-list">
                    <i className="bi bi-file-earmark-plus" onClick={() => console.log('TODO')}></i>
                    <Divider plain={true} />
                    <i className="bi bi-folder-plus" onClick={() => setShowAddFolder(true)}></i>
                </div>

            </li >
        </ul>
        <ul className="list-group list-group-flush rounded-3 file-list" >
            {   // Folder name input
                showAddFolder ?
                    <li className="list-group-item bg-gray p-4">
                        < label htmlFor="newFolderName" className="form-label" > folder name</label >
                        <input type="text" className="form-control mb-2" id="newFolderName" placeholder="myfolder" value={newFolderName} onChange={e => setNewFolderName(e.target.value)} />

                        <i className="bi bi-x" onClick={() => { setShowAddFolder(false); setNewFolderName("") }}></i>
                        <Divider plain={true} />
                        <i className="bi bi-check" onClick={() => {
                            actions.createFile({ name: newFolderName, type: 'folder', parent_file_id: state.selectedFile })
                        }}></i>

                    </li >
                    : null
            }


            { /* GoRoot item */}
            <li className={`list-group-item bg-gray  file-list-item ${state.selectedFile ? '' : ' disabled '}`} key={'goto_root'} onClick={() => actions.selectFile()}>
                <i className='bi bi-house'></i>
                <Divider plain={true} />
            ...
        </li>
            { /* GoBack item */}
            <li className={`list-group-item bg-gray  file-list-item ${state.selectedFile ? '' : ' disabled '}`} key={'goto_parent'} onClick={() => actions.gotoParent()}>
                <i className='bi bi-arrow-left-square'></i>
                <Divider plain={true} />
            ..
        </li>

            {
                // Render file 
                state.files && state.files.filter(file => file.parent_file_id == state.selectedFile).map(file =>
                    <li className="list-group-item bg-gray file-list-item" key={file.id} onClick={() => actions.selectFile(file.id)}>
                        <i className={`bi bi-${file.type}`}></i>
                        <Divider plain={true} />
                        {file.name}
                        <div className="buttons-list d-inline float-end">
                            <i className="bi bi-pencil-square"></i>
                            <Divider plain={true} />
                            <i className="bi bi-trash" onClick={(e) => {
                                e.stopPropagation()
                                let really = confirm('Delete `' + file.name + '`?');
                                if (really)
                                    actions.deleteFile({ file_id: file.id })
                            }}></i>
                        </div>
                    </li>
                )
            }

            <li className={`list-group-item bg-gray drop-file-item ${showingDropItem ? ' drop-file-item-highlight ' : ''}`}>
                <i className="bi bi-file-earmark-arrow-up"></i>
                <Divider plain={true} />
                Upload  
            </li>
        </ul >
    </div>
}