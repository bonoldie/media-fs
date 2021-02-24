import React, { Fragment, useContext, useEffect, useState } from 'react'
import { AppContext } from '../store'
import { Divider } from './Divider';

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

    return <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": 0 }}>
        <ol className="breadcrumb">
            <Divider />
            {
                files.reverse().map((file, index, files) => <Fragment  key={file.id}>
                    {index !== 0 ? <Divider /> : null}
                    <li className={`breadcrumb-item ${files.length - 1 === index ? ' active ' : ' '}`}><a onClick={() => actions.selectFile(file.id)}>{file.name}</a></li>
                </Fragment>
                )
            }
        </ol>
    </nav>

} 