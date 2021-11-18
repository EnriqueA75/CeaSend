import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios'
import React, {useState, useContext} from 'react';
import archivoContext from '../../context/archivos/archivoContext'
import Alerta from '../../components/Alerta'

export async function getStaticProps({params}){

    const {enlace} = params;
    console.log(enlace)
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`) 
    console.log(resultado)

    return {
        props: {
            enlace: resultado.data
        }
    }
}
export async function getStaticPaths(){
    const enlaces = await clienteAxios.get('/api/enlaces');
    return {
        paths: enlaces.data.map(enlace => ({
            params: { enlace : enlace.url}
        })),
        fallback: false
    }
}

const Enlace = ({enlace}) => {

    const ArchivoContext = useContext(archivoContext)
    const { mostrarAlerta, alerta } = ArchivoContext

    const [tienePassword, setTienePassword] = useState(enlace.password)
    const [password, setPassword] = useState('')
    
    const verificarPassword = async (e) => {
        e.preventDefault()
        const data = {
            password
        }
        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data)
            setTienePassword(resultado.data.password)
        } catch (error) {
            mostrarAlerta(error.response.data.msg)
        }
        
    }

    return ( 
        <Layout>
            { tienePassword ? (
                <>
                <p className="text-center">Este enlace está protegido con contraseña, colocala para acceder a él</p>
                {alerta && <Alerta />}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={e => verificarPassword(e)}
                        >
                    <div className="mb-4">
                    <label 
                        className="block text-gray-800 text-sm font-bold mb-2"
                        htmlFor="password"
                    >Contraseña</label>
                    <input
                        type="password"
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                    type="submit"
                    className="bg-white rounded-lg font-bold text-red-500 px-5 py-3 uppercase border-2 border-red-500 w-full cursor-pointer hover:border-green-600 hover:text-green-600"
                    value="Validar Contraseña"
                    />
                    </div>
                        </form>
                    </div>
                </div>
                </>
            ) : (
                <>
                <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
                <div className="flex items-center justify-center mt-10">
                    <a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} className="bg-white rounded-lg font-bold text-green-500 px-5 py-3 uppercase border-2 border-green-500  cursor-pointer hover:border-yellow-600 hover:text-blue-600 text-center">Aquí</a>
                </div>
                </>
             )}
        </Layout>
    );
}
export default Enlace
