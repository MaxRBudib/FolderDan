import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import backtierra from '@/public/blob-scene-haikei.png'

import { useForm, SubmitHandler } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { useRouter } from 'next/router';
import axios from 'axios'

import MainLayout from '@/components/layouts/common/MainLayout';
import LayoutProf from '@/components/layouts/common/LayoutProf';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';


interface FormData {
  uf_id: string;
  periodo_ini : number;
  periodo_fin : number;
  semestre: string;
  matricula_nomina: string;
}


export default function Home() {

  const router = useRouter()

  const {register, formState: {errors}, handleSubmit, getValues} = useForm<FormData>()

  const {user} = useContext(AuthContext)

  const [matricula_nomina, SetMatricula_Nomina] = useState()
  useEffect(() => {
    if (user) {
      try {
        const decodedUser = jwtDecode(user);
          SetMatricula_Nomina(decodedUser.user_id)
        
      } catch {
        console.log("Error decoding user");
       
        SetMatricula_Nomina(user.user_id)
        console.log(matricula_nomina)
      }
    }
  }, [user]);
  
  
  const onSubmit = handleSubmit((values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    const intento = {
      "uf_id":
      values.uf_id
      ,
      "periodo_ini":
      values.periodo_ini
      ,
      "periodo_fin":
      values.periodo_fin
      ,
      "Semestre":
      values.semestre
      ,
      "profe_nomina":
      matricula_nomina
    }
    
    axios.post('http://127.0.0.1:8000/my_view/grupo/', intento, config).then((response) => {
      
      alert("Form submited!");
      router.push('/grupos')
    })
  })

  return (
    <> 
      <Head>
        <title>Profesor View</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


<LayoutProf>
  <div className="flex items-center justify-center">
    <form onSubmit={onSubmit}>
      <div className="space-y-12 w-96 mx-auto py-2 max-w-xl lg:max-w-lg ">
        <div className="border-b border-white-900/10 pb-12 mt-4">
          <h2 className="text-base font-semibold leading-7 text-white-900">Creación de grupos</h2>
          <p className="mt-1 text-sm leading-6 text-white-600">Para subir su propio ejercicio llene todos los elementos que pide.</p>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="materia" className="block text-sm font-medium leading-6 text-White-900">
                ID de la Unidad de Formación
              </label>
              <div className="mt-2">
                <select {...register('uf_id',
                  {required:true,
                    pattern: /.+/,
                  })}
                  id="uf_id" name="uf_id" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-[#003399] sm:max-w-xs sm:text-sm sm:leading-6" required>
                  {errors.uf_id?.type == 'pattern' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Introduzca la unidad de formación</span>
                    </div>
                  </div>
                  }
                  <option value="">- Selección -</option>
                  <option value="TC1028"> TC1028 </option>
                  <option value="TC1030"> TC1030 </option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="materia" className="block text-sm font-medium leading-6 text-White-900">
                Periodo de inicio
              </label>
              <div className="mt-2">
                <select {...register('periodo_ini',
                  {required:true,
                    pattern: /.+/,
                  })}
                  id="periodo_ini" name="periodo_ini" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-[#003399] sm:max-w-xs sm:text-sm sm:leading-6" required>
                  {errors.periodo_ini?.type == 'pattern' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Introduzca el periodo de inicio</span>
                    </div>
                  </div>
                  }
                  <option value="">- Selección -</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="materia" className="block text-sm font-medium leading-6 text-White-900">
                Periodo de fin
              </label>
              <div className="mt-2">
                <select {...register('periodo_fin',
                  {required:true,
                    pattern: /.+/,
                  })}
                  id="periodo_fin" name="periodo_fin" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-[#003399] sm:max-w-xs sm:text-sm sm:leading-6" required>
                  {errors.periodo_fin?.type == 'pattern' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Introduzca el periodo de inicio</span>
                    </div>
                  </div>
                  }  
                  <option value="">- Selección -</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="materia" className="block text-sm font-medium leading-6 text-White-900">
                Semestre
              </label>
              <div className="mt-2">
                <select  {...register('semestre',
                  {required:true,
                    pattern: /.+/,
                  })}
                id="semestre" name="semestre" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-[#003399] sm:max-w-xs sm:text-sm sm:leading-6" required>
                {errors.periodo_fin?.type == 'pattern' &&
                <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Introduzca el periodo de inicio</span>
                  </div>
                </div>
                } 
                  <option value="">- Selección -</option>
                  <option value="FEBJUN2023">Febrero-Junio 2023 </option>
                  <option value="AGODIC2023">Agosto-Diciembre 2023</option>
                </select>
              </div>
            </div>
          
          </div>
        </div>
      </div>
  
    <div className="mt-2 mb-6 flex items-center justify-end gap-x-6">
      <button type="submit" className="rounded-md bg-[#003399] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>

    </form>
  </div>
</LayoutProf>
      

    </>
    
  )
}