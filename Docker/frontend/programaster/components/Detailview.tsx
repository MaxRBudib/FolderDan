import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import backtierra from '@/public/blob-scene-haikei.jpeg'
import React, {useEffect, useState} from 'react';
import MainLayout from '@/components/layouts/common/MainLayout';
import LayoutProf from './layouts/common/LayoutProf';


export default function Home() {
  const [open, setOpen] = useState(false);
  const act = ['ICA 1.1', 'ICA 1.2', 'ICA 1.3']
  const cal = ['20', '95', '78']
  const nivel = ['Fácil', 'Medio', 'Dificil']
  const intento = ['1/2', '1/3', '1/2']
  const estado = ['Activa', 'Activa', 'Cerrada']

  const titulo: string = "Pensamiento computacional para ingeniería"
  const grupo: string = "6"
  return (
    <>
      <Head>
        <title>Detalles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutProf>
      <div className='flex flex-col bg-slate-800 p-6 mt-8 rounded-2xl'>
            <div className='flex place-content-center border-b-2 border-slate-500 mb-3 pb-3'>
              <h1 className='text-xl font-semibold text-slate-200'>Progreso de actividades</h1>
            </div>
            <div className='flex flex-row justify-between px-4 lg:px-8 text-slate-200'>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Actividad</span>
                {act.map((data) => (
                  <span className='py-1'>{data}</span>
                ))}
              </div>
              <div className='flex flex-row items-start'>
                <div className='flex flex-col items-start'>
                  <span className='pr-2 lg:pr-10 font-semibold'>% de Completado</span>
                  {cal.map((data) => (
                    <progress className="progress progress-accent w-3/4 my-3 bg-slate-600" value={data} max="100"></progress>
                  ))}
                </div>
                <div className='flex flex-col items-center'>
                  <span className='font-semibold'>#</span>
                  {cal.map((data) => (
                    <span className='py-1'>{data}</span>
                  ))}
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Nivel</span>
                {nivel.map((data) => (
                  <span className='py-1'>{data}</span>
                ))}
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Intentos</span>
                {intento.map((data) => (
                  <span className='py-1'>{data}</span>
                ))}
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Estado</span>
                {estado.map((data) => (
                  <div className={`${data == "Activa" ? 'badge-info' : 'badge-error'} badge text-sm my-1.5`}>{data}</div>
                ))}
              </div>
            </div>
          </div>
      </LayoutProf>
    </>
  )
}