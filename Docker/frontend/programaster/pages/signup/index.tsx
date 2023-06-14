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
        <title>Regístrate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image 
        src={backtierra}
        alt="background"
        fill
        className="-z-10 !hidden opacity-60 sm:!inline"
      
      />

      <form action="" className='relative mt-24 space-y-5 rounded bg-blue/75 py-10 px-6 md:mt-0 md:max-w-md md:px-30 '>
        <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-white-900">
              Regístrate
        </h2>
        <div className="space-y-4">
          <label className="inline-block space-y-2.5 w-full">
            <input className="input py-2.5" type="text" placeholder="Matricula o Nómina"/>
            <div className="flex space-x-2.5"> 
              <input className="input py-2.5" type="text" placeholder="Nombre(s)"/>
              <input className="input py-2.5" type="text" placeholder="Apellido(s)"/>
            </div>
            <input className="input py-2.5" type="email" placeholder="Correo Institucional"/>
            <div className="flex space-x-2.5">
              <input className="input py-2.5"type="password" placeholder="Contraseña"/>
              <input className="input py-2.5"type="password" placeholder="Confirmar contraseña"/>
            </div>
          </label>
        </div>

        <button className=" my-0.5 w-full rounded bg-[#003399] py-2.5 font-semibold">
          Registrarme
        </button> 


        <div className="my-0.5 text-[gray]">
          ¿Ya tienes cuenta?{' '} 
          <button type="submit" className="text-white hover:underline"> 
          <Link href="/login">Inicia Sesión</Link>
          </button>
        </div>
      </form>
     </div>
    </>
  )
}