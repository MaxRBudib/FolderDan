import Head from 'next/head';
import React from 'react';
import { useEffect, useState, useContext } from 'react';
import ViewLayout from '@/components/layouts/common/ViewLayout';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function Home() {
  const { user } = useContext(AuthContext)
  const [matriculas, setMatriculas] = useState()
  const [grupos, setGrupos] = useState()
  const [anuncios, setAnuncios] = useState([])

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
      axios.get('http://127.0.0.1:8000/my_view/usuarioGrupo/', {
        params: {
          matricula_nomina: user.user_id
        }
      }).then(response => {
        const dataGrupo = response.data[0].grupo_id
        console.log(dataGrupo)
        setGrupos(dataGrupo)
        try {
          axios.get('http://127.0.0.1:8000/my_view/anuncio/', {
            params: {
              grupo_id: dataGrupo
            }
          }).then(response => {
            const dataAnuncio = response.data

            console.log(dataAnuncio)
            setAnuncios(dataAnuncio)

          })

        } catch {
          console.log("Error getting groups");

        }
      })

    } catch {
      console.log("Error getting groups");

    }

  }, [user]);
  return (
    <>
      <Head>
        <title>Inicio view</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewLayout>
        <div className='bg-gradient-to-r from-blue-950 via-slate-800 to-slate-950 flex flex-col justify-center font-sans w-full min-h-[12%] border-slate-300'>
          <h1 className='px-8 self-center text-2xl font-bold text-slate-100'>Mis anuncios</h1>
        </div>
        {anuncios.map((item, index) => (
          <div key={index}>
            <div className='text-lg font-semibold'>{item.titulo}</div>
          </div>
        ))}
        {anuncios.map((item, index) => (
          <div className='w-full p-10'>
            <div className="flex flex-col justify-start bg-slate-800 p-6 rounded-2xl text-slate-100">
              <div className="flex flex-row items-center">
                <img src='/achicopalado.jfif' className='rounded-full w-14 ml-6'></img>
                <div className="flex flex-col justify-start px-8">
                  <div key={index}>
                    <div className='text-lg font-semibold'>{item.titulo}</div>
                  </div>
                  <div className='text-sm'>Rosa Guadalupe Paredes Juarez</div>
                </div>
              </div>
              <div className='flex flex-col py-5 text-xs'>
                <span className='px-6 text-slate-100 font-semibold'>Publicado el:</span>
                <span className='px-6 text-slate-300 font-base'>31 may 2023, 07:24</span>
              </div>

              <div className='px-6'>{item.descripcion}<br></br>
              </div>
            </div>
          </div>

        ))}

      </ViewLayout >
    </>
  )

}