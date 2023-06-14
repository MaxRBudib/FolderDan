import Head from 'next/head';
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { ChangeEvent } from "react";

import MainLayout from '@/components/layouts/common/MainLayout';
import LayoutProf from '@/components/layouts/common/LayoutProf';
import { useRouter } from 'next/router';
import axios from 'axios';

interface FormData {
  modulo_id: string,
  nombre_tarea: string,
  fecha_limite: string,
  num_intentos: number,
  num_reactivos: number,
  tema: string,
}

export default function Home() {
  //like changes
  const { register, formState: { errors }, handleSubmit, getValues } = useForm<FormData>()
  const router = useRouter()
  const { query } = router
  console.log(query)
  const [hora, setHora] = useState("");

  const [modulos, setModulos] = useState([])
  useEffect(() => {
    axios.get('http://127.0.0.1:9200/my_view/modulo/', {
      params:{
        grupo_id: query.queryparam
      }
    }).then((response) => {
      setModulos(response.data)
    })
  }, [query])


  const handleHoraChange = (event) => {
    setHora(event.target.value);
  };

  const onSubmit = handleSubmit((values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    const formattedDateTime = new Date(values.fecha_limite).toISOString();
    console.log(formattedDateTime)
    

    const intento = {
      "modulo_id": values.modulo_id,
      "nombre_tarea": values.nombre_tarea,
      "fecha_limite": formattedDateTime,
      "num_intentos": values.num_intentos,
      "num_reactivos": values.num_reactivos,
      // "tema": values.tema
    }

    console.log(intento)

    axios.post('http://127.0.0.1:9200/my_view/tarea/', intento, config).then((response) => {
      
      alert("Form submited!");
      console.log(response.data)
    })
  })

  return (
    <>
      <Head>
        <title>Agregar Actividad</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

  <LayoutProf>
        <div className="flex items-center justify-center">
          <form onSubmit={onSubmit}>
            <div className="space-y-12">
              <div className="border-b border-white-900/10 pb-12 mt-4">
                <h2 className="text-base font-semibold leading-7 text-white">Creación de Actividad/Tarea</h2>
                <p className="mt-1 text-sm leading-6 text-white">Para crear una actividad llene todos los elementos que pide.</p>

              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                    <label htmlFor="ejercicio" className="block text-sm font-medium leading-6 text-white">ID de Mòdulo</label>
                    <div className="mt-2">
                      <select {...register('modulo_id', {
                        required: true
                      })}id="modulo_id" name="modulo_id" autoComplete="modulo_id" className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1.5">
                      <option value="">- Selección -</option>
                      {modulos.map((item, index) => (
                        <option value={item.modulo_id} key = {index}>
                          Nombre: {item.nombre_Modulo} id: {item.grupo_id}
                        </option>
                      ))}
                      </select>
                    </div>
                  </div>

                <div className="sm:col-span-4">
                  <label htmlFor="ejercicio" className="block text-sm font-medium leading-6 text-white">Titulo de la Tarea</label>
                  <div className="mt-2">
                    <input {...register('nombre_tarea',
                      {required:true,
                        pattern: /.+/,
                      })}
                      id="nombre_tarea" name="nombre_tarea" type="text" autoComplete="materia" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    {errors.nombre_tarea?.type == 'required' &&
                    <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                      <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">Introduzca el nombre de la tarea</span>
                      </div>
                    </div>
                  }
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="Intentos" className="block text-sm font-medium leading-6 text-white mt-8">Número de Intentos</label>
                <div className="mt-2">
                  <select  {...register('num_intentos',
                  {required:true,
                    pattern: /.+/,
                  })}
                  name="num_intentos" id="num_intentos" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  {errors.num_intentos?.type == 'required' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Introduzca el número de intentos</span>
                    </div>
                  </div>
                  }  
                    <option value="">- Selección -</option>
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                    <option value="99"> Ilimitados </option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="Tema" className="block text-sm font-medium leading-6 text-white mt-8">Filtro por Tema</label>
                <div className="mt-2">
                  <select {...register('tema',
                  {required:true,
                    pattern: /.+/,
                  })} 
                  name="tema" id="tema" autoComplete="Tema" className=" pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  {errors.tema?.type == 'required' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Introduzca el tema de los ejercicios</span>
                    </div>
                  </div>
                  }
                    <option value="">- Selección -</option>
                    <option value="1.1">1.1 Uso de programas para la solución de problemas.</option>
                    <option value="1.2">1.2 Fases de desarrollo de un programa.</option>
                    <option value="1.3">1.3 Lenguajes de programación.</option>
                    <option value="1.3.1">1.3.1 Interpretación y compilación.</option>
                    <option value="1.4">1.4 Ambientes de programación.</option>
                    <option value="2.1">2.1 Estructura básica de un programa.</option>
                    <option value="2.2">2.2 Variables, constantes y tipos de datos.</option>
                    <option value="2.3">2.3 Expresiones con operadores aritméticos para describir fórmulas.</option>
                    <option value="2.4">2.4 Construcción de programas que utilicen funciones predefinidas.</option>
                    <option value="2.5">2.5 Solución de problemas que requieran el uso de fórmulas matemáticas.</option>
                    <option value="3.1">3.1 Programación modular.</option>
                    <option value="3.2">3.2 Construcción de funciones y métodos que requieren cálculos matemáticos.</option>
                    <option value="3.3">3.3 Solución de problemas que involucren programación modular.</option>
                    <option value="4.1">4.1 Pruebas y depuración.</option>
                    <option value="4.2">4.2 Prueba de caja negra.</option>
                    <option value="5.1">5.1 Expresiones con operadores relacionales y lógicos para definir condiciones.</option>
                    <option value="5.2">5.2 Estatutos de decisión para programación con condiciones.</option>
                    <option value="5.3">5.3 Solución de problemas que involucren estatutos condicionales.</option>
                    <option value="6.1">6.1 Estatutos de repetición para programación iterativa.</option>
                    <option value="6.2">6.2 Solución de problemas que involucren programación con estatutos de repetición.</option>
                    <option value="7.1">7.1 Datos estructurados.</option>
                    <option value="7.1.1">7.1.1 Listas.</option>
                    <option value="7.1.2">7.1.2 Matrices.</option>
                    <option value="7.1.3">7.1.3 Strings.</option>
                    <option value="7.2">7.2 Mutabilidad e inmutabilidad.</option>
                    <option value="7.3">7.3 Solución de problemas que involucren datos estructurados.</option>
                    <option value="8.1">8.1 Creación y uso de archivos.</option>
                    <option value="8.2">8.2 Solución de problemas que involucren programación con archivos.</option>
                  </select>
                </div>

                <div className="col-span-full">
                  <label htmlFor="Intentos" className="block text-sm font-medium leading-6 text-white mt-8">Número de Reactivos</label>
                  <div className="mt-2">
                    <select {...register('num_reactivos',
                      {required:true,
                      pattern: /.+/,
                    })} 
                    name="num_reactivos" id="num_reactivos" autoComplete="Intentos" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    {errors.tema?.type == 'required' &&
                      <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                      <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">Introduzca el número de reactivos</span>
                      </div>
                    </div>
                    }
                      <option value="">- Selección -</option>
                      <option value="1"> 1 </option>
                      <option value="2"> 2 </option>
                      <option value="3"> 3 </option>
                      <option value="4"> 4 </option>
                      <option value="5"> 5 </option>
                      <option value="6"> 6 </option>
                      <option value="7"> 7 </option>
                      <option value="8"> 8 </option>
                      <option value="9"> 9 </option>
                      <option value="10"> 10 </option>
                      <option value="11"> 11 </option>
                      <option value="12"> 12 </option>
                      <option value="13"> 13 </option>
                      <option value="14"> 14 </option>
                      <option value="15"> 15 </option>
                      <option value="16"> 16 </option>
                      <option value="17"> 17 </option>
                      <option value="18"> 18 </option>
                      <option value="19"> 19 </option>
                      <option value="20"> 20 </option>
                      <option value="10"> 21 </option>
                      <option value="11"> 22 </option>
                      <option value="12"> 23 </option>
                      <option value="13"> 24 </option>
                      <option value="14"> 25 </option>
                      <option value="15"> 26 </option>
                      <option value="16"> 27 </option>
                      <option value="17"> 28 </option>
                      <option value="18"> 29 </option>
                      <option value="19"> 30 </option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="Hora" className="block text-sm font-medium leading-6 text-white mt-8">Fecha y Hora de Entrega</label>
                  <div className="mt-2">
                    <input {...register('fecha_limite',
                      {required:true,
                      pattern: /.+/,
                      })}
                      type="datetime-local" id="fecha_limite" name="fecha_limite" 
                      onChange={handleHoraChange} autoComplete="Hora" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required/>
                      {errors.fecha_limite?.type == 'pattern' &&
                      <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Info</span>
                        <div>
                          <span className="font-medium">Introduzca la fecha y hora límite de entrega</span>
                        </div>
                      </div>
                      }
                  </div>
                </div>


                <div className=" mt-10 flex items-center justify-end gap-x-6">
                  <Link href="/grupos">
                    <button type="button" className="text-sm font-semibold leading-6 text-white">Cancel</button>
                  </Link>
                  <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
      </LayoutProf>
    </>

  )
}