import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios'

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

export default ({enlace}) => {
    
    return ( 
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
            <div className="flex items-center justify-center mt-10">
                <a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} className="bg-white rounded-lg font-bold text-green-500 px-5 py-3 uppercase border-2 border-green-500  cursor-pointer hover:border-yellow-600 hover:text-blue-600 text-center">Aquí</a>
            </div>
        </Layout>
    );
}
