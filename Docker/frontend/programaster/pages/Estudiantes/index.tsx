import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import backtierra from '@/public/blob-scene-haikei.png'

import MainLayout from '@/components/layouts/common/MainLayout';
import LayoutProf from '@/components/layouts/common/LayoutProf';

import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export default function Home() {
  const [activeTab, setActiveTab] = React.useState("Estudiantes");
  const data = [
    {
      id: 1,
      label: "Modulos",
      value: "Modulos",
    },
    {
      id: 2,
      label: "Actividades",
      value: "actividad",
    },
    {
      id: 3,
      label: "Estudiantes",
      value: "Estudiantes",
    },
  ];

  const [students, setStudents] = useState([
    {
      id: 1,
      nombre: "Maximiliano",
      apellido: "Romero Budib",
      grupo: "Programación Orientada a Objetos - Grupo 826",
      matricula: "A01732008"
    },
    {
      id: 2,
      nombre: "Oscar Sebastian",
      apellido: "Martinez Sanchez",
      grupo: "Programación Orientada a Objetos - Grupo 1",
      matricula: "A01379654"
    },
    {
      id: 3,
      nombre: "Diego Gael",
      apellido: "Villaverde Nieves",
      grupo: "Programación Orientada a Objetos - Grupo 826",
      matricula: "A01275147"
    },
    {
      id: 4,
      nombre: "Maximiliano",
      apellido: "Soberano",
      grupo: "Programación Orientada a Objetos - Grupo 826",
      matricula: "A00000"
    },
    {
      id: 5,
      nombre: "Juan Carlos",
      apellido: "Ferrer Echeverria",
      grupo: "Programación Orientada a Objetos - Grupo 826",
      matricula: "A01730000"
    },
  ])

  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handleCheckboxChange = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleDelete = () => {
    setIsDeletePopupOpen(true);
    //logica para nuevos elementos
  };

  const handleAdd = () => {
    //logica para nuevos elementos
    const newStudent = {
      id: students.length + 1,
      nombre: "Nuevo",
      apellido: "Estudiante",
      grupo: "Nuevo grupo",
      matricula: "Nueva mayricula"
    }
    setStudents([...students, newStudent]);
  };

  const handleConfirmDelete = () => {
    setStudents(students.filter((_, index) => !selectedRows.includes(index)))
    setSelectedRows([]);
    setIsDeletePopupOpen(false);
  }

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
  }

  return (
    <>
      <Head>
        <title>Estudiantes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutProf>
        <section className="bg-gray-900 text-white">
          <div className="max-w-screen px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
            <div className="max-w-screen">
              <h2 className="text-3xl font-bold sm:text-4xl">What makes us special</h2>
              <div className="mt-14">
                <Tabs value={activeTab} onChange={setActiveTab}>
                  <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 max-w-screen"
                    indicatorProps={{
                      className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                    }}
                  >
                    {data.map(({ label, value }) => (
                      <Tab
                        key={value}
                        value={value}
                        className={activeTab === value ? "text-blue-500 font-bold" : "text-lg font-bold"}
                      >
                        <a href={`/${value}`}>{label}</a>
                      </Tab>
                    ))}
                  </TabsHeader>
                  <TabsBody>
                    {data.map(({ value }) => (
                      <TabPanel key={value} value={value}>

                      </TabPanel>
                    ))}
                  </TabsBody>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-center items-center mb-80">
          <div className='w-5/6'>
            <div className='flex justify-end mb-4'>
              <button className='btn bg-green-500 hover:bg-green-600 text-white' onClick={handleAdd}>
                Agregar
              </button>
              <button className='btn bg-red-500 hover:bg-red-600 text-white ml-4' onClick={handleDelete} disabled={selectedRows.length === 0}>
                Eliminar
              </button>
            </div>
            <div className='overflow-x-auto'>
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th>
                      <label>
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
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={selectedRows.includes(index)}
                            onChange={() => handleCheckboxChange(index)}
                          />
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
                            <div className="font-bold">{student.nombre}</div>
                            <div className="text-sm opacity-50">{student.apellido}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {student.grupo}
                      </td>
                      <td>{student.matricula}</td>
                      <th>
                        <Link href="/userview/Detailview" className=''>
                          <button className="btn btn-ghost btn-xs">details</button>
                        </Link>
                      </th>
                    </tr>
                  ))}

                </tbody>

              </table>
            </div>
            {isDeletePopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-lg font-bold mb-4">Confirmar Eliminación</h2>
                  <p>¿Estás seguro de que deseas eliminar a los estudiantes seleccionados?</p>
                  <div className="flex justify-end mt-6">
                    <button
                      className="btn btn-red"
                      onClick={handleConfirmDelete}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-gray ml-2"
                      onClick={handleCancelDelete}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </LayoutProf>
    </>

  );
}