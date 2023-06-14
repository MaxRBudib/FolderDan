import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import backtierra from '@/public/blob-scene-haikei.jpeg'
import MainLayout from '@/components/layouts/common/MainLayout';
import LayoutProf from './layouts/common/LayoutProf';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const { user } = useContext(AuthContext)
  const [matriculas, setMatriculas] = useState()
  const [grupo, setGrupo] = useState([])
  useEffect(() => {

    if (user) {
      try {
        const decodedUser: any = jwtDecode(user);
        setMatriculas(decodedUser.user_id)
      } catch {
        setMatriculas(user.user_id)
      }
    }
    try {
      axios.get('http://127.0.0.1:8000/my_view/grupo/', {
        params: {
          profe_nomina: user.user_id
        }
      })
        .then(response => {
          // Handle the response data here
          const dataGrupo = response.data
          console.log(dataGrupo)
          setGrupo(dataGrupo)
        });
    } catch {
      console.log("Error getting modulo");
    }
  }, [user]);

  const [activeGroup, setActiveGroup] = useState(null);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    grupo_id: "",
    nombreModulo: "",
    descripcionModulo: ""
  });

  const handleGroupClick = (groupIndex) => {
    setActiveGroup(groupIndex === activeGroup ? null : groupIndex)
  };

  const handleAddActivity = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para guardar los datos del formulario

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }

      }
      const intento = {
        "grupo_id":
          formData.grupo_id
        ,
        "titulo":
          formData.nombreModulo
        ,
        "descripcion":
          formData.descripcionModulo

      }


      axios.post('http://127.0.0.1:8000/my_view/anuncio/', intento, config).then((response) => {

        alert("Form submited!");

      })

    } catch {
      console.log("Post incorrecto")
    }
    setOpen(false);
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };

  const Navbar = () => {
    return (
      <nav className="bg-transparent py-4 px-8 flex items-center justify-end">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md " style={{ fontSize: '1.2rem' }} onClick={handleAddActivity}>
          Agregar Anuncio
        </button>
      </nav>
    );
  }

  return (
    <>
      <Head>
        <title>Profesor View</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutProf>
        <Navbar />
        <div className='flex ml-20'>
            <div className="w-full max-w-screen-md">
              <div className="flex items-center h-20 px-4 border-b border-gray-500">
                <div className="w-40"></div>
                <div className="flex-grow text-lg font-semibold text-center">Actividad 1</div>
                <div className="flex-grow text-lg font-semibold text-center">Actividad 2</div>
                <div className="flex-grow text-lg font-semibold text-center">Actividad 3</div>
              </div>


              {/* Grupo 1 */}
              <div className="border-b border-gray-500">
                <div
                  className="flex items-center h-12 px-4 bg-gray-100"
                  onClick={() => handleGroupClick(0)}
                >
                  <div className="font-medium">Grupo 1</div>
                  {activeGroup === 0 ? (
                    <svg
                      className="w-4 h-4 ml-auto text-gray-500 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 6.293a1 1 0 010 1.414L2.414 10l2.879 2.879a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L2.414 8l2.879 2.879a1 1 0 01-1.414 1.414l-4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 ml-auto text-gray-500 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6a1 1 0 011-1h6a1 1 0 010 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 010 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 010 2H7a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {activeGroup === 0 && (
                  <div className="px-4 py-2 bg-gray-50">
                    {/* Contenido del grupo 1 */}
                    <div className="flex items-center h-12 px-4 border-b border-gray-500">
                      <div className="w-40">Alumno A</div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center h-12 px-4 border-b border-gray-500">
                      <div className="w-40">Alumno B</div>
                      <div className="flex-grow w-0"></div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center h-12 px-4 border-b border-gray-500">
                      <div className="w-40">Alumno C</div>
                      <div className="flex-grow w-0"></div>
                      <div className="flex-grow w-0"></div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Grupo 2 */}
              <div className="border-b border-gray-500">
                <div
                  className="flex items-center h-12 px-4 bg-gray-100"
                  onClick={() => handleGroupClick(1)}
                >
                  <div className="font-medium">Grupo 2</div>
                  {activeGroup === 1 ? (
                    <svg
                      className="w-4 h-4 ml-auto text-gray-500 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 6.293a1 1 0 010 1.414L2.414 10l2.879 2.879a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L2.414 8l2.879 2.879a1 1 0 01-1.414 1.414l-4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 ml-auto text-gray-500 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6a1 1 0 011-1h6a1 1 0 010 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 010 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 010 2H7a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {activeGroup === 1 && (
                  <div className="px-4 py-2 bg-gray-50">
                    {/* Contenido del grupo 2 */}
                    <div className="flex items-center h-12 px-4 border-b border-gray-500">
                      <div className="w-40">Alumno A</div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center h-12 px-4 border-b border-gray-500">
                      <div className="w-40">Alumno B</div>
                      <div className="flex-grow w-0"></div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center h-12 px-4 border-b border-gray-500">
                      <div className="w-40">Alumno C</div>
                      <div className="flex-grow w-0"></div>
                      <div className="flex-grow w-0"></div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Grupo 3 */}
              <div className="border-b border-gray-500">
                <div
                  className="flex items-center h-12 px-4 bg-gray-100"
                  onClick={() => handleGroupClick(2)}
                >
                  <div className="font-medium">Grupo 3</div>
                  {activeGroup === 2 ? (
                    <svg
                      className="w-4 h-4 ml-auto text-gray-500 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 6.293a1 1 0 010 1.414L2.414 10l2.879 2.879a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L2.414 8l2.879 2.879a1 1 0 01-1.414 1.414l-4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 ml-auto text-gray-500 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6a1 1 0 011-1h6a1 1 0 010 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 010 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 010 2H7a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {activeGroup === 2 && (
                  <div className="px-4 py-2 bg-gray-50">
                    {/* Contenido del grupo 3 */}
                    <div className="flex items-center h-12 px-4 border-b border-gray-500">
                      <div className="w-40">Alumno A</div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center h-12 px-4 border-b border-gray-500">
                      <div className="w-40">Alumno B</div>
                      <div className="flex-grow w-0"></div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center h-12 px-4 border-b border-gray-500">
                      <div className="w-40">Alumno C</div>
                      <div className="flex-grow w-0"></div>
                      <div className="flex-grow w-0"></div>
                      <div className="flex justify-center flex-grow w-0">
                        <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
        </div>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-gray-600 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4">
                <h2 className="text-lg font-bold mb-4 text-white">Agregar Anuncio</h2>
                <p className="text-white">Para crear un anuncio, complete los siguientes campos:</p>
                <form onSubmit={handleFormSubmit}>

                  <div className="my-4">
                    <label htmlFor="Tema" className="block font-medium leading-6 text-white mt-8">Grupo</label>

                    <div className="mt-2">

                      <select name="grupo_id" id="grupo_id" autoComplete="grupo_id" value={formData.grupo_id} onChange={handleFormChange} className="text-white w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

                        <option value="">- Selección -</option>
                        {grupo.map((item, index) => (
                        <option value={item.grupo_id} key = {index}>
                         Grupo: {item.grupo_id}
                        </option>
                      ))}
                        
                       </select>
                    
                  </div>
                 
                      
                  </div>
                    <div className="my-4">
                      <label className="block font-medium mb-2 text-black">Titulo del anuncio:</label>
                      <input
                        type="text"
                        name="nombreModulo"
                        value={formData.nombreModulo}
                        onChange={handleFormChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="my-4">
                      <label className="block font-medium mb-2 text-black">Descripción del anuncio</label>
                      <textarea
                        name="descripcionModulo"
                        value={formData.descripcionModulo}
                        onChange={handleFormChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end mt-6">
                      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-bold">
                        Publicar
                      </button>
                      <button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg ml-2"
                        onClick={handleCancelDelete}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
      </LayoutProf >

    </>

  )
}