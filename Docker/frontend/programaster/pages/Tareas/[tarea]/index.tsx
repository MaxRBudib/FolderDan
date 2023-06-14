import Head from 'next/head';
import React from 'react';
import Timer from '@/components/Utilities/Timer';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import ViewLayout from '@/components/layouts/common/ViewLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { useRouter } from 'next/router';

const extensions = [python()];

interface FormData {
  id: number,
  status: string,
  matricula_nomina: string,
  ejercicio_id: number,
  tarea_id: number
}

export default function Home() {

  const baseTareaURL = "http://127.0.0.1:8000/my_view/tarea/";
  const baseEjTarURL = "http://127.0.0.1:8000/my_view/ejercicioTarea/";
  const baseEjURL = "http://127.0.0.1:8000/my_view/ejercicios/";
  const baseOpcionesURL = "http://127.0.0.1:8000/my_view/opciones/";
  const baseTestCasesURL = "http://127.0.0.1:8000/my_view/testCases/";

  const router = useRouter()
  const [tareaID, setTareaID] = useState('')
  const [code, setCode] = useState('print()')
  const [ruCode, setRunCode] = useState('')
  const [data, setData] = useState('')
  const [name, setName] = useState('')
  const [passed, setPassed] = useState('')
  const [failed, setFailed] = useState('')
  const [result, setResult] = useState('')
  const [submit, setSubmit] = useState(false)
  const { formState: { errors }, handleSubmit} = useForm<FormData>()



  useEffect(() => {
    if (router.isReady) {
      setTareaID(router.query.tarea as string)
    }
  }, [router.isReady]);

  let answ = ''
  const [tarea, setTarea] = useState([])
  const [ejTar, setEjTar] = useState([])
  const [ejercicio, setEjercicio] = useState([])
  const [opciones, setOpciones] = useState([])
  const [testCases, setTestCases] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const time = new Date();
  const [selected, setSelected] = useState('')
  time.setSeconds(time.getSeconds() + 600);

  useEffect(() => {
    axios.get(baseTareaURL, {
      params: {
        nombre_tarea: tareaID
      }
    }).then((response) => {
      setTarea(response.data.filter(obj => obj.tarea_id == tareaID))
      //console.log(tarea)
    })
  }, []);

  useEffect(() => {
    try {
      axios.get(baseEjTarURL)
        .then((response) => {
          let dataEjTar = response.data
          dataEjTar = dataEjTar.filter(obj => obj.tarea_id == tareaID)
          setEjTar(dataEjTar);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } catch {
      console.log("Error getting Ejercicio");
    }
  }, [tareaID]);

  const lastIndex = currentPage;
  const firstIndex = lastIndex - 1;
  const records = ejTar.slice(firstIndex, lastIndex);
  const npage = ejTar.length;
  const numbers = [...Array(npage + 1).keys()].slice(1);

  let selectedValue: any
  const [selectedRadios, setSelectedRadios] = useState(Array(30).fill(0))

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value)
    selectedValue = event.target.value;
    selectedRadios.map((c, i) => {
      if (i === currentPage - 1) {
        selectedRadios[currentPage - 1] = selectedValue;
      } else {
        // The rest haven't changed
      }
    })
    console.log(selectedRadios[currentPage])
  };

  useEffect(() => {
    try {
      axios.get(baseEjURL).then((response) => {
        setEjercicio(response.data)
      })
    } catch {
      console.log("zero")
    }
  }, [])

  useEffect(() => {
    axios.get(baseOpcionesURL).then((response) => {
      setOpciones(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get(baseTestCasesURL).then((response) => {
      setTestCases(response.data)
    })
  }, [])

  useEffect(()=> {
    setCode(answ)
  }, [answ])

  const runCode = () => {
    console.log(answ)
    {testCases.map((d_t: any, i: any) => ( 
      d_t.input,
      d_t.output
    ))}
  }

  const submitCode = () => {
    setSubmit(true)
    axios.post('http://127.0.0.1:8000/my_view/code/', {code, submit}).then(({data}) => {
        setResult(data['output'])

    })
    
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

  const onSubmit = handleSubmit((values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    const intento = {
      "id": values.id,
      "status": values.status,
      "matricula_nomina": values.matricula_nomina,
      "ejercicio_id": values.ejercicio_id,
      "tarea_id": values.tarea_id
    }

    //console.log(intento)

    axios.post('http://127.0.0.1:8000/my_view/tarea/', intento, config).then((response) => {

      alert("Form submited!");
      //console.log(response.data)
    })
  })

  function ReactivoWrapper({ id }: any) {
    return (
      ejercicio.map((d: any, i: any) => (
        <>
          {id === d.ejercicio_id ? (
            <Reactivo d={d}></Reactivo>
          ) : (
            <div key={i}></div>
          )}
        </>
      ))
    )
  }

  function Reactivo({ d }: any) {
    if (d.tipo == "Opcion Multiple") {
      return (
        <div className='min-h-[79%] flex flex-col items-center justify-center p-8'>
          <form className='w-3/5'>
            <div className='flex flex-col'>
              <fieldset>
                <div className="rounded-lg shadow-md bg-gray-800 p-8 flex flex-col justify-between">
                  <div className="border-b border-slate-200 pb-4 font-semibold text-lg text-gray-200">{d.descripcion}</div>
                  {opciones.map((d_op: any, i: any) => (
                    <>
                      {d_op.ejercicio_id === d.ejercicio_id ? (
                        <div className="form-control" key={i}>
                          <label className="label pt-4 justify-start cursor-pointer">
                            <input onChange={handleRadioChange} checked={selectedRadios[currentPage - 1] === d_op.texto} type="radio" name="status" id={i.toString()} value={d_op.texto} className="peer/option1 radio radio-sm radio-info border-slate-300 mr-3" />
                            <span className="peer-checked/option1:text-cyan-600 font-medium text-base label-text">{d_op.texto}</span>
                          </label>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </>
                  ))}
                </div>
              </fieldset>
              <button className='place-self-end rounded-md p-2 mt-8 font-bold bg-gray-700 hover:bg-gray-600'>Submit</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className='h-[79%] flex items-start justify-center p-4'>
          <div className='flex flex-col bg-gray-800 block rounded-lg shadow-md h-full w-2/5 mr-3'>
            <div className='flex flex-col h-full w-full overflow-y-auto'>
              <div className='flex flex-col items-center'>
                <div className="flex flex-col w-full h-full p-6">
                  <div className='flex flex-row justify-start items-center'>
                    <span className="font-mono font-semibold text-lg text-gray-200">{d.titulo}</span>
                    <span className="badge badge-primary font-medium text-sm text-gray-100 ml-6 mr-2">{d.dificultad}</span>
                  </div>
                  <span className='font-base font-mono text-sm leading-tight text-gray-100 pt-3'>{d.descripcion}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-col h-full w-full'>
            <CodeMirror className='flex-grow h-[52%] bg-gray-800 rounded-lg overflow-auto'
              value={answ}
              extensions={extensions}
              theme={'dark'}
              indentWithTab={true}
              onChange={(editor, value) => {
                answ = editor
              }}
            />
            <div></div>
            <div className='flex space-x-3 pt-3 justify-between w-full h-[38%] font-mono'>
              <div className='w-1/3 h-full bg-gray-800 rounded-lg overflow-auto'>
                <div className='flex items-center w-full h-[10%] bg-gray-700 rounded-t-lg'>
                  <span className='text-sm pl-3 font-semibold truncate'>Casos de prueba</span>
                </div>
                {result}
              </div>
              <div className='w-2/3 h-full bg-gray-800 rounded-lg overflow-auto'>
                <div className='flex items-center w-full h-[10%] bg-gray-700 rounded-t-lg'>
                  <span className='text-sm pl-3 font-semibold truncate'>Output</span>
                </div>
              </div>
            </div>
            <div className='flex h-[8%] w-full justify-end items-center font-mono font-normal pt-2 space-x-2 '>
              <button className="btn btn-neutral text-slate-200 bg-violet-700 btn-sm" onClick={runCode}>Run</button>
              <button className="btn btn-neutral text-slate-200 hover:bg-gray-800 bg-gray-700 btn-sm" onClick={submitCode}>Submit</button>
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
        <div id='choice' className='bg-gradient-to-r from-blue-950 via-slate-800 to-slate-950 flex flex-col justify-center font-sans w-full min-h-[12%] border-b-2 border-slate-400'>
          <div className='flex justify-between p-4 px-6'>
            {tarea.map((d: any, i: any) => (
              <span className='self-center text-3xl font-semibold text-slate-100'>{d.nombre_tarea}</span>
            ))}
            <div className='flex flex-col gap-y-2'>
              <span className='text-base font-semibold text-slate-100'>Tiempo Restante: {<Timer expiryTimestamp={time}></Timer>}</span>
              <span className='text-sm font-medium text-slate-100'>Tarea cierra: 29 de Mayo 11:59 pm</span>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-blue-950 via-slate-800 to-slate-950 flex flex-row justify-between items-center min-h-[9%] py-2 border-b-2 border-slate-400'>
          <div className='flex flex-row gap-2 items-center justify-center pl-4'>
            <button onClick={prevPage} className='w-fit rounded-md p-3 font-bold bg-gray-700 hover:bg-gray-600'>
              <FontAwesomeIcon className='text-slate-200 h-4' icon={solid("angle-left")} />
            </button>
            {numbers.map((n, i) => (
              <div key={i} className={`${currentPage === n ? 'active' : ''}flex gap-2`}>
                <button onClick={() => changeCPage(n)} className={`${currentPage === n ? 'bg-gray-600' : 'bg-gray-700'} w-fit rounded-md py-2 px-4 font-bold hover:bg-gray-600 text-slate-200`}>{n}</button>
              </div>
            ))}
            <button onClick={nextPage} className='w-fit rounded-md p-3 font-bold bg-gray-700 hover:bg-gray-600'>
              <FontAwesomeIcon className='text-slate-200 h-4' icon={solid("angle-right")} />
            </button>
          </div>
          <span className='px-5 text-base font-semibold dark:text-slate-100'>Pregunta {currentPage} de {npage}</span>
        </div>
        <>
          {records.map((d: any, i: any) => (
            <ReactivoWrapper key={i} id={d.ejercicio_id}></ReactivoWrapper>
          ))}
        </>
      </ViewLayout >
    </>
  )
}