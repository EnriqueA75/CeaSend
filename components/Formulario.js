import React, {useState, useContext} from 'react';
import archivoContext from '../context/archivos/archivoContext'

const Formulario = () => {

    const [usaPassword, setUsaPassword] = useState(false)

    const ArchivoContext = useContext(archivoContext)
    const { agregarPassword, agregarDescargas } = ArchivoContext

    return ( 
        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gra-800">Eliminar tras</label>
                <select onChange={e => agregarDescargas(e.target.value)} className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500">
                    <option value="" selected disabled>--- Seleccione ---</option>
                    <option value="1" >1 Descargas</option>
                    <option value="5" >5 Descargas</option>
                    <option value="10" >10 Descargas</option>
                    <option value="20" >20 Descargas</option>
                </select>
            </div>
            <div className="mt-4">
                <div clasname="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">
                        Proteger con contraseña
                    </label>
                    <input 
                        type="checkbox" 
                        onChange={() => setUsaPassword(!usaPassword)}
                    />
                    {usaPassword && (
                        <input 
                            type="password" 
                            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                            onChange={e => agregarPassword(e.target.value)}
                        />
                        
                    )}                    
                </div>                
            </div>
        </div>
    );
}
 
export default Formulario;