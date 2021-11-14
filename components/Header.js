import React, {useContext} from 'react';
import Link from 'next/link'
import authContext from '../context/auth/authContext';

const Header = () => {

    const AuthContext = useContext(authContext)
    const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href={"/"}>
                <p className="mb-8 text-2xl font-bold text-red-500	md:mb-0 ">CEASEND</p>
            </Link>
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
