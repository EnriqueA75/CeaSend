import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik'; 
import * as Yup from 'yup'
import authContext from '../context/auth/authContext';
import Alerta from '../components/Alerta';

const CrearCuenta = () => {

  const AuthContext = useContext(authContext)
  const { registrarUsuario, mensaje } = AuthContext

  //Form y validación con Formik y YUP
  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password:''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),      
      email: Yup.string().email('No es un email válido').required('El email es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe contener al menos 6 caracteres')
    }),
    onSubmit: (valores) => {
      registrarUsuario(valores)
    }
  })

  return (
     <Layout>
        <div className="md:w-4/5 xl:w-4/5 mb-32">
          <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crea tu cuenta</h2>
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
                    htmlFor="nombre"
                  >Nombre</label>
                  <input
                    type="text"
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nombre"
                    placeholder="Nombre de usuario"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}                
                  />
                </div>
                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-600 text-red-600">
                    <p className="font-bold">Error</p>
                    <p className="font-bold">{formik.errors.nombre}</p>
                  </div>
                ): null}
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
                  value="Crear cuenta"
                />
              </form>
            </div>
          </div>
        </div>
     </Layout>
  )
}

export default CrearCuenta