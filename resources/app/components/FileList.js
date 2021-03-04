import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../store'
import { Divider } from './Divider'

export const FileList = () => {
    const [state, actions] = useContext(AppContext)
    const createFolderInputRef = useRef(null);
    const [showAddFolder, setShowAddFolder] = useState(false)
    const [newFolderName, setNewFolderName] = useState("")
    const [showingDropItem, showDropzone] = useState(false)

    useEffect(() => {
        actions.loadFiles()
    }, [state.selectedContainer])

    // Create folder
    const handleCreateFolder = (e) => {
        // form submit redirect prevention
        e.preventDefault()

        actions.createFile({ name: newFolderName, type: 'folder', parent_file_id: state.selectedFile })
        setShowAddFolder(false)
    }

    const startCreateFolder = () => {
        setShowAddFolder(!showAddFolder)
        setNewFolderName("")
    }

    const endCreateFolder = () => {
        setShowAddFolder(false)
        setNewFolderName("")
    }

    const handleFileUpload = () => {
        // TODO
    }

    // File upload (drag&drop)
    const handleDragOver = (e) => {
        showDropzone(true)

        e.dataTransfer.dropEffect = "copy"

        e.preventDefault()
    }

    const storeDropFile = (e) => {
        e.preventDefault()

        // Checks container and dropped file
        if (state.selectedContainer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            var file = e.dataTransfer.files[0]

            // Reader update
            var reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = function () {
                actions.createFile({ name: file.name, type: 'file', file: reader.result, parent_file_id: state.selectedFile })
            }
        }

        showDropzone(false)
    }

    const handleDeleteFile = (file) => (e) => {
        e.stopPropagation()
        let really = confirm('Sure ?')
        if (really)
            actions.deleteFile({ file_id: file.id })
    }

    const handleEditFile = (file) => (e) => {
        // TODO
    }

    const handleFileDragStart = (file) => (e) => {
        e.dataTransfer.dropEffect = "move"
        e.dataTransfer.setData('text/plain', (file.id))
    }

    const handleFileDrop = (file) => (e) => {
        actions.updateFile({ id: e.dataTransfer.getData("text/plain"), parent_file_id: file.id })
    }


    return <div onDrop={storeDropFile} onDragOver={handleDragOver} onDragLeave={() => showDropzone(false)} className="col-12 h-100 d-flex flex-column">
        <ul className="list-group list-group-flush rounded-3 ">
            <li className="list-group-item bg-gray">
                <div className="m-3 buttons-list">
                    <i className="bi bi-file-earmark-plus" onClick={() => console.log('TODO')}></i>
                    <Divider plain={true} />
                    <i className="bi bi-folder-plus" onClick={startCreateFolder}></i>
                    <Divider plain={true} />
                    <i className="bi bi-file-earmark-arrow-up" onClick={handleFileUpload}></i>
                </div>

            </li >
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
        </ul>
        <ul className={"list-group list-group-flush file-list scroll-anim"} >

            <li className={`list-group-item bg-gray p-4 ${showAddFolder ? '' : ' d-none '}`}>
                < label htmlFor="newFolderName" className="form-label" > folder name</label >
                <form onSubmit={handleCreateFolder}>
                    <input type="text" className="form-control mb-2" id="newFolderName" placeholder="myfolder" value={newFolderName} onChange={e => setNewFolderName(e.target.value)} ref={createFolderInputRef} />
                </form>

                <i className="bi bi-x" onClick={endCreateFolder}></i>
                <Divider plain={true} />
                <i className="bi bi-check" onClick={handleCreateFolder}></i>

            </li >


            {
                // Render file 
                state.files && state.files.filter(file => file.parent_file_id == state.selectedFile).map(file =>
                    <li className="list-group-item bg-gray file-list-item" key={file.id} onClick={() => actions.selectFile(file.id)} onDragStart={handleFileDragStart(file)} draggable onDrop={handleFileDrop(file)}>
                        <i className={`bi bi-${file.type}`}></i>
                        <Divider plain={true} />
                        {file.name}
                        <div className="buttons-list d-inline float-end">
                            <i className="bi bi-pencil-square" onClick={handleEditFile(file)} ></i>
                            <Divider plain={true} />
                            <i className="bi bi-trash" onClick={handleDeleteFile(file)}></i>
                        </div>
                    </li>
                )
            }
            <li className={`list-group-item bg-gray drop-file-item 
                ${showingDropItem ?
                    ' drop-file-item-highlight ' + (state.selectedContainer ? `` : ` bg-danger text-white `) :
                    ''}`}>
                {state.selectedContainer ? <i className="bi bi-file-earmark-arrow-up"></i> : <i className="bi bi-dash-circle"></i>}

                <Divider plain={true} />
                {state.selectedContainer ? "Upload" : "No container selected"}
            </li>
        </ul >
    </div>
}