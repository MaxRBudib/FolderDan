// components/common/ViewLayout.tsx
import React, { PropsWithChildren, useEffect, useState } from "react";
import DropdownUser from '@/components/Utilities/DropdownUser';
import Link from "next/link";

const LayoutProf = ({ children }: PropsWithChildren) => {

    const [open, setOpen] = useState(true);


    return (
        <>
            <nav className="dark:bg-gray-800 fixed w-full z-30 top-0 left-0 border-b border-gray-600">
                <div className="p-4 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button aria-expanded="true" aria-controls="sidebar" className="inline-flex items-center px-2 mr-2 text-sm text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 hover:bg-gray-700" onClick={() => setOpen(!open)}>
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-5 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="https://flowbite.com" className="flex">
                                <img src='/logo.png' className="h-8 mr-3" alt="Programaster Logo" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Programaster</span>
                            </a>
                        </div>
                        <DropdownUser></DropdownUser>
                    </div>
                </div>
            </nav>
            <div className="flex h-screen pt-16 overflow-hidden dark:bg-gray-900">
                <aside className={`${open ? "w-64" : "w-16"} flex flex-col h-full duration-200 bg-white box-border border-gray-200  dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
                    <div className="relative flex flex-1 flex-col pt-0 min-h-0 border-r dark:border-slate-700 dark:bg-gray-800">
                        <div className="flex flex-1 flex-col pb-4 pt-5 overflow-y-auto ">
                            <div className="flex-1 box-border block dark:bg-gray-800 px-3">
                                <ul className="pb-2 space-y-5 font-normal">
                                    <li>
                                        <Link href="/userview/Profesorview" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>
                                                <span className={`${!open && 'hidden'} flex-1 ml-3 whitespace-nowrap`}>Dashboard</span>
                                        </Link>
                                    </li>
                                    {/*<li>
                                        <Link href="/tablero" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" /></svg>
                                                <span className="flex-1 ml-3 whitespace-nowrap">Tablero</span>
                                            </div>
                                        </Link>
                                    </li>*/}
                                    <li>
                                        <Link href="/grupos" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clip-rule="evenodd" /><path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" /></svg>
                                                <span className={`${!open && 'hidden'} flex-1 ml-3 whitespace-nowrap`}>Mis Grupos</span>
                                        </Link>
                                    </li>
                                    {/*<li>
                                        <Link href="/actividad" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" /><path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" /></svg>
                                                <span className="flex-1 ml-3 whitespace-nowrap">Crear Actividad</span>
                                            </div>
                                        </Link>
                                    </li>*/}
                                    <li>
                                        <Link href="/reactivos" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fill-rule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" /></svg>
                                                <span className={`${!open && 'hidden'} flex-1 ml-3 whitespace-nowrap`}>Crear Ejercicios</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="relative w-full h-full overflow-y-auto">
                    <main>{children}</main>
                </div>
            </div>
        </>
    );
};
//NO BORRAR NADA, EL LAYOUT FUNCIONA PERO TENEMOS QUE MODIFICAR LAS PAGINAS
export default LayoutProf;