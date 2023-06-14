import { AppProps } from 'next/app';
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'


const extensions = [python()];

function App() {
    const [code, setCode] = useState('print()')
    const [data, setData] = useState('')
    const [name, setName] = useState('')
    const [passed, setPassed] = useState('')
    const [failed, setFailed] = useState('')
    const [result, setResult] = useState('')
    const [submit, setSubmit] = useState(false)
    const router = useRouter()

    useEffect(()=> {
        if(router.isReady){
            axios.get('http://127.0.0.1:8000/my_view/ejercicios/', {
                params: {
                    nombre_ejercicio: router.query.problem as string
                }
            }).then(response => {
                try {
                setName(response.data[0].titulo)
                setData(response.data[0].descripcion)
                } catch {
                    
                }
            })
        }
    }, [router.isReady])

    const runCode = () => {
        setSubmit(false)
        axios.post('http://127.0.0.1:8000/my_view/code/', {code, submit}).then(({data}) => {
            console.log(data)
            if (data['passed'].length == 0){
                setPassed('0')
            } else {
                setPassed(data['passed'][0])
            }
            if (data['failed'].length === 0){
                setFailed('0')
            } else {
                setFailed(data['failed'][0])
            }
        })
        
    }
    const submitCode = () => {
        setSubmit(true)
        axios.post('http://127.0.0.1:8000/my_view/code/', {code, submit}).then(({data}) => {
            setResult(data['output'])

        })
        
    }
    useEffect(() => {
        setResult('Passed: ' + passed + '\n' + 'Failed: ' + failed);
    }, [passed, failed]);

         return (
        <>
            <div className="pt-10 pb-5 flex">
                <h1 className="font-bold text-left text-4xl  w-6/12 pl-5">{name}</h1>
                <div className =" w-6/12 flex mx-5 justify-end">
                    <button className="rounded bg-[#333] text-colorml-6 p-5 py-2.5 font-semibold" onClick={runCode}>
                        Run
                    </button>
                    <button className="rounded bg-[#003399] ml-6 p-5 py-2.5 font-semibold" onClick={submitCode}>
                        Submit
                    </button>
                </div>
            </div>
            <div className="flex text-left">
                <div className="w-6/12 pl-5">
                <a>
                    {data}
                </a>
                <div className="relative overflow-x-auto pt-5">
                    <table className="w-6/12 text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-2">
                                    EXAMPLE
                                 </th>
                             </tr>
                        </thead>
                 <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Input: nums = [2,7,11,15], target = 9
                        </th>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Output: [0,1]
                        </th>
                    </tr>
                 </tbody>
    </table>
</div>


                </div>
                <div className="w-6/12">
                    <CodeMirror
                      value={code}
                      height="200px"
                      width='auto'
                      extensions={extensions}
                      theme={'dark'}
                      indentWithTab={true}
                      onChange={(value, viewUpdate)=> {
                          setCode(value)
                      }}
                    />
                    <div className=" pt-3">
                    <h1 className="font-bold text-left text-xl">Output</h1>
                        <div id="message" className="block h-40 p-1 m-0 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-y-scroll" placeholder="You can see your output here">
                            <pre>{result}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
         )
    

}
export default App;