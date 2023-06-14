import Head from 'next/head';
import ViewLayout from '@/components/layouts/common/ViewLayout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Student View</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewLayout>
        <form>
          <fieldset className="flex items-center justify-center p-10 shadow-md">
            <div className="w-3/5 h-1/2 bg-white rounded-lg shadow-md dark:bg-gray-800 p-8 flex flex-col justify-between">
              <div>
                <div className="border-b border-slate-200 pb-4 font-semibold text-lg text-gray-800 dark:text-gray-200">Which is your favorite animal?</div>
              </div>
              <div className="form-control">
                <label className="label justify-start cursor-pointer">
                  <input type="radio" name="status" id="option1" className="peer/option1 radio radio-sm radio-info border-slate-300 mr-3" />
                  <span className="peer-checked/option1:text-cyan-600 font-medium text-base label-text">Dog</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label justify-start cursor-pointer">
                  <input type="radio" name="status" id="option2" className="peer/option2 radio radio-sm radio-info border-slate-300 mr-3" />
                  <span className="peer-checked/option2:text-cyan-600 font-medium text-base label-text">Cat</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label justify-start cursor-pointer">
                  <input type="radio" name="status" id="option3" className="peer/option3 radio radio-sm checked:bg-blue-500 border-slate-300 mr-3" />
                  <span className="peer-checked/option3:text-cyan-600 font-medium text-base label-text">Ferret</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label justify-start cursor-pointer">
                  <input type="radio" name="status" id="option4" className="peer/option4 radio radio-sm radio-info border-slate-300 mr-3" />
                  <span className="peer-checked/option4:text-cyan-600 font-medium text-base label-text">Spider</span>
                </label>
              </div>
            </div>
          </fieldset>
        </form>
      </ViewLayout>
    </>

  )
}