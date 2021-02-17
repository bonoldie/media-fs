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


    return <div className="row p-3">
        <div className="col-12  rounded-3 bg-gray" >
            <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": 0 }}>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" onClick={() => actions.selectFile()}><i className="bi bi-house"></i></li>
                    <Divider />
                    <li className="breadcrumb-item"><i className="bi bi-arrow-left-square" onClick={() => actions.gotoParent()}></i></li>
                </ol>
            </nav>
            <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": 0 }}>
                <ol className="breadcrumb">
                    <Divider />
                    {
                        files.reverse().map((file, index, files) => <Fragment>
                            {index !== 0 ? <Divider /> : null}
                            <li className={`breadcrumb-item ${files.length - 1 === index ? ' active ' : ' '}`} key={file.id}><a onClick={() => actions.selectFile(file.id)}>{file.name}</a></li>
                        </Fragment>
                        )
                    }
                </ol>
            </nav>
        </div>
    </div>
} 