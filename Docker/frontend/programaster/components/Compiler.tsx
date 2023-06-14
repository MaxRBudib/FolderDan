import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import backtierra from '@/public/blob-scene-haikei.png'
import MainLayout from '@/components/layouts/common/MainLayout';

interface CompilerResponse {
  output: string;
}

export default function CompilerForm() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, language })
    });
    const data: CompilerResponse = await response.json();
    setOutput(data.output);
  };

  return (
    <>
    <MainLayout></MainLayout>
      <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Student View</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image 
        src={backtierra}
        alt="background"
        fill
        className="-z-10 !hidden opacity-60 sm:!inline"
      
      />
    <form onSubmit={handleSubmit}>
      
      <div className="flex space-x-2.5">
        <input className="password py-2.5" type="text" placeholder="Write your code here" value={code} onChange={(e) => setCode(e.target.value)} />
        <pre>{output}</pre>
      </div>
      <br />
      <label>
        Language:
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="c">C</option>
        </select>
      </label>
      <br />
      <button className="my-0.5 w-full rounded bg-[#003399] py-2.5 font-semibold">Compile</button>
      <br />
      <label>
        Output:
        <pre>{output}</pre>
      </label>
    </form>
    </div>
    </>
  );
}