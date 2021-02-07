import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../store'

export const Breadcrumb = () => {
    const [state, actions] = useContext(AppContext)
    const [files, setFiles] = useState([]);

    useEffect(() => {
        var _currentFileID = state.selectedFile
        var _file;
        var _files = [];

        while (_file = actions.getFile(_currentFileID)) {
            _files.push(_file)
            _currentFileID = actions.getFile(_currentFileID).parent_file_id
        }

        setFiles(_files);
    }, [actions.selectedFile, state])


    return <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": " url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E\")" }}>
        <ol className="breadcrumb">
            <li className="breadcrumb-item" onClick={() => actions.selectFile()}><i className={"bi bi-house"}></i></li>

            {
                files.reverse().map((file, index, files) =>
                    <li className={`breadcrumb-item ${files.length - 1 === index ? ' active ' : ' '}`} key={file.id}><a onClick={() => actions.selectFile(file.id)}>{file.name}</a></li>
                )  
            }
        </ol>
    </nav>
} 