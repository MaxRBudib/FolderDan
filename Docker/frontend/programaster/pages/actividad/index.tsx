import Head from 'next/head';
import LayoutProf from '@/components/layouts/common/LayoutProf';
import Link from "next/link";
import AddAct from '@/components/AddAct';

import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export default function Home() {

  const [activeTab, setActiveTab] = React.useState("actividad");
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
    console.log('Agregar Actividad')
  }

  return (
    <>
      <Head>
        <title>Actividades</title>
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
                        {value === 'actividad' && (
                          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                            <div className="flex items-start gap-4">
                              <span className="shrink-0 rounded-lg bg-white p-4">
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                  <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                  ></path>
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                  ></path>
                                </svg>
                              </span>

                              <div>
                                <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                                <p className="mt-1 text-sm text-white">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                                  cumque tempore est ab possimus quisquam reiciendis tempora animi!
                                  Quaerat, saepe?
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <span className="shrink-0 rounded-lg bg-white p-4">
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                  <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                  ></path>
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                  ></path>
                                </svg>
                              </span>

                              <div>
                                <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                                <p className="mt-1 text-sm text-white">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                                  cumque tempore est ab possimus quisquam reiciendis tempora animi!
                                  Quaerat, saepe?
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <span className="shrink-0 rounded-lg bg-white p-4">
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                  <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                  ></path>
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                  ></path>
                                </svg>
                              </span>

                              <div>
                                <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                                <p className="mt-1 text-sm text-white">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                                  cumque tempore est ab possimus quisquam reiciendis tempora animi!
                                  Quaerat, saepe?
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <span className="shrink-0 rounded-lg bg-white p-4">
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                  <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                  ></path>
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                  ></path>
                                </svg>
                              </span>

                              <div>
                                <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                                <p className="mt-1 text-sm text-white">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                                  cumque tempore est ab possimus quisquam reiciendis tempora animi!
                                  Quaerat, saepe?
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <span className="shrink-0 rounded-lg bg-white p-4">
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                  <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                  ></path>
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                  ></path>
                                </svg>
                              </span>

                              <div>
                                <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                                <p className="mt-1 text-sm text-white">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                                  cumque tempore est ab possimus quisquam reiciendis tempora animi!
                                  Quaerat, saepe?
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <span className="shrink-0 rounded-lg bg-white p-4">
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                  <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                  ></path>
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                  ></path>
                                </svg>
                              </span>
                              <div>
                                <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                                <p className="mt-1 text-sm text-white">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                                  cumque tempore est ab possimus quisquam reiciendis tempora animi!
                                  Quaerat, saepe?
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </TabPanel>
                    ))}
                  </TabsBody>
                </Tabs>
              </div>
            </div>
          </div>
          <div className='flex flex-row justify-end'>
          <Link href="/userview/AddAct" className="">
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 mx-6 mb-6 rounded-lg font-bold'
            onClick={handleAddActivity}>
            Agregar Actividad
          </button>
          </Link>
          </div>
        </section>
      </LayoutProf>

    </>

  )
}