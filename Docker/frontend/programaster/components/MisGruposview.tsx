import Head from 'next/head';
import Link from "next/link";
import { useEffect, useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import ViewLayout from './layouts/common/ViewLayout';

export default function Home() {
  const { user } = useContext(AuthContext)
  const [matriculas, setMatriculas] = useState()
  const [grupos, setGrupos] = useState([])
  const [editos, setEditos] = useState([])

  useEffect(() => {
    if (user) {
      try {
        const decodedUser: any = jwtDecode(user);
        setMatriculas(decodedUser.user_id)
      } catch {
        setMatriculas(user.user_id)
      }
    }
    try {
      axios.get('http://127.0.0.1:9200/my_view/usuarioGrupo/', {
        params: {
          matricula_nomina: user.user_id
        }
      }).then(response => {
        const dataGrupo = response.data
        setEditos(dataGrupo)
      })
  
    } catch {
      console.log("Error getting groups");
  
    }
  
  }, [user]);
  useEffect(() => {
    try {
      const id_de_grupo= editos[0].grupo_id
      axios.get('http://127.0.0.1:9200/my_view/grupo/', {
        params: {
          grupo_id : id_de_grupo
        }
      }). then((response) => {
        console.log(response.data)
        setGrupos(response.data)
      })
    } catch {

    }
  }, [editos])

  return (
    <>
      <Head>
        <title>Mis Grupos </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ViewLayout>
        <nav className="bg-transparent py-3 px-8 flex items-center justify-end h-[12%]">
          <button className="btn btn-primary text-base">
            <Link rel="stylesheet" href="/userview/Addgroupview/">Registrar grupo</Link>
          </button>
        </nav>
        <div className='py-4 grid grid-cols-1 gap-8 md:pt-6 md:pb-8 md:grid-cols-3 md:gap-12 lg:grid-cols-3 h-[88%]'>
          {grupos.map((grupo, index) => (
            <div key={index} className='flex items-start gap-4"'>
              <div className="card w-80 bg-base-100 shadow-xl ml-16">
                <figure><img src="/class.jpg" alt="Clase" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{grupo.nombre_grupo} ({grupo.grupo_id})</h2>
                  <p>En este espacio se han integrado las actividades y recursos que te servirán de guía para desarrollar las subcompetencias correspondientes a esta unidad de formación.</p>
                  <Link href="/userview/Modulosview">
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Ver</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ViewLayout>


    </>

  )
}