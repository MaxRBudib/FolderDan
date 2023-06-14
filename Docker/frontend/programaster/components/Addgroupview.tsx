import Head from 'next/head';
import axios from 'axios';
import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import ViewLayout from '@/components/layouts/common/ViewLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useForm, SubmitHandler } from "react-hook-form"
import { AuthProvider } from '@/context/AuthContext';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

interface FormData {
  access_code: string;
}

export default function Home() {

  const {register, formState: {errors}, handleSubmit, getValues} = useForm<FormData>()
  
  const {user} = useContext(AuthContext)

  const [matricula_nomina, setMatricula_nomina] = useState()
  const [grupo_id, setGrupo_id] = useState('')
  useEffect(() => {
    if (user) {
      try {
        const decodedUser:any = jwtDecode(user);
        setMatricula_nomina(decodedUser.user_id) 
      
      } catch {
        console.log("Error decoding user");
        setMatricula_nomina(user.user_id)  
      }
  }
  },[user]);

 const onSubmit = handleSubmit(async (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };

    try {
      const response = await axios.get('http://127.0.0.1:8000/my_view/grupo/', {
        params: {
          codigo_acceso: values.access_code as string
        }
      });

      if (response.data.length < 1) {
        alert("La clase a la que trata de acceder no existe");
      } else {
        const grupoId = response.data[0].grupo_id;
        setGrupo_id(grupoId);

        const intento = {
          grupo_id: grupoId,
          matricula_nomina: matricula_nomina
        };

      
        await axios.post('http://127.0.0.1:8000/my_view/usuarioGrupo/', intento, config);
        
        alert("Form submitted!");
      }
    } catch (error) {
      console.error(error);
    }
  });
  
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
        <title>Add 2 group</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewLayout>
        <div className="space-y-4 bg-black items-center justify-center md:items-center md:bg-transparent w-96 mx-auto py-2 max-w-xl lg:max-w-lg ">
            <h2 className="mt-20 text-center text-3xl font-bold tracking-tight text-white-900">Entra a un grupo</h2>
            <p className="mt-4 text-lg text-center leading-8 text-gray-300">
              Introduce el código de acceso de tu grupo proporcionado por tu profesor 
            </p>
            <form onSubmit={onSubmit} action="">
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Código de acceso
              </label>
              <input
                {...register('access_code',
                {required: true,
                  pattern: /[A-Z0-9]{6}/
                }
                )}
                name="access_code"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Código de acceso"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-[#003399] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Enviar
              </button>
            </div>
            {errors.access_code?.type == 'required' &&
                <div className="flex pt-2 text-sm text-red-800 dark:text-red-400" role="alert">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Introduce tu código de acceso</span>
                  </div>
                </div>
                }
                {errors.access_code?.type == 'pattern' &&
                <div className="flex pt-2 text-sm text-red-800 dark:text-red-400" role="alert">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">
                      Tu código de accesso solo puede incluir números y letras mayúsculas
                      </span>
                  </div>
                </div>
                }
            </form>
          </div>
      </ViewLayout >
    </>
  )

}