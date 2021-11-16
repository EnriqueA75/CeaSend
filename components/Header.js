import React, {useContext, useEffect} from 'react';
import Link from 'next/link'
import authContext from '../context/auth/authContext';
import archivoContext from '../context/archivos/archivoContext';
import { useRouter } from 'next/router'

const Header = () => {

    const router = useRouter()

    const AuthContext = useContext(authContext)
    const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext

    const ArchivoContext = useContext(archivoContext)
    const { limpiarState } = ArchivoContext

    useEffect(() => {
        usuarioAutenticado()
    }, [])

    const redireccionar = () => {
        router.push('/')
        limpiarState()
    }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <div>
                <p  onClick={() => redireccionar()} className="mb-8 text-2xl font-bold text-red-500	md:mb-0 cursor-pointer">CEASEND</p>
            </div>
            <div>
                {usuario ? (
                <div className="flex items-center">
                    <p className="rounded-lg font-bold text-red-500 px-5 py-3 uppercase text-center">Bienvenido: {usuario.nombre}</p>
                    <button
                        type="buton"
                        className="ml-8 bg-white rounded-lg font-bold text-black px-5 py-3 uppercase border-2 border-black"
                        onClick={() => cerrarSesion()}
                    >Cerrar Sesion</button>
                </div>
                ) : (
                <>
                    <Link href={"/login"}>
                        <a className="bg-white rounded-lg font-bold text-red-500 px-5 py-3 uppercase border-2 border-red-500">Iniciar Sesión</a>
                    </Link>
                    <Link href={"/crearcuenta"}>
                        <a className="ml-8 bg-white rounded-lg font-bold text-black px-5 py-3 uppercase border-2 border-black">Crear Cuenta</a>
                    </Link>
                </>
                )}
            </div>
        </header>
     );
}
 
export default Header;
