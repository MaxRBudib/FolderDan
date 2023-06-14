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
        <title>Tablero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image 
        src={backtierra}
        alt="background"
        fill
        className="-z-10 !hidden opacity-60 sm:!inline"
      
      />


<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
          <img src='/logo.png' className="h-8 mr-3" alt="FlowBite Logo"/>
          <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap dark:text-white">Programaster</span>
        </a>
      </div>
      <div className="flex items-center">
          <div className="flex items-center ml-3">
            <div>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"></img>
              </button>
            </div>
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">Aitor Menta</p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">A01738492@tec.mx</p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Ajustes</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Configuración</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Cerrar sesión</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
         <li>
            <Link href="/Dashboard">
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
            </div>
            </Link>
         </li>
         <li>
          <Link href="/tablero">
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" /></svg>
               <span className="flex-1 ml-3 whitespace-nowrap">Tablero</span>
            </div>
          </Link>
         </li>
         <li>
          <Link href="/grupos">
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clip-rule="evenodd" /><path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" /></svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Mis Grupos</span>
            </div>
          </Link>
         </li>
         <li>
          <Link href="/actividad">
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" /><path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" /></svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Crear Actividad</span>
            </div>
          </Link>
         </li>
         <li>
          <Link href="/reactivos">
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fill-rule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" /></svg>
               <span className="flex-1 ml-3 whitespace-nowrap">Crear Reactivos</span>
            </div>
          </Link>
         </li>
      </ul>
   </div>
</aside>

<div className="overflow-x-auto w-full mr-5">
  <table className="table w-5/6 ml-auto">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Nombre</th>
        <th>Grupo</th>
        <th>Matricula</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/avatar1.jpg" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Maximiliano</div>
              <div className="text-sm opacity-50">Romero Budib</div>
            </div>
          </div>
        </td>
        <td>
          Programación Orientada a Objetos
          <br/>
          <span className="badge badge-ghost badge-sm">Grupo 826</span>
        </td>
        <td>A01732008</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      {/* row 2 */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/avatar2.jpg" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Oscar Sebastian</div>
              <div className="text-sm opacity-50">Martinez Sanchez</div>
            </div>
          </div>
        </td>
        <td>
          Programación Orientada a Objetos
          <br/>
          <span className="badge badge-ghost badge-sm">Grupo 1</span>
        </td>
        <td>A01379654</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      {/* row 3 */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox"/>
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/avatar3.jpg" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Diego Gael</div>
              <div className="text-sm opacity-50">Villaverde Nieves</div>
            </div>
          </div>
        </td>
        <td>
          Programación Orientada a Objetos
          <br/>
          <span className="badge badge-ghost badge-sm">Grupo 826</span>
        </td>
        <td>A01275147</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      {/* row 4 */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/avatar4.jpg" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Juan Carlos</div>
              <div className="text-sm opacity-50">Ferrer Echeverría</div>
            </div>
          </div>
        </td>
        <td>
          Programación Orientada a Objetos
          <br/>
          <span className="badge badge-ghost badge-sm">Grupo 826</span>
        </td>
        <td>A0...</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
    
  </table>
</div>

      </div>

    </>
    
  )
}