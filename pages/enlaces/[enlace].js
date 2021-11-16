import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios'

export async function getStaticProps(){
    const resultado = await clienteAxios.get('/api/enlaces/Cvvs2gOjKSmPqzBIYpsy8') 
    console.log(resultado)

    return {
        props: {
            enlace: resultado.data
        }
    }
}
export async function getStaticPaths(){
    const enlaces = await clienteAxios.get('/api/enlaces');
    console.log(enlaces)
    return {
        paths: enlaces.data.map(enlace => ({
            params: { enlace : enlace.url}
        })),
        fallback: false
    }
}

export default ({enlace}) => {
console.log(enlace, "dentro del render")
    return ( 
        <Layout>
            <h1>desde enlace [enlace].js</h1>
        </Layout>
    );
}
