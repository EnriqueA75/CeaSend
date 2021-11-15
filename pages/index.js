import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import archivoContext from '../context/archivos/archivoContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import Alerta from '../components/Alerta';

const Index = () => {

  const ArchivoContext = useContext(archivoContext)
  const { alerta } = ArchivoContext

  const AuthContext = useContext(authContext)
  const { usuarioAutenticado, usuario } = AuthContext

  useEffect(()=> {
    usuarioAutenticado()
  },[])

  return (

     <Layout>
       <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
         {alerta && <Alerta/>}
         <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            <Dropzone/>
           <div className="md: flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 className="text-4xl font-sans font-bold text-gray-700 my-4"> Comparte archivos de forma sencilla y privada</h2>
            <p className=" text-lg leading-loose font-bold text-gray-700">
              <span className="text-red-500 font-bold">Ceasend React</span> te permite compartir archivos con cifrado extremo a extremo y el archivo será eliminado despues de ser descargado, de esta forma lo que commpartes será privado y tus cosas no permanecerán en línea
            </p>
            <Link href="/crearcuenta">
              <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para más beneficios</a>
            </Link>
           </div>
         </div>
       </div>
     </Layout>
  )
}

export default Index