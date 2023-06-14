'use client';
import Head from 'next/head';
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import React, { HtmlHTMLAttributes, useContext, useEffect } from 'react';


interface FormData {
  correo: string;
  contraseña: string;
}

export default function Home() {

  const { loginUser } = useContext(AuthContext);

  const router = useRouter();

  const { register, formState: { errors }, getValues } = useForm<FormData>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginUser(e)
    // alert("Form submited!")
  }


  //const onSubmit = handleSubmit((values) => {
  //  alert("Form submited!")
  //  router.push('/auth/signup')
  //})

  return (
    <>
      <div className='h-full w-full bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-950'>
        <div className="flex h-screen flex-col md:items-center md:justify-center w-96 mx-auto">
          <Head>
            <title>Login</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <form onSubmit={handleSubmit} action="" className='relative space-y-5 min-h-full flex-col justify-center px-6 py-12 lg:px-8 md:mt-0 md:px-30'>
            <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-slate-100">
              Inicia sesión
            </h2>
            <div className="space-y-2">
              <label className="block font-semibold leading-6 text-slate-100">Correo Institucional</label>
              <input {...register('correo',
                {
                  required: true,
                  pattern: /[aAlL]\d{8}@(itesm|tec)\.mx/
                }
              )}
                name="email" className="border-2 border-slate-500 bg-gray-900 input py-2.5" type="text" />
              {errors.correo?.type == 'required' &&
                <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Por favor inserte su correo institucional</span>
                  </div>
                </div>
              }
              {errors.correo?.type == 'pattern' &&
                <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Correo inválido</span>
                  </div>
                </div>
              }
              <label className="font-semibold leading-6 text-slate-100">Password</label>
              <input {...register('contraseña',
                {
                  required: true,
                  pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&^+=-])[^\s]{8,20}/
                }
              )}
                name="password" className="border-2 border-slate-500 bg-gray-900 input py-2.5" type="password" />
              {errors.contraseña?.type == 'required' &&
                <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Por favor inserte su contraseña</span>
                  </div>
                </div>
              }
              {errors.contraseña?.type == 'pattern' &&
                <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Contraseña incorrecta, vuelva a intentarlo</span>
                  </div>
                </div>
              }
            </div>

            <div className="flex py-0 items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-100">
                  Mantenerme registrado
                </label>
              </div>

              <div className="text-sm">
                <a href="/auth/forgotpasswordview" className="font-medium text-slate-100 hover:underline">
                  Olvidé mi contraseña
                </a>
              </div>
            </div>

            <button type="submit" className="text-slate-100 my-0.5 w-full rounded bg-[#003399] py-2.5 font-semibold">
              Iniciar sesión
            </button>

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