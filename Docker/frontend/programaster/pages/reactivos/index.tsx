import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import backtierra from '@/public/blob-scene-haikei.png'

import { useForm, SubmitHandler } from "react-hook-form";
import React, { useContext, useState, useEffect } from "react";
import { ChangeEvent } from "react";
import axios from 'axios'
import MainLayout from '@/components/layouts/common/MainLayout';
import LayoutProf from '@/components/layouts/common/LayoutProf';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';
import { TEMPORARY_REDIRECT_STATUS } from 'next/dist/shared/lib/constants';


interface FormData {
  titulo: string,
  tema: string,
  descripcion: string,
  tipo: string,
  dificultad: string,
  matricula_nomina: string,

  opciones: number,
  number_testcases: number,
  testcases: string,
  outputs: number,

  op_multiple1: string,
  op_multiple2: string,
  op_multiple3: string,
  op_multiple4: string,

  respuesta1: boolean,
  respuesta2: boolean,
  respuesta3: boolean,
  respuesta4: boolean,

  input1: string,
  input2: string,
  input3: string,
  input4: string,

  output1: string,
  output2: string,
  output3: string,
  output4: string,
}


export default function Home() {
  const { user } = useContext(AuthContext)
  const { register, formState: { errors }, handleSubmit, getValues } = useForm<FormData>()
  const [mostrarOpcionesMultiple, setMostrarOpcionesMultiple] = useState(false);
  const [mostrarCodigo, setMostrarCodigo] = useState(false);

  const [mostrarResp, setMostrarResp] = useState(false);
  const [mostrarResp1, setMostrarResp1] = useState(false);
  const [mostrarResp2, setMostrarResp2] = useState(false);

  const [mostrar, setMostrar] = useState(false);
  const [mostrar1, setMostrar1] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);

  const [matricula_nomina, SetMatricula_Nomina] = useState('')
  let ejercicio_ID: any

  const [respuesta1, setRespuesta1] = useState(false);
  const [respuesta2, setRespuesta2] = useState(false);
  const [respuesta3, setRespuesta3] = useState(false);
  const [respuesta4, setRespuesta4] = useState(false);

  useEffect(() => {
    if (user) {
      try {
        const decodedUser: any = jwtDecode(user);
        SetMatricula_Nomina(decodedUser.user_id)

      } catch {
        console.log("Error decoding user");

        SetMatricula_Nomina(user.user_id)
        console.log(matricula_nomina)
      }
    }


  }, [user]);


  const handleTipoChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const seleccion = event.target.value;
    if (seleccion === "Opcion Multiple") {
      setMostrarOpcionesMultiple(true);
      setMostrarCodigo(false);
    } else if (seleccion === "Codigo") {
      setMostrarOpcionesMultiple(false);
      setMostrarCodigo(true);
    } else {
      setMostrarOpcionesMultiple(false);
      setMostrarCodigo(false);
      setMostrarResp(false);
      setMostrarResp1(false);
      setMostrarResp2(false);
      setMostrar(false);
      setMostrar1(false);
      setMostrar2(false);
    }
  };

  const handleReactivosChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "2") {
      setMostrarResp(true);
      setMostrarResp1(false);
      setMostrarResp2(false);
    } else if (value === "3") {
      setMostrarResp(false);
      setMostrarResp1(true);
      setMostrarResp2(false);
    } else if (value === "4") {
      setMostrarResp(false);
      setMostrarResp1(false);
      setMostrarResp2(true);
    } else {
      setMostrarResp(false);
      setMostrarResp1(false);
      setMostrarResp2(false);
    }
  };

  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [mostrarRespuesta1, setMostrarRespuesta1] = useState(false);
  const [mostrarRespuesta2, setMostrarRespuesta2] = useState(false);
  const [mostrarRespuesta3, setMostrarRespuesta3] = useState(false);
  const [mostrarRespuesta4, setMostrarRespuesta4] = useState(false);
  const [mostrarRespuesta5, setMostrarRespuesta5] = useState(false);
  const [mostrarRespuesta6, setMostrarRespuesta6] = useState(false);
  const [mostrarRespuesta7, setMostrarRespuesta7] = useState(false);
  const [mostrarRespuesta8, setMostrarRespuesta8] = useState(false);

  const handleCodeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "2") {
      setMostrar(true);
      setMostrar1(false);
      setMostrar2(false);
    } else if (value === "3") {
      setMostrar(false);
      setMostrar1(true);
      setMostrar2(false);
    } else if (value === "4") {
      setMostrar(false);
      setMostrar1(false);
      setMostrar2(true);
    } else {
      setMostrar(false);
      setMostrar1(false);
      setMostrar2(false);
    }
  };
  const onSubmit = handleSubmit(async (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    // Posto de ejercicio en ejercicio_list
    const dic = {
      "titulo": values.titulo,
      "tema": values.tema,
      "descripcion": values.descripcion,
      "tipo": values.tipo,
      "dificultad": values.dificultad,
      "matricula_nomina": matricula_nomina,
    }
    let titulo = values.titulo

    axios.post('http://127.0.0.1:8000/my_view/ejercicios/', dic, config).then((response) => {
      // setEjercicio_ID(response.data.ejercicio_id)
      console.log(response.data)
      try {
        axios.get('http://127.0.0.1:8000/my_view/ejercicios/', {
          params: {
            titulo: titulo
          }
        })
          .then(response => {
            // Handle the response data here
            ejercicio_ID = response.data[0].ejercicio_id

            if (values.tipo === "Opcion Multiple") {
              const op1 = {
                "respuesta": respuesta1,
                "texto": values.op_multiple1,
                "ejercicio_id": ejercicio_ID
              }

              const op2 = {
                "respuesta": respuesta2,
                "texto": values.op_multiple2,
                "ejercicio_id": ejercicio_ID
              }

              const op3 = {
                "respuesta": respuesta3,
                "texto": values.op_multiple3,
                "ejercicio_id": ejercicio_ID
              }

              const op4 = {
                "respuesta": respuesta4,
                "texto": values.op_multiple4,
                "ejercicio_id": ejercicio_ID
              }

              console.log(op1)
              console.log(op2)
              //console.log(op3)
              console.log(ejercicio_ID)
              // console.log(values.opciones)

              ///*
              if (values.opciones == 2) {
                axios.post('http://127.0.0.1:8000/my_view/opciones/', op1, config).then((response) => {
                  console.log(response)
                  alert("Form submited!");

                })
                axios.post('http://127.0.0.1:8000/my_view/opciones/', op2, config).then((response) => {
                  console.log(response)


                })

              } else if (values.opciones == 3) {
                axios.post('http://127.0.0.1:8000/my_view/opciones/', op1, config).then((response) => {
                  console.log(response)
                  alert("Form submited!");
                })
                axios.post('http://127.0.0.1:8000/my_view/opciones/', op2, config).then((response) => {
                  console.log(response)

                })
                axios.post('http://127.0.0.1:8000/my_view/opciones/', op3, config).then((response) => {
                  console.log(response)

                })

              } else if (values.opciones == 4) {
                axios.post('http://127.0.0.1:8000/my_view/opciones/', op1, config).then((response) => {
                  console.log(response)
                  alert("Form submited!");
                })
                axios.post('http://127.0.0.1:8000/my_view/opciones/', op2, config).then((response) => {
                  console.log(response)

                })
                axios.post('http://127.0.0.1:8000/my_view/opciones/', op3, config).then((response) => {
                  console.log(response)

                })
                axios.post('http://127.0.0.1:8000/my_view/opciones/', op4, config).then((response) => {
                  console.log(response)

                })
              }
              //*/
            } else if (values.tipo === "Codigo") {
              const tc1 = {
                "input": values.input1,
                "output": values.output1,
                "ejercicio_id": ejercicio_ID
              }

              const tc2 = {
                "input": values.input2,
                "output": values.output2,
                "ejercicio_id": ejercicio_ID
              }

              const tc3 = {
                "input": values.input3,
                "output": values.output3,
                "ejercicio_id": ejercicio_ID
              }

              const tc4 = {
                "input": values.input4,
                "output": values.output4,
                "ejercicio_id": ejercicio_ID
              }

              if (values.number_testcases == 2) {
                axios.post('http://127.0.0.1:8000/my_view/testCases/', tc1, config).then((response) => {
                  console.log(response)
                  alert("Form submited!");
                })
                axios.post('http://127.0.0.1:8000/my_view/testCases/', tc2, config).then((response) => {
                  console.log(response)
                })

              } else if (values.number_testcases == 3) {
                axios.post('http://127.0.0.1:8000/my_view/testCases/', tc1, config).then((response) => {
                  console.log(response)
                  alert("Form submited!");
                })
                axios.post('http://127.0.0.1:8000/my_view/testCases/', tc2, config).then((response) => {
                  console.log(response)
                })
                axios.post('http://127.0.0.1:8000/my_view/testCases/', tc3, config).then((response) => {
                  console.log(response)
                })

              } else if (values.number_testcases == 4) {
                axios.post('http://127.0.0.1:8000/my_view/testCases/', tc1, config).then((response) => {
                  console.log(response)
                  alert("Form submited!");
                })
                axios.post('http://127.0.0.1:8000/my_view/testCases/', tc2, config).then((response) => {
                  console.log(response)
                })
                axios.post('http://127.0.0.1:8000/my_view/testCases/', tc3, config).then((response) => {
                  console.log(response)
                })
                axios.post('http://127.0.0.1:8000/my_view/testCases/', tc4, config).then((response) => {
                  console.log(response)
                })
              }

            }
          });
      } catch {
        console.log("Error getting modulo");
      }
      //console.log(ejercicio_ID)

    })

    // Post si es opción multiple o código



    // Post de ejercicio de código
  }


  )

  return (
    <>
      <Head>
        <title>Ejercicios</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <LayoutProf>
        <div className="flex items-center justify-center">
          <form onSubmit={onSubmit}>
            <div className="space-y-12">
              <div className="border-b border-white-900/10 pb-12 mt-4">
                <h2 className="text-base font-semibold leading-7 text-white">Creación de Ejercicio</h2>
                <p className="mt-1 text-sm leading-6 text-white">Para subir su propio ejercicio llene todos los elementos que pide.</p>


                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                  <div className="sm:col-span-full">
                    <label htmlFor="ejercicio" className="block text-sm font-medium leading-6 text-white">Título del Ejercicio</label>
                    <div className="mt-2">
                      <input {...register('titulo',
                        {
                          required: true,
                          //pattern: /.+/ 
                        })}
                        id="titulo" name="titulo" type="text" autoComplete="materia" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div className="sm:col-span-full">
                    <label htmlFor="tema" className="block text-sm font-medium leading-6 text-white">Tema del Ejercicio</label>
                    <div className="mt-2">
                      <select {...register('tema',
                        {
                          required: true,
                          pattern: /.+/
                        })} id="tema" name="tema" autoComplete="tema" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
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
                  </div>

                  <div className="sm:col-span-full">
                    <label htmlFor="tipo" className="block text-sm font-medium leading-6 text-white"> Tipo de Ejercicio </label>
                    <div className="mt-2">
                      <select {...register('tipo',
                        {
                          required: true,
                          pattern: /.+/,
                        })}
                        id="tipo"
                        name="tipo"
                        autoComplete="tipo"
                        className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        required
                        onChange={handleTipoChange}
                      >
                        <option value="">- Selección -</option>
                        <option value="Opcion Multiple">Opción Multiple</option>
                        <option value="Codigo">Código</option>
                      </select>
                    </div>

                    {/* Aqui comienza todas las opciones de un ejercicio tipo opcion multiple */}

                    {mostrarOpcionesMultiple && (
                      <div className="mt-6">
                        <div className="col-span-full">
                          <label htmlFor="Preg" className="block text-sm font-medium leading-6 text-white">Preguntas</label>
                          <div className="mt-2">
                            <textarea {...register('descripcion',
                              {
                                required: true,
                                pattern: /.+/
                              })}
                              id="descripcion" name="descripcion" rows={3} className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-white-600">Escriba las preguntas para el ejercicio de opción multiple</p>
                        </div>

                        <div className="sm:col-span-full mt-6">
                          <label htmlFor="dificultad" className="block text-sm font-medium leading-6 text-white">Dificultad</label>
                          <div className="mt-2">
                            <select {...register('dificultad',
                              {
                                required: true,
                                pattern: /.+/
                              })} id="dificultad" name="dificultad" autoComplete="dificultad" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required>
                              <option value="">- Selección -</option>
                              <option value="Facil"> Fácil </option>
                              <option value="Medio"> Medio </option>
                              <option value="Dificil"> Difícil </option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <div className="sm:col-span-full mt-4">
                            <label htmlFor="Opciones" className="block text-sm font-medium leading-6 text-white">Opciones/Respuestas</label>
                            <div className="mt-2">
                              <select {...register('opciones',
                                {
                                  required: true,
                                  pattern: /.+/
                                })} id="opciones" name="opciones" autoComplete="opciones" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required onChange={handleReactivosChange}>
                                <option value="">- Selección -</option>
                                <option value="2"> 2 </option>
                                <option value="3"> 3 </option>
                                <option value="4"> 4 </option>
                              </select>
                            </div>

                            {/* Aqui se puede editar el despliegue de opciones y pistas */}

                            {mostrarResp && (
                              <div>
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="react" className="block text-sm font-medium leading-6 text-white">Opción 1</label>
                                  <div className="mt-2">
                                    <input {...register('op_multiple1',
                                      {
                                        required: true
                                      })} id="op_multiple1" name="op_multiple1" type="text" autoComplete="elecciones" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                  <div className='mr-4 flex space-x-8'>
                                    <label htmlFor='respuesta4' className='block mt-2 text-sm font-medium leading-6 text-white mr-6'>
                                      <input
                                        checked={mostrarRespuesta && respuesta1}
                                        onChange={(e) => {
                                          setMostrarRespuesta(!mostrarRespuesta);
                                          setRespuesta1(e.target.checked);
                                        }}
                                        id="respuesta1"
                                        name="respuesta1"
                                        type="checkbox"
                                        className="pl-1.5 mr-2" />
                                      Respuesta
                                    </label>
                                  </div>

                                  <div className="sm:col-span-full mt-4">
                                    <label htmlFor="react2" className="block text-sm font-medium leading-6 text-white">Opción 2</label>
                                    <div className="mt-2">
                                      <input {...register('op_multiple2', {
                                        required: true
                                      })} id="op_multiple2" name="op_multiple2" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                  </div>
                                  <div className='mr-4 flex space-x-8'>
                                    <label htmlFor='respuesta4' className='block mt-2 text-sm font-medium leading-6 text-white'>
                                      <input
                                        checked={mostrarRespuesta1 && respuesta2}
                                        onChange={(e) => {
                                          setMostrarRespuesta1(!mostrarRespuesta1);
                                          setRespuesta2(e.target.checked);
                                        }}
                                        id="respuesta2"
                                        name="respuesta2"
                                        type="checkbox"
                                        className="pl-1.5 mr-2" />
                                      Respuesta
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}

                            {mostrarResp1 && (
                              <div>
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="react3" className="block text-sm font-medium leading-6 text-white">Opción 1</label>
                                  <div className="mt-2">
                                    <input {...register('op_multiple1',
                                      {
                                        required: true,
                                      })}
                                      id="op_multiple1" name="op_multiple1" type="text" autoComplete="react3" className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                  <div className='mr-4 flex space-x-8'>
                                    <label htmlFor='respuesta4' className='block mt-2 text-sm font-medium leading-6 text-white'>
                                      <input
                                        checked={mostrarRespuesta && respuesta1}
                                        onChange={(e) => {
                                          setMostrarRespuesta(!mostrarRespuesta);
                                          setRespuesta1(e.target.checked);
                                        }}
                                        id="respuesta1"
                                        name="respuesta1"
                                        type="checkbox"
                                        className="pl-1.5 mr-2" />
                                      Respuesta
                                    </label>
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="react4" className="block text-sm font-medium leading-6 text-white">Opción 2</label>
                                  <div className="mt-2">
                                    <input {...register('op_multiple2',
                                      {
                                        required: true,
                                      })}
                                      id="op_multiple2" name="op_multiple2" type="text" autoComplete="react4" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                  <div className='mr-4 flex space-x-8'>
                                    <label htmlFor='respuesta4' className='block mt-2 text-sm font-medium leading-6 text-white'>
                                      <input
                                        checked={mostrarRespuesta1 && respuesta2}
                                        onChange={(e) => {
                                          setMostrarRespuesta1(!mostrarRespuesta1);
                                          setRespuesta2(e.target.checked);
                                        }}
                                        id="respuesta2"
                                        name="respuesta2"
                                        type="checkbox"
                                        className="pl-1.5 mr-2" />
                                      Respuesta
                                    </label>
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="react5" className="block text-sm font-medium leading-6 text-white">Opción 3</label>
                                  <div className="mt-2">
                                    <input {...register('op_multiple3',
                                      {
                                        required: true,
                                      })}
                                      id="op_multiple3" name="op_multiple3"
                                      type="text" autoComplete="react5" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                                <div className='mr-4 flex space-x-8'>
                                  <label htmlFor='respuesta4' className='block mt-2 text-sm font-medium leading-6 text-white'>
                                    <input
                                      checked={mostrarRespuesta2 && respuesta3}
                                      onChange={(e) => {
                                        setMostrarRespuesta2(!mostrarRespuesta2);
                                        setRespuesta3(e.target.checked);
                                      }}
                                      id="respuesta3"
                                      name="respuesta3"
                                      type="checkbox"
                                      className="pl-1.5 mr-2" />
                                    Respuesta
                                  </label>
                                </div>
                              </div>
                            )}

                            {mostrarResp2 && (
                              <div>
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="react6" className="block text-sm font-medium leading-6 text-white">Opción 1</label>
                                  <div className="mt-2">
                                    <input {...register('op_multiple1',
                                      {
                                        required: true,
                                      })}
                                      id="op_multiple1" name="op_multiple1" type="text" autoComplete="react6" className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                  <div className='mr-4 flex space-x-8'>
                                    <label htmlFor='respuesta4' className='block mt-2 text-sm font-medium leading-6 text-white'>
                                      <input
                                        checked={mostrarRespuesta && respuesta1}
                                        onChange={(e) => {
                                          setMostrarRespuesta(!mostrarRespuesta);
                                          setRespuesta1(e.target.checked);
                                        }}
                                        id="respuesta1"
                                        name="respuesta1"
                                        type="checkbox"
                                        className="pl-1.5 mr-2" />
                                      Respuesta
                                    </label>
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="react7" className="block text-sm font-medium leading-6 text-white">Opción 2</label>
                                  <div className="mt-2">
                                    <input  {...register('op_multiple2',
                                      {
                                        required: true,
                                      })}
                                      id="op_multiple2" name="op_multiple2" type="text" autoComplete="react7" className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                  <div className='mr-4 flex space-x-8'>
                                    <label htmlFor='respuesta4' className='block mt-2 text-sm font-medium leading-6 text-white'>
                                      <input
                                        checked={mostrarRespuesta1 && respuesta2}
                                        onChange={(e) => {
                                          setMostrarRespuesta1(!mostrarRespuesta1);
                                          setRespuesta2(e.target.checked);
                                        }}
                                        id="respuesta2"
                                        name="respuesta2"
                                        type="checkbox"
                                        className="pl-1.5 mr-2" />
                                      Respuesta
                                    </label>
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="react8" className="block text-sm font-medium leading-6 text-white">Opción 3</label>
                                  <div className="mt-2">
                                    <input {...register('op_multiple3',
                                      {
                                        required: true,
                                      })}
                                      id="op_multiple3" name="op_multiple3" type="text" autoComplete="react8" className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                  <div className='mr-4 flex space-x-8'>
                                    <label htmlFor='respuesta4' className='block mt-2 text-sm font-medium leading-6 text-white'>
                                      <input
                                        checked={mostrarRespuesta2 && respuesta3}
                                        onChange={(e) => {
                                          setMostrarRespuesta2(!mostrarRespuesta2);
                                          setRespuesta3(e.target.checked);
                                        }}
                                        id="respuesta3"
                                        name="respuesta3"
                                        type="checkbox"
                                        className="pl-1.5 mr-2" />
                                      Respuesta
                                    </label>
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="react9" className="block text-sm font-medium leading-6 text-white">Opción 4</label>
                                  <div className="mt-2">
                                    <input  {...register('op_multiple4',
                                      {
                                        required: true,
                                      })}
                                      id="op_multiple4" name="op_multiple4" type="text" autoComplete="react9" className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                  <div className='mr-4 flex space-x-8'>
                                    <label htmlFor='respuesta4' className='block mt-2 text-sm font-medium leading-6 text-white'>
                                      <input
                                        checked={mostrarRespuesta3 && respuesta4}
                                        onChange={(e) => {
                                          setMostrarRespuesta3(!mostrarRespuesta3);
                                          setRespuesta4(e.target.checked);
                                        }}
                                        id="respuesta4"
                                        name="respuesta4"
                                        type="checkbox"
                                        className="pl-1.5 mr-2" />
                                      Respuesta
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>

                        </div>
                      </div>
                    )}

                    {/* Aqui comienza todas las opciones de un ejercicio tipo codigo */}

                    {mostrarCodigo && (
                      <div className="mt-6">
                        <div className="col-span-full">
                          <label htmlFor="Descripcion" className="block text-sm font-medium leading-6 text-white">Descripción del Ejercicio</label>
                          <div className="mt-2">
                            <textarea {...register('descripcion',
                              {
                                required: true,
                                pattern: /.+/
                              })} id="descripcion" name="descripcion" rows={3} className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-white">Escriba las instrucciones para el ejercicio</p>
                        </div>

                        <div className="mt-6">
                          <div className="sm:col-span-full">
                            <label htmlFor="dificultades" className="block text-sm font-medium leading-6 text-white">Dificultad</label>
                            <div className="mt-2">
                              <select {...register('dificultad',
                                {
                                  required: true,
                                  pattern: /.+/
                                })} id="dificultad" name="dificultad" autoComplete="dificultad" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required>
                                <option value="">- Selección -</option>
                                <option value="Facil"> Fácil </option>
                                <option value="Medio"> Medio </option>
                                <option value="Dificil"> Difícil </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-full mt-6">
                          <label htmlFor="Num" className="block text-sm font-medium leading-6 text-white">Número de Inputs/Outputs</label>
                          <div className="mt-2">
                            <select {...register('number_testcases',
                              {
                                required: true,
                                pattern: /.+/
                              })} id="number_testcases" name="number_testcases" autoComplete="number_testcases" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required onChange={handleCodeChange}>
                              <option value="">- Selección -</option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                            </select>
                          </div>

                          {/* Comienza el codigo para inputs y outputs */}

                          {mostrar && (
                            <>
                              <div className="flex space-x-4">
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code1" className="block text-sm font-medium leading-6 text-white">Input 1</label>
                                  <div className="mt-2">
                                    <input {...register('input1', {
                                      required: true,
                                    })} id="input1" name="input1" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code2" className="block text-sm font-medium leading-6 text-white">Output 1</label>
                                  <div className="mt-2">
                                    <input {...register('output1',
                                      { required: true })} id="output1" name="output1" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-4">
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code1" className="block text-sm font-medium leading-6 text-white">Input 2</label>
                                  <div className="mt-2">
                                    <input {...register('input2', {
                                      required: true,
                                    })} id="input2" name="input2" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code2" className="block text-sm font-medium leading-6 text-white">Output 2</label>
                                  <div className="mt-2">
                                    <input {...register('output2',
                                      { required: true })} id="output2" name="output2" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {mostrar1 && (
                            <>
                              <div className="flex space-x-4">
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code1" className="block text-sm font-medium leading-6 text-white">Input 1</label>
                                  <div className="mt-2">
                                    <input {...register('input1', {
                                      required: true,
                                    })} id="input1" name="input1" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code2" className="block text-sm font-medium leading-6 text-white">Output 1</label>
                                  <div className="mt-2">
                                    <input {...register('output1',
                                      { required: true })} id="output1" name="output1" type="text" autoComplete="outputs" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>

                              </div>

                              <div className="flex space-x-4">
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code1" className="block text-sm font-medium leading-6 text-white">Input 2</label>
                                  <div className="mt-2">
                                    <input {...register('input2', {
                                      required: true,
                                    })} id="input2" name="input2" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code2" className="block text-sm font-medium leading-6 text-white">Output 2</label>
                                  <div className="mt-2">
                                    <input {...register('output2',
                                      { required: true })} id="output2" name="output2" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-4">
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code1" className="block text-sm font-medium leading-6 text-white">Input 3</label>
                                  <div className="mt-2">
                                    <input {...register('input3', {
                                      required: true,
                                    })} id="input3" name="input3" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code2" className="block text-sm font-medium leading-6 text-white">Output 3</label>
                                  <div className="mt-2">
                                    <input {...register('output3',
                                      { required: true })} id="output3" name="output3" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                              </div>

                            </>
                          )}

                          {mostrar2 && (
                            <>
                              <div className="flex space-x-4">
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code1" className="block text-sm font-medium leading-6 text-white">Input 1</label>
                                  <div className="mt-2">
                                    <input {...register('input1', {
                                      required: true,
                                    })} id="input1" name="input1" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code2" className="block text-sm font-medium leading-6 text-white">Output 1</label>
                                  <div className="mt-2">
                                    <input {...register('output1',
                                      { required: true })} id="output1" name="output1" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-4">
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code1" className="block text-sm font-medium leading-6 text-white">Input 2</label>
                                  <div className="mt-2">
                                    <input {...register('input2', {
                                      required: true,
                                    })} id="input2" name="input2" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code2" className="block text-sm font-medium leading-6 text-white">Output 2</label>
                                  <div className="mt-2">
                                    <input {...register('output2',
                                      { required: true })} id="output2" name="output2" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-4">
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code1" className="block text-sm font-medium leading-6 text-white">Input 3</label>
                                  <div className="mt-2">
                                    <input {...register('input3', {
                                      required: true,
                                    })} id="input3" name="input3" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code2" className="block text-sm font-medium leading-6 text-white">Output 3</label>
                                  <div className="mt-2">
                                    <input {...register('output3',
                                      { required: true })} id="output3" name="output3" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-4">
                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code1" className="block text-sm font-medium leading-6 text-white">Input 4</label>
                                  <div className="mt-2">
                                    <input {...register('input4', {
                                      required: true,
                                    })} id="input4" name="input4" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>

                                <div className="sm:col-span-full mt-4">
                                  <label htmlFor="code2" className="block text-sm font-medium leading-6 text-white">Output 4</label>
                                  <div className="mt-2">
                                    <input {...register('output4',
                                      { required: true })} id="output4" name="output4" type="text" className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                        </div>
                      </div>
                    )}
                  </div>


                </div>

                {/*<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-8" htmlFor="file_input">Subir Archivo</label>
                <input className="block w-full text-sm text-gray-900 border border-indigo-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-indigo-600 dark:placeholder-indigo-400" id="file_input" type="file" />*/}

              </div>

            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-white-900">Cancel</button>
              <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div>
          </form>

        </div>
      </LayoutProf>


    </>

  )
}