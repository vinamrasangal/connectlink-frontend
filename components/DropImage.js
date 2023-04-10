import React, { useEffect, useState } from 'react';
import {useDropzone} from 'react-dropzone';

function DropImage({children,setAcceptedFile,setUrl}) {
    const [files, setFiles] = useState([{preview:''}]);
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
            accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/svg': [],
            'image/jpg': [],
            'image/gif': []
            },
            onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            },
            maxFiles:1,
            maxSize:5000000
        });

        useEffect(()=>{
            setAcceptedFile(acceptedFiles)
        },[acceptedFiles])
        
        useEffect(()=>{
            if(files[0]){
                setUrl(files[files.length-1].preview);
            }
        },[files[0].preview])

    return (
        <section>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {children}
        </div>
        </section>
    );
}

export default DropImage;