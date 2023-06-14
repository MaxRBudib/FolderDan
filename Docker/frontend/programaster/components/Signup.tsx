import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import MainLayout from '@/components/layouts/common/MainLayout';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios'
import { useRouter } from 'next/router';

interface FormData {
  matricula_nomina: string;
  rol: string;
  nombre_usuario: string;
  apellido: string;
  email: string;
  password: string;
  conf_contraseña: string;
}

export default function Home() {

  const router = useRouter();

  const { register, formState: { errors }, handleSubmit, getValues } = useForm<FormData>()

  const onSubmit = handleSubmit((values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    const patternStudent = /[aA]\d{8}/
    const patternProfesor = /[lL]\d{8}/

    if (patternStudent.test(values.matricula_nomina)) {
      values.rol = "Alumno"
      const intento = {
        "matricula_nomina":
          values.matricula_nomina
        ,
        "rol":
          values.rol
        ,
        "nombre_usuario":
          values.nombre_usuario
        ,
        "apellido":
          values.apellido
        ,
        "email":
          values.email
        ,
        "password":
          values.password



      }
      axios.post('http://127.0.0.1:8000/my_view/usuarios/',intento, config).then((response) => {
      alert("Form submited!");
      router.push('/auth/login/')
    })
    } else if (patternProfesor.test(values.matricula_nomina)){
      values.rol = "Profesor"
      const intento = {
        "matricula_nomina":
          values.matricula_nomina
        ,
        "rol":
          values.rol
        ,
        "nombre_usuario":
          values.nombre_usuario
        ,
        "apellido":
          values.apellido
        ,
        "email":
          values.email
        ,
        "password":
          values.password


      }
      axios.post('http://127.0.0.1:8000/my_view/usuarios/', intento, config).then((response) => {
        //alert("Form submited!");
        router.push('login/')
      })

    }
  })

  return (
    <>
      <MainLayout>
        <div className='h-full w-full bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-950'>
          <div className="flex h-screen flex-col md:items-center md:justify-center md:bg-transparent w-96 mx-auto">
            <Head>
              <title>Regístrate</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={onSubmit} action="" className='relative space-y-5 min-h-full flex-col justify-center px-6 py-2 lg:px-8'>
              <h2 className="mt-20 text-center text-3xl font-bold tracking-tight text-slate-100">
                Regístrate
              </h2>
              <div className="space-y-2">
                <label className="text-sm font-semibold leading-6 text-slate-100">
                  Matricula o Nómina
                </label>
                <input
                  {...register('matricula_nomina',
                    {
                      required: true,
                      pattern: /[aAlL]\d{8}/,
                    }
                  )}
                  name="matricula_nomina" className="border-2 border-slate-500 bg-gray-900 input h-9 py-2.5" type="text" />
                {errors.matricula_nomina?.type == 'required' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Introduce tu Matícula o Nómina</span>
                    </div>
                  </div>
                }
                {errors.matricula_nomina?.type == 'pattern' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Debe contener una letra A o L seguida de 8 números</span>
                    </div>
                  </div>
                }
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-slate-100">Nombre(s)</label>
                <input {...register('nombre_usuario',
                  {
                    required: true,
                    maxLength: 50,
                    minLength: 2,
                    pattern: /[A-Z][a-z]+( [A-Z][a-z]+)*/
                  }
                )}
                  name="nombre_usuario" className="border-2 border-slate-500 bg-gray-900 input h-9 py-2.5" type="text" />
                {errors.nombre_usuario?.type == 'required' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Introduce tu(s) nombre(s)</span>
                    </div>
                  </div>
                }
                {errors.nombre_usuario?.type == 'maxLength' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">El nombre no puede exceder de 50 caracteres</span>
                    </div>
                  </div>
                }
                {errors.nombre_usuario?.type == 'minLength' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">El nombre no puede ser menor a 2 caracteres</span>
                    </div>
                  </div>
                }
                {errors.nombre_usuario?.type == 'pattern' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Cuide las mayúsculas y minúsculas, y de ser necesario los espacios</span>
                    </div>
                  </div>
                }
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-slate-100">Apellido(s)</label>
                <input {...register('apellido',
                  {
                    required: true,
                    maxLength: 50,
                    minLength: 2,
                    pattern: /[A-Z][a-z]+( [A-Z][a-z]+)*/
                  }
                )}
                  name="apellido" className="border-2 border-slate-500 bg-gray-900 input h-9 py-2.5" type="text" />
                {errors.apellido?.type == 'required' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Introduce tu(s) apellido(s)</span>
                    </div>
                  </div>
                }
                {errors.apellido?.type == 'maxLength' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">El apellido no puede exceder de 50 caracteres</span>
                    </div>
                  </div>
                }
                {errors.apellido?.type == 'minLength' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">El apellido no puede ser menor a 2 caracteres</span>
                    </div>
                  </div>
                }
                {errors.apellido?.type == 'pattern' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Cuide las mayúsculas y minúsculas, y de ser necesario los espacios</span>
                    </div>
                  </div>
                }
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-100">Correo Institucional</label>
                <input {...register('email',
                  {
                    required: true,
                    pattern: /([aAlL]\d{8}|[a-z]{8,15})@(itesm|tec)\.mx/
                  }
                )}
                  name="email" className="border-2 border-slate-500 bg-gray-900 input h-9 py-2.5" type="email" />
                {errors.email?.type == 'required' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Por favor inserte su corre institucional</span>
                    </div>
                  </div>
                }
                {errors.email?.type == 'pattern' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Revise el formato de su email</span>
                    </div>
                  </div>
                }
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-slate-100">Contraseña</label>
                <input {...register('password',
                  {
                    required: true,
                    pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&^+=-])[^\s]{8,20}/
                  }
                )}
                  name="password" className="border-2 border-slate-500 bg-gray-900 input h-9 py-2.5" type="password" />
                {errors.password?.type == 'required' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Inserte su contraseña</span>
                    </div>
                  </div>
                }
                {errors.password?.type == 'pattern' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Debe incluir una mayúscula, una minúscula, un número, un caracter especial y sin espacios</span>
                    </div>
                  </div>
                }
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-slate-100">Confirmar contraseña</label>
                <input {...register('conf_contraseña',
                  {
                    required: true,
                    validate: (value) => value === getValues('password')
                  }
                )}
                  name="conf_contraseña" className="border-2 border-slate-500 bg-gray-900 input h-9 py-2.5" type="password" />
                {errors.conf_contraseña?.type == 'required' &&
                  <div className="flex text-sm text-red-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Vuelva a introducir su contraseña</span>
                    </div>
                  </div>
                }
              </div>
              <div className="py-1">
                <button type="submit" className="text-slate-100 w-full rounded bg-[#003399] py-2.5 font-semibold">
                  Registrarme
                </button>
                <div className="my-0.5 text-gray-400">
                  ¿Ya tienes cuenta?{' '}
                  <button type="submit" className="text-white hover:underline">
                    <Link href="/auth/login">Inicia Sesión</Link>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  )
}