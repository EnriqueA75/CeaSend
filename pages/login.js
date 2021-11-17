import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import 'tailwindcss/tailwind.css'
import { useFormik } from 'formik'; 
import * as Yup from 'yup'
import Link from 'next/link'
import authContext from '../context/auth/authContext';
import Alerta from '../components/Alerta';
import { useRouter } from 'next/router';

const Login = () => {
  
  const AuthContext = useContext(authContext)
  const { iniciarSesion, mensaje, autenticado } = AuthContext

  const router = useRouter()

  useEffect(() => {
    if(autenticado){
      router.push('/')
    }
  }, [autenticado])

  //Form y validación con Formik y YUP
  const formik = useFormik({
    initialValues: {
      email: '',
      password:''
    },
    validationSchema: Yup.object({   
      email: Yup.string().email('No es un email válido').required('El email es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria')
    }),
    onSubmit: (valores) => {
      iniciarSesion(valores)
    }
  })

  return (
     <Layout>
        <div className="md:w-4/5 xl:w-4/5 mb-32">
          <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Inicia sesión en tu cuenta</h2>
          {mensaje ? <Alerta/> : null}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form 
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-4">
                  <label 
                    className="block text-gray-800 text-sm font-bold mb-2"
                    htmlFor="email"
                  >Email</label>
                  <input
                    type="email"
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="Ejemplo@ejemplo.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-600 text-red-600">
                    <p className="font-bold">Error</p>
                    <p className="font-bold">{formik.errors.email}</p>
                  </div>
                ): null}
                <div className="mb-4">
                  <label 
                    className="block text-gray-800 text-sm font-bold mb-2"
                    htmlFor="password"
                  >Contraseña</label>
                  <input
                    type="password"
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="Tu Contraseña"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-600 text-red-600">
                    <p className="font-bold">Error</p>
                    <p className="font-bold">{formik.errors.password}</p>
                  </div>
                ): null}
                <input
                  type="submit"
                  className="bg-white rounded-lg font-bold text-red-500 px-5 py-3 uppercase border-2 border-red-500 w-full cursor-pointer hover:border-green-600 hover:text-green-600"
                  value="iniciar sesión"
                />
                <Link href={"crearcuenta"}>
                  <p className="text-blue-400 mt-4 cursor-pointer hover:text-gray-500">¿No tienes cuenta? Creala ahora</p>
                </Link>
              </form>
            </div>
          </div>
        </div>
     </Layout>
  )
}

export default Login