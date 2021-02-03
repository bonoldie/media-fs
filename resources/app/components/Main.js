import React, { useEffect, useState } from 'react'
import axios from 'axios'

/**
 * Main app component
 */
export const Main = () => {
    const [containers, setContainers] = useState([]);
    const [selectedContainer, selectContainer] = useState(null);

    const [files, setFiles] = useState([]);
    const [selectedFile, selectFile] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.APP_URL}api/container`).then((response) => {
            setContainers(response.data.data)
        }).catch(() => { })
    }, [])

    useEffect(() => {
        if (selectedContainer) {
            axios.get(`${process.env.APP_URL}api/file`, { params: { container_id: selectedContainer } }).then((response) => {
                setFiles(response.data.data);
            }).catch(() => {

            })
            selectFile(null);
        }
    }, [selectedContainer])

    return <div className="container-fluid">
        <div className="row">
            <div className="col-3">
                <ul className="list-group list-group-flush">
                    {
                        containers.map(container =>
                            <li className="list-group-item" key={container.id} onClick={() => selectContainer(container.id)}>{container.name}</li>
                        )
                    }
                </ul>

            </div>
            <div className="col-9">
                <ul className="list-group list-group-flush">
                    {
                        files.filter(file => file.parent_file_id == selectedFile).map(file =>
                            <li className="list-group-item" key={file.id} onClick={() => selectFile(file.id)}>{file.name}</li>
                        )
                    }
                </ul>

            </div>

        </div>
    </div>
}