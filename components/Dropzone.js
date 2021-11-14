import React, { useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import clienteAxios from '../config/axios'

const Dropzone = () => {
    
    const onDropAccepted = useCallback( async (acceptedFiles) => {

        const formData = new FormData()
        formData.append('Archivo no subible', acceptedFiles[0])

        const resultado = await clienteAxios.post('/api/archivos', formData)
    })
    const onDropRejected = () => {
        console.log('si')
    }
    const crearEnlace = () => {
        console.log('creando el enlace')
    }

    //extraer contenido del dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize: 5000000})

    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{archivo.path}</p>
            <p className="text-sm text-gra-500">{((archivo.size) / Math.pow(1024, 2)).toFixed(2)} MB bytes</p>
        </li>
    ))

    return ( 
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">
            {acceptedFiles.length > 0 ? (
            <div className="mt-10 w-full">
                <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                <ul>
                    {archivos}
                </ul>
                <button className="bg-blue-600 w-full py-3 rounded-lg text-white my-10  hover:bg-blue-800" type="button"
                        onClick={() => crearEnlace()}
                >
                    Crear Enlace
                </button>
            </div>
            ) : (
            <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                <input className="h-100" {...getInputProps()}/>
                    {
                        isDragActive ? <p className="text-2xl text-center text-gray-600"> Suelta el archivo </p> :
                        <div className="text-center">
                            <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aquí</p>
                            <button className="bg-blue-600 w-full py-3 rounded-lg text-white my-10  hover:bg-blue-800" type="button">Selecciona archivos para subir</button>
                        </div>
                    }
            </div>
            )} 
        </div>
     );
}
 
export default Dropzone;