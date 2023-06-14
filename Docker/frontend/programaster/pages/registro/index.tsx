import Head from 'next/head';
import Image from 'next/image';
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

      <form action="" className='relative mt-24 space-y-8 rounded bg-blue/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
        <h1>Log in</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input className="input" type="email" placeholder="Email"/>
          </label>
          <label className="inline-block w-full">
            <input className="input"type="password" placeholder="Password"/>
          </label>
        </div>

  
        <button className="w-full rounded bg-[#003399] py-3 font-semibold">
          Log in
        </button>
        <div className="text-[gray]">
          ¿Aún no tienes cuenta?{' '} 
          <button type="submit" className="text-white hover:underline"> Inscribete</button>
        </div>
      </form>
     </div>
    </>
  )
}