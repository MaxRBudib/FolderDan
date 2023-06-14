import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import backtierra from '@/public/blob-scene-haikei.png'


import MainLayout from '@/components/layouts/common/MainLayout';
import LayoutProf from '@/components/layouts/common/LayoutProf';


export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

<LayoutProf>

<body className="flex ml-12 h-full">

	<div className="flex flex-col w-full max-w-screen-md">
        <div className="flex items-center h-20 px-4 border-b border-gray-500">
            <div className="w-40"></div>
            <div className="flex-grow text-lg font-semibold text-center">Small</div>
            <div className="flex-grow text-lg font-semibold text-center">Medium</div>
            <div className="flex-grow text-lg font-semibold text-center">Large</div>
        </div>
        <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
            <div className="font-medium">Feature Group</div>
        </div>
        <div className="flex items-center h-12 px-4 border-b border-gray-500">
            <div className="w-40">Feature 1</div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="flex items-center h-12 px-4 border-b border-gray-500">
            <div className="w-40">Feature 2</div>
            <div className="flex-grow w-0"></div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="flex items-center h-12 px-4 border-b border-gray-500">
            <div className="w-40">Feature 3</div>
            <div className="flex-grow w-0"></div>
            <div className="flex-grow w-0"></div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
            <div className="font-medium">Feature Group</div>
        </div>
        <div className="flex items-center h-12 px-4 border-b border-gray-500">
            <div className="w-40">Feature 1</div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="flex items-center h-12 px-4 border-b border-gray-500">
            <div className="w-40">Feature 2</div>
            <div className="flex-grow w-0"></div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="flex items-center h-12 px-4 border-b border-gray-500">
            <div className="w-40">Feature 3</div>
            <div className="flex-grow w-0"></div>
            <div className="flex-grow w-0"></div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
            <div className="font-medium">Feature Group</div>
        </div>
        <div className="flex items-center h-12 px-4 border-b border-gray-500">
            <div className="w-40">Feature 1</div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="flex items-center h-12 px-4 border-b border-gray-500">
            <div className="w-40">Feature 2</div>
            <div className="flex-grow w-0"></div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="flex items-center h-12 px-4 border-b border-gray-500">
            <div className="w-40">Feature 3</div>
            <div className="flex-grow w-0"></div>
            <div className="flex-grow w-0"></div>
            <div className="flex justify-center flex-grow w-0">
                <svg className="w-4 h-4 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="flex items-center h-20 px-4">
            <div className="w-40"></div>
            <div className="flex items-center flex-grow w-0 px-8">
                <button className="flex items-center justify-center w-full h-8 text-sm text-white bg-black">Start
                    Now</button>
            </div>
            <div className="flex items-center flex-grow w-0 px-8">
                <button className="flex items-center justify-center w-full h-8 text-sm text-white bg-black">Start
                    Now</button>
            </div>
            <div className="flex items-center flex-grow w-0 px-8">
                <button className="flex items-center justify-center w-full h-8 text-sm text-white bg-black">Start
                    Now</button>
            </div>
        </div>
    </div>
</body>

</LayoutProf>

    </>
    
  )
}