import Head from 'next/head';
import axios from 'axios';
import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import ViewLayout from '@/components/layouts/common/ViewLayout';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';
export default function Home() {
  let matricula_nomina 
  const {user} = useContext(AuthContext)
  const [grupos, setGrupos] = useState()
  const [anuncios, setAnuncios] = useState([])
  const [fecha, setFecha] = useState([])
  const [nomina,setNomina]= useState([])
  const [nombre,setNombre]= useState([])
  const [apellido,setApellido]= useState([])
  const [email,setEmail]= useState([])
  
  const [open, setOpen] = useState(false);
  const [act,setAct] =useState([]) 
  const [cal,setCal] =useState([]) 
  const [nivel,setNivel] =useState([]) 
  const [intento,setIntento] =useState([]) 
  const [estado,setEstado] =useState([]) 
  useEffect(() => {
    if (user) {
      try {
        const decodedUser = jwtDecode(user);
        matricula_nomina = decodedUser.user_id
        
      } catch {
        console.log("Error decoding user");
       
        matricula_nomina = user.user_id
        console.log(matricula_nomina)
      }
    }
  }, [user]);

  useEffect(() => {
    
    try {
      axios.get('http://127.0.0.1:9200/my_view/usuarioGrupo/', {
        params: {
          matricula_nomina: user.user_id
        }
      }).then(response => {
        const dataGrupo = response.data[0].grupo_id
        console.log(dataGrupo)
        setGrupos(dataGrupo)
        try {
          axios.get('http://127.0.0.1:9200/my_view/anuncio/', {
            params: {
              grupo_id: dataGrupo
            }
          }).then(response => {
            const fechaAnuncio = response.data[0].publicado_el
            const dataAnuncio = response.data[0].titulo

            
            setAnuncios(dataAnuncio)
            setFecha(fechaAnuncio)

          })
    
        } catch {
          console.log("Error getting groups");
    
        }
      })

    } catch {
      console.log("Error getting groups");

    }
  }, []);
  
  useEffect(() => {
    
    try {
      axios.get('http://127.0.0.1:9200/my_view/usuarioGrupo/', {
        params: {
          matricula_nomina: user.user_id
        }
      }).then(response => {
        const dataGrupo = response.data[0].grupo_id
        
        setGrupos(dataGrupo)
        


        axios.get('http://127.0.0.1:9200/my_view/grupo/', {
        params: {
          grupo_id: dataGrupo
        }
      }).then(response => {
        const dataNomina = response.data[0].profe_nomina
       console.log(dataNomina)
        setNomina(dataNomina)
        
    
        axios.get('http://127.0.0.1:9200/my_view/usuarios/', {
        params: {
          matricula_nomina: dataNomina
        }
      }).then(response => {
        console.log(dataNomina)
        const dataNombre = response.data[0].nombre_usuario
        const dataApellido = response.data[0].apellido
        const dataCorreo = response.data[0].email
        
        setNombre(dataNombre)
        setApellido(dataApellido)
        setEmail(dataCorreo)
        
      })
      })
    
        
      })

    } catch {
      console.log("Error getting groups");

    }
  }, [anuncios, grupos]);

  useEffect(() => {
    
    try {
      axios.get('http://127.0.0.1:9200/my_view/usuarioGrupo/', {
        params: {
          matricula_nomina: user.user_id
        }
      }).then(response => {
        const dataGrupo = response.data[0].grupo_id
        console.log(dataGrupo)
        setGrupos(dataGrupo)
        try {
          axios.get('http://127.0.0.1:9200/my_view/modulo/', {
            params: {
              grupo_id: dataGrupo
            }
          }).then(response => {
            
            



            axios.get('http://127.0.0.1:9200/my_view/tarea/', {
            params: {
              grupo_id: dataGrupo
            }
          }).then(response => {
            

          })
          })
    
        } catch {
          console.log("Error getting groups");
    
        }
      })

    } catch {
      console.log("Error getting groups");

    }
  }, []);
  

  const titulo: string = "Pensamiento computacional para ingeniería"
  const grupo: string = "6"

  return (
    <>
      <Head>
        <title>Inicio view</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewLayout>
        <div className='bg-gradient-to-r from-blue-950 via-slate-800 to-slate-950 flex flex-col justify-center font-sans w-full min-h-[12%] border-b-2 border-slate-300'>
          <h1 className='px-8 self-center text-2xl font-bold text-slate-100'>{titulo} ({grupos})</h1>
        </div>
        <div className='w-full p-10'>
          <div className='flex flex-row justify-between'>
            <div className='w-3/4'>
              <h1 className='pb-3 text-xl text-slate-100 font-semibold border-b-2 border-slate-300'>Anuncios recientes</h1>
              <div className="p-4 border-b border-slate-500 whitespace-nowrap overflow-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start">
                    <img src='/achicopalado.jfif' className='rounded-full w-14'></img>
                    <Link href="/userview/Anuncioview" className='px-6 text-slate-100 underline underline-offset-2'>{anuncios}</Link>
                  </div>
                  <div className='flex flex-col pl-4'>
                    <span className='px-6 text-slate-100 font-semibold'>Publicado el:</span>
                    <span className='px-6 text-slate-300 font-base'>{fecha}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-1/5'>
              <h1 className='pb-3 text-xl font-semibold text-slate-200 border-b-2 border-slate-300 truncate'>Mi profesor</h1>
              <div className="text-slate-100 flex flex-col px-4 py-5 border-b border-slate-500 whitespace-nowrap overflow-auto">
                <span>{nombre} {apellido}</span>
                <span>Correo: {email}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col bg-slate-800 p-6 mt-8 rounded-2xl'>
            <div className='flex place-content-center border-b-2 border-slate-500 mb-3 pb-3'>
              <h1 className='text-xl font-semibold text-slate-200'>Progreso de actividades</h1>
            </div>
            <div className='flex flex-row justify-between px-4 lg:px-8 text-slate-200'>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Actividad</span>
                {act.map((data) => (
                  <span className='py-1'>{data}</span>
                ))}
              </div>
              <div className='flex flex-row items-start'>
                <div className='flex flex-col items-start'>
                  <span className='pr-2 lg:pr-10 font-semibold'>% de Completado</span>
                  {cal.map((data) => (
                    <progress className="progress progress-accent w-3/4 my-3 bg-slate-600" value={data} max="100"></progress>
                  ))}
                </div>
                <div className='flex flex-col items-center'>
                  <span className='font-semibold'>#</span>
                  {cal.map((data) => (
                    <span className='py-1'>{data}</span>
                  ))}
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Nivel</span>
                {nivel.map((data) => (
                  <span className='py-1'>{data}</span>
                ))}
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Intentos</span>
                {intento.map((data) => (
                  <span className='py-1'>{data}</span>
                ))}
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Estado</span>
                {estado.map((data) => (
                  <div className={`${data == "Activa" ? 'badge-info' : 'badge-error'} badge text-sm my-1.5`}>{data}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ViewLayout >
    </>
  )

}