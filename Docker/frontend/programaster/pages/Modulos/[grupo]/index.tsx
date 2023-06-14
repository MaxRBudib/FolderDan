import Head from 'next/head';
import axios from 'axios';
import LayoutProf from '@/components/layouts/common/LayoutProf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import React from "react";
import Link from "next/link"
import { useEffect, useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ActView from '@/components/Actividadesview'
import Estudianteview from '@/components/Estudianteview'

export default function Home() {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombreModulo: "",
    descripcionModulo: ""
  });
  const { user } = useContext(AuthContext)
  const [matriculas, setMatriculas] = useState()
  const [modulo, setModulo] = useState([])
  const [actividad, setActividad] = useState([])
  const router = useRouter()
  const [clase, setClase] = useState('')
  useEffect(() => {
    if (router.isReady) {
      try {
        setClase(router.query.grupo as string)
      } catch {

      }
    }
  }, [router.isReady])

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
      axios.get('http://127.0.0.1:9200/my_view/modulo/')
        .then(response => {
          // Handle the response data here
          let dataModulo = response.data
          dataModulo = dataModulo.filter(obj => obj.grupo_id == clase)
          setModulo(dataModulo);
        });
    } catch {
      console.log("Error getting modulo");
    }



  }, [user, clase]);

  useEffect(() => {
    try {
      console.log(modulo)
      console.log(clase)
      axios.get('http://127.0.0.1:9200/my_view/tarea/').then((response) => {
        setActividad(response.data)
      })

    } catch {
      console.log("zero")
    }
  }, [modulo])

  // const getActivities:any =  async () => {
  //  try {
  //  let save:string[] = [] 
  //  for (let i = 0; i < modulo.length; i++){
  //    const respuesta = await axios.get('http://127.0.0.1:9200/my_view/tarea/', {
  //      params: {
  //        modulo_id : modulo[i].modulo_id
  //      }
  //    })
  //    //console.log(respuesta.data[0])
  //    save.push(respuesta.data[0].nombre_tarea)
  //    //SetActivities(save)
  //  }
  //    console.log(save)
  //    return save
  //  //console.log(save)
  //  } catch {
  //    console.log("waiting")
  //  }
  // }





  function iconSelect(props: any) {
    if (props == "actividad") {
      return <FontAwesomeIcon icon={regular("file-code")} />;
    } else if (props == "leccion") {
      return <FontAwesomeIcon icon={regular("file-lines")} />;
    } else if (props == "archivo") {
      return <FontAwesomeIcon icon={solid("paperclip")} />;
    } else {
      return <FontAwesomeIcon icon={solid("paperclip")} />;
    }
  }

  const [activeTab, setActiveTab] = React.useState("Modulos");
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
    console.log(formData);
    const dic = {
      nombre_Modulo: formData.nombreModulo,
      descripcion: formData.descripcionModulo,
      grupo_id: clase
    }
    axios.post('http://127.0.0.1:9200/my_view/modulo/', dic)
    setOpen(false);
    setFormData({
      nombreModulo: "",
      descripcionModulo: ""
    })
  };

  const handleCancelDelete = () => {
    setOpen(false);
    setFormData({
      nombreModulo: "",
      descripcionModulo: ""
    })
  };
  const setterTabs = (val) => {
    console.log(val)
  }


  return (
    <>
      <Head>
        <title>Módulos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutProf>

        <section className="bg-gray-900 text-white">
          <div className="max-w-screen px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
            <div className="max-w-screen">
              <h2 className="text-3xl font-bold sm:text-4xl">What makes us special</h2>
            </div>
          </div>
        </section>
        <section className="bg-gray-900 text-white">
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
                    <div onClick={() => setActiveTab(label)}>{label} </div>
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

          {activeTab == "Modulos" ? (
            <>
              <section className='grid grid-cols-2 justify-items-center items-start gap-y-10 p-10'>
                {modulo.map((item, index) => (
                  <div tabIndex={0} className="w-3/4 collapse collapse-arrow border border-base-300 bg-base-100 rounded-2xl">

                    <input type="checkbox" />
                    <div className="collapse-title text-xl text-slate-200 font-medium">
                      <div key={index}>
                        {item.nombre_Modulo}
                      </div>
                    </div>
                    <div className="collapse-content flex flex-col justify-center">
                      {actividad.map((contenido, indice) => (
                        <div>
                          {item.modulo_id === contenido.modulo_id ? (
                            <div className="flex items-center border-b-2 mb-4 pl-3 border-slate-400 text-slate-200 rounded-lg hover:bg-gray-700">
                              <div className='text-xl py-1'>{iconSelect(contenido.tipo)}</div>
                              <Link href="/">{contenido.nombre_tarea}</Link>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
              <div className='flex flex-row justify-end'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 mx-6 mb-6 rounded-lg font-bold'
                  onClick={handleAddActivity}>
                  Agregar Módulo
                </button>
              </div>
            </>
          ) : activeTab == "Actividades" ? (
            <div>
              <ActView></ActView>
            </div>
          ) : activeTab == "Estudiantes" ? (
            <div>
              <Estudianteview></Estudianteview>
            </div>
          ) : (
            <div>
              none
            </div>
          )}

          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h2 className="text-lg font-bold mb-4 text-black">Agregar Módulo</h2>
                  <p className="text-black">Para crear un módulo, complete los siguientes campos:</p>
                  <form onSubmit={handleFormSubmit}>
                    <div className="my-4">
                      <label className="block font-medium mb-2 text-black">Nombre del módulo:</label>
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
                      <label className="block font-medium mb-2 text-black">Descripción del módulo:</label>
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
                        Agregar
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


        </section>
      </LayoutProf >

    </>
  );
}
