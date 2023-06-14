import Head from 'next/head';
import axios from 'axios';
import React, { useContext } from 'react';
import { useEffect, useRef, useState } from 'react';
import ViewLayout from '@/components/layouts/common/ViewLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

export default function Home() {
  
  const baseGrupoURL = "http://127.0.0.1:8000/my_view/usuarioGrupo/";
  const baseModuloURL = "http://127.0.0.1:8000/my_view/modulo/";
  const baseTareaURL = "http://127.0.0.1:8000/my_view/tarea/";

  //let getGrupoURL: string;
  //let getModuloURL: string;
  //let getTareaURL: string;
  //let grupoID: string;
  //let modulos: [];
  //let tareas: [];

  const [modulo, setModulo] = useState([]);
  const [tarea, setTarea] = useState([]);
  const [clase, setClase] = useState('')
  const [actividad, setActividad] = useState([])
  const { user } = useContext(AuthContext);
  const [matricula_nomina, setMatricula_nomina] = useState();
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
        setClase(router.query.grupo as string)
        console.log(clase)
    }
  }, [router.isReady])

  useEffect(() => {
    if (user) {
      try {
        const decodedUser: any = jwtDecode(user);
        setMatricula_nomina(decodedUser.user_id)
      } catch {
        setMatricula_nomina(user.user_id)
      }
    }
  }, [user]);

  useEffect(() => {
    try {
      axios.get(baseGrupoURL, {
        params: {
          matricula_nomina: matricula_nomina
        }
      }).then((response) => {
        setClase(response.data[0].grupo_id as string)
      });
    } catch {
      console.log("Error getting modulo");
    }
  }, []);

  useEffect(() => {
    try {
      axios.get(baseModuloURL)
        .then(response => {
          // Handle the response data here
          let dataModulo = response.data
          dataModulo = dataModulo.filter(obj => obj.grupo_id == clase)
          setModulo(dataModulo);
        });
    } catch {
      console.log("Error getting modulo");
    }
  }, [clase]);

  useEffect(() => {
    try {
      console.log(modulo)
      axios.get(baseTareaURL).then((response) => {
        setActividad(response.data)
      })
    } catch {
      console.log("zero")
    }
  }, [modulo])

  //useEffect(() => {
  //  if (user) {
  //    try {
  //      const decodedUser: any = jwtDecode(user);
  //      setMatricula_nomina(decodedUser.user_id)
  //    } catch {
  //      setMatricula_nomina(user.user_id)
  //    }
  //  }
  //
  //  //Get para la información de grupo_id
  //try {
  //  axios.get(baseGrupoURL, {
  //    params: {
  //      matricula_nomina: user.user_id
  //    }
  //  }).then((response) => {
  //    grupoID = response.data[0].grupo_id;
  //    setGrupo_id(response.data[0].grupo_id)
  //    //console.log(response.data[0].grupo_id);
  //    try {
  //      axios.get(baseModuloURL, {
  //        params: {
  //          grupo_id: grupoID
  //        }
  //      }).then((response2) => {
  //        //console.log(grupoID)
  //        modulos = response2.data
  //console.log(modulos);
  //
  //          modulos.map((d: any, i: any) => {
  //            try {
  //              //Get para la información de Tarea
  //              axios.get(baseTareaURL, {
  //                params: {
  //                  modulo_id: d.modulo_id
  //                }
  //              }).then((response3) => {
  //                //console.log(moduloID)
  //                tareas.push(response3.data)
  //                //console.log(tareas);
  //              })
  //
  //            } catch {
  //              console.log("Error getting tarea");
  //            }
  //          })
  //        })
  //      } catch {
  //        console.log("Error getting modulo");
  //
  //      }
  //    })
  //  } catch {
  //    console.log("Error getting groups");
  //  }
  //
  //}, []);


  function Tareas({ moduloID } : any) {
    return (
      actividad.map((d: any, i: any) => (
        <div>
          {moduloID === d.modulo_id ? (
            <Link key={i} href={`/Tareas/${d.tarea_id}`} className="flex items-center border-b-2 mb-4 pl-3 border-slate-400 text-slate-200 rounded-lg hover:bg-gray-700">
              {/*<div className='text-xl py-1'>{iconSelect(contenido.tipo)}</div>*/}
              <span className="flex-1 px-4 lg:px-6 py-1 whitespace-nowrap truncate">{d.nombre_tarea}</span>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      ))
    )
  }

  function Modulos() {
    return (
      modulo.map((d: any, i: any) => (
        <div key={i} tabIndex={0} className="w-3/4 collapse collapse-arrow border border-base-300 bg-slate-800 rounded-2xl">
          <input type="checkbox" />
          <div className="collapse-title text-xl text-slate-200 font-medium">
            {d.nombre_Modulo}
          </div>
          <div className="collapse-content flex flex-col justify-center">
            <Tareas moduloID = {d.modulo_id}></Tareas>
          </div>
        </div>
      ))
    )
  }


  function iconSelect(props: any) {
    if (props == "actividad") {
      return <FontAwesomeIcon icon={regular("file-code")} />
    } else if (props == "leccion") {
      return <FontAwesomeIcon icon={regular("file-lines")} />
    } else if (props == "archivo") {
      return <FontAwesomeIcon icon={solid("paperclip")} />
    } else {
      return <FontAwesomeIcon icon={solid("paperclip")} />
    }
  }

  return (
    <>
      <Head>
        <title>Módulos view</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewLayout>
        <div className='bg-gradient-to-r from-blue-950 via-slate-800 to-slate-950 flex flex-col justify-center font-sans w-full min-h-[12%] border-b-2 border-slate-300'>
          <h1 className='self-center text-3xl font-semibold dark:text-slate-100'>Módulos</h1>
        </div>
        <section className='grid grid-cols-2 justify-items-center items-start gap-y-10 p-10'>
          <Modulos></Modulos>
        </section>
      </ViewLayout >
    </>
  )

}