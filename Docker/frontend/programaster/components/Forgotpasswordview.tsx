'use client';
import Head from 'next/head';
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import React, { HtmlHTMLAttributes, useContext, useEffect, ChangeEvent, useState } from 'react';
import axios from 'axios';


interface FormData {
  email: string;
}

export default function Home() {

  const [correoEnviado, setCorreoEnviado] = useState(false)
  const [correoNoExiste, setCorreoNoExiste] = useState(false)


  const router = useRouter();

  const { register, formState: { errors }, handleSubmit, getValues } = useForm<FormData>()

  const onSubmit = handleSubmit((values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    const dic = {
      "email":
      values.email
    }
    console.log(dic)
    
    axios.get('http://127.0.0.1:8000/my_view/usuarios/', dic, config).then((response) => {
      console.log(response)
      if (response.data.exists) {
        setCorreoEnviado(true)
      } else {
        setCorreoNoExiste(true)
      }
    })
  })

  return (
    <>
      <div className='h-screen w-full bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-950'>
        <div className="flex h-screen flex-col md:items-center md:justify-center w-96 mx-auto">
          <Head>
            <title>Olvide mi contraseña</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <form onSubmit={onSubmit} action="" className='relative space-y-3 min-h-full flex-col justify-center px-6 py-12 lg:px-8 md:mt-0 md:px-30'>
            <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-slate-100">
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="font-semibold text-center text-base text-slate-300">
              Si tienes problemas para iniciar sesión, ingresa el correo institucional vinculado a tu cuenta. 
              Te enviaremos un correo de recuperación de contraseña.
            </p>
            <div className="space-y-2">
              <input {...register('email',
                {required: true,
                  pattern: /[aAlL]\d{8}@(itesm|tec)\.mx/
                }
              )}
                name="email" className="border-2 border-slate-500 bg-gray-900 input py-2.5" type="text" placeholder="Ejem: A01111111@tec.mx"/>
              {errors.email?.type == 'required' &&
                <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Por favor inserte su correo institucional.</span>
                  </div>
                </div>
              }
              {errors.email?.type == 'pattern' &&
                <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Correo inválido, por favor revise el formato de su correo.</span>
                  </div>
                </div>
              }
            </div>

            <button type="submit" className="text-slate-100 my-0.5 w-full rounded bg-[#003399] py-2.5 font-semibold">
              Enviar correo
            </button>

            {correoEnviado && (
              <div className="flex text-sm text-green-800 dark:text-green-400" role="alert">
                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Hemos enviado un correo de recuperación su correo institucional.</span>
                </div>
              </div>
            )}

            {correoEnviado && (
              <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Este usuario con este correo no existe, inténtelo denuevo.</span>
                </div>
              </div>
            )}

            <div className="my-0.5 text-[gray]">
              ¿No tienes cuenta?{' '}
              <button type="submit" className="text-slate-100 hover:underline">
                <Link href="/auth/signup">Registrate aquí</Link>
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}