import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link"; 
import backtierra from '@/public/blob-scene-haikei.png'
import MainLayout from '@/components/layouts/common/MainLayout';

export default function Home() {
  return (
    <> 
      <MainLayout></MainLayout>
     <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image 
        src={backtierra}
        alt="background"
        fill
        className="-z-10 !hidden opacity-60 sm:!inline"
      
      />

      <form action="" className='relative mt-24 space-y-5 rounded bg-blue/75 py-10 px-6 md:mt-0 md:max-w-md md:px-30'>
        <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-white-900">
              Inicia sesión
        </h2>
        <div className="space-y-4">
          <label className="inline-block space-y-2.5 w-full">
            <input   className="input py-2.5" type="email" placeholder="Correo institucional"/>
            <input className="input py-2.5"type="password" placeholder="Contraseña"/>
          </label>
        </div>

        <div className="flex py-0 items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-white-900">
                Mantenerme registrado
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-[#92dce5] hover:text-sky-50">
              Olvide mi contraseña
            </a>
          </div>
        </div>

        <button className=" my-0.5 w-full rounded bg-[#003399] py-2.5 font-semibold">
          Iniciar sesión
        </button> 

        <div className="my-0.5 text-[gray]">
          ¿No tienes cuenta?{' '} 
          <button type="submit" className="text-white hover:underline"> 
          <Link href="/login">Registrate aquí</Link>
          </button>
        </div>

      </form>
     </div>
    </>
  )
}