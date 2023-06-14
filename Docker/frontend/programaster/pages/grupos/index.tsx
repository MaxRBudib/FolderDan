import Head from 'next/head';
import Link from "next/link";
import LayoutProf from '@/components/layouts/common/LayoutProf';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const Navbar = () => {
  return (
    <nav className="bg-transparent py-4 px-8 flex items-center justify-end">
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md " style={{ fontSize: '1.2rem' }}>
        <Link rel="stylesheet" href="/userview/Creategroupview/" >Agregar Grupo </Link>
      </button>
    </nav>
  );
}

export default function Home() {
  const { user } = useContext(AuthContext)
  const [matriculas, setMatriculas] = useState()
  const [grupos, setGrupos] = useState([])
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
      axios.get('http://127.0.0.1:8000/my_view/grupo/', {
        params: {
          profe_nomina: user.user_id
        }
      }).then(response => {
        const dataGrupo = response.data
        setGrupos(dataGrupo)
      })

    } catch {
      console.log("Error getting groups");

    }

  }, [user]);
  return (
    <>
      <Head>
        <title>Mis Grupos </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutProf>
        <Navbar />

        <div className='mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-3 md:gap-12 lg:grid-cols-3"'>
          {grupos.map((grupo, index) => (
            <div key={index} className='flex items-start gap-4"'>
              <div className="card w-80 bg-base-100 shadow-xl ml-16">
                <figure><img src="/class.jpg" alt="Clase" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{grupo.nombre_grupo} ({grupo.grupo_id})</h2>
                  <p>En este espacio se han integrado las actividades y recursos que te servirán de guía para desarrollar las subcompetencias correspondientes a esta unidad de formación.</p>
                  <Link href={`/Modulos/${grupo.grupo_id}`}>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Ver</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>


      </LayoutProf>


    </>

  )
}