import Head from 'next/head';
import React from 'react';
import Timer from './Utilities/Timer';
import Data from '@/public/choiceDummy.json'
import axios from 'axios';
import { useEffect, useState } from 'react';
import ViewLayout from '@/components/layouts/common/ViewLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'

const extensions = [python()];

export default function Home() {

  const [code, setCode] = useState('print()')
  let answ = ''
  const [post, setPost] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage;
  const firstIndex = lastIndex - 1;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Data.length
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const [type, setType] = useState("Multiple")
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  const getChoiceJSON = (page: number) => {
    setCurrentPage(page);
    axios.get(`http://127.0.0.1:8000/my_view/Opciones/?ejercicio_id={  }`)
      .then((response) => {
        setPost(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  //axios.get('http://127.0.0.1:8000/my_view/Opciones/').then((response) => {
  //})

  //To use when connected to the backend
  //useEffect(() => {
  //  // Fetch the total number of pages from the backend using Axios
  //  axios
  //    .get('/api/total-pages') // Replace with your backend API endpoint
  //    .then((response) => {
  //      const total = response.data.totalPages;
  //      setTotalPages(total);
  //      setCurrentPage(Math.min(currentPage, total));
  //    })
  //    .catch((error) => {
  //      console.error('Error fetching total pages:', error);
  //    });
  //}, []);


  //const renderPageButtons = () => {
  //  const buttons = [];
  //  for (let i = 1; i <= totalPages; i++) {
  //    buttons.push(
  //      <button
  //        key={i}
  //        className={`mx-1 px-2 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
  //          }`}
  //        onClick={() => handlePageChange(i)}
  //      >
  //        {i}
  //      </button>
  //    );
  //  }
  //  return buttons;
  //};

  const runCode = () => {
    console.log(answ)
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  function changeCPage(id: number) {
    setCurrentPage(id)
  }

  function Reactivo({ d }: any) {
    if (d.type == "Multiple") {
      return (
        <div className='min-h-[72%] flex flex-col items-center justify-center p-8'>
          <form className='w-3/5'>
            <div className='flex flex-col'>
              <fieldset>
                <div className="rounded-lg shadow-md bg-gray-800 p-8 flex flex-col justify-between">
                  <div className="border-b border-slate-200 pb-4 font-semibold text-lg text-gray-800 dark:text-gray-200">{d.description}</div>
                  {d?.options?.map((content: any, i: any) => (
                    <div className="form-control" key={i}>
                      <label className="label pt-4 justify-start cursor-pointer">
                        <input type="radio" name="status" id={i.toString()} className="peer/option1 radio radio-sm radio-info border-slate-300 mr-3" />
                        <span className="peer-checked/option1:text-cyan-600 font-medium text-base label-text">{content.text}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <button className='place-self-end rounded-md p-2 mt-8 font-bold bg-gray-700 hover:bg-gray-600'>Submit</button>
            </div>
          </form>
        </div>
      );
    } else if (d.type == "Codigo") {
      return (
        <div className='h-[72%] flex items-start justify-center p-4'>
          <div className='flex flex-col bg-gray-800 block rounded-lg shadow-md h-full w-2/5 mr-5'>
            <div className='flex flex-col h-full w-full overflow-y-auto'>
              <div className='flex flex-col items-center'>
                <div className="flex flex-col w-full h-full p-6">
                  <div className='flex flex-row justify-start items-center'>
                    <span className="font-mono font-semibold text-lg text-gray-200">{d.title}</span>
                    <span className="badge badge-primary font-medium text-sm text-gray-100 ml-6 mr-2">{d.difficulty}</span>
                  </div>
                  <span className='font-base font-mono text-sm leading-tight text-gray-100 pt-3'>{d.description}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-col h-full w-full'>
            <CodeMirror className='flex-grow h-1/2 bg-gray-800 rounded-lg overflow-auto'
              value={code}
              extensions={extensions}
              theme={'dark'}
              indentWithTab={true}
              onChange={(editor, value) => {
                answ = editor
              }}
            />
            <div className='flex space-x-3 pt-3 justify-between w-full h-[41.666667%]'>
              <div className='w-1/2 h-full bg-gray-800 rounded-lg overflow-auto'></div>
              <div className='w-1/2 h-full bg-gray-800 rounded-lg overflow-auto'></div>
            </div>
            <div className='flex h-[8.333333%] w-full justify-end items-center font-mono font-normal pt-2 space-x-2 '>
              <button className="btn btn-neutral text-slate-200 bg-violet-700 btn-sm" onClick={runCode}>Run</button>
              <button className="btn btn-neutral text-slate-200 hover:bg-gray-800 bg-gray-700 btn-sm">Submit</button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <Head>
        <title>Tareas View</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewLayout>
        <div className='bg-gradient-to-r from-blue-950 via-slate-800 to-slate-950 flex flex-col justify-center font-sans w-full min-h-[12%] border-b-2 border-slate-400'>
          <div className='flex justify-between p-4 px-6'>
            <span className='self-center text-3xl font-semibold text-slate-100'>ICA 1.1</span>
            <div className='flex flex-col gap-y-2'>
              <span className='text-base font-semibold text-slate-100'>Tiempo Restante: {<Timer expiryTimestamp={time}></Timer>}</span>
              <span className='text-sm font-medium text-slate-100'>Tarea cierra: 29 de Mayo 11:59 pm</span>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-blue-950 via-slate-800 to-slate-950 flex flex-row justify-between items-center min-h-[9%] py-2 border-b-2 border-slate-400'>
          <div className='flex flex-row gap-2 items-center justify-center pl-4'>
            <button onClick={prevPage} className='w-fit rounded-md p-3 font-bold bg-gray-700 hover:bg-gray-600'>
              <FontAwesomeIcon icon={solid("angle-left")} />
            </button>
            {numbers.map((n, i) => (
              <div key={i} className={`${currentPage === n ? 'active' : ''}flex gap-2`}>
                <button onClick={() => changeCPage(n)} className={`${currentPage === n ? 'bg-gray-600' : 'bg-gray-700'} w-fit rounded-md py-2 px-4 font-bold hover:bg-gray-600`}>{n}</button>
              </div>
            ))}
            <button onClick={nextPage} className='w-fit rounded-md p-3 font-bold bg-gray-700 hover:bg-gray-600'>
              <FontAwesomeIcon icon={solid("angle-right")} />
            </button>
          </div>
          <span className='px-5 text-base font-semibold dark:text-slate-100'>Pregunta {currentPage} de {npage}</span>
        </div>
        {records.map((d, i) => (
          <Reactivo key={i} d={d}></Reactivo>
        ))}
      </ViewLayout >
    </>
  )
}