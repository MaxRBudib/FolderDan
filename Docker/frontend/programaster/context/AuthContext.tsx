'use client'

import { createContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import axios from 'axios'
import { useEffect} from 'react'

//se crea el los atributos necesarios para authcontext.

interface AuthContextProps {
  isAuthenticated: any;
  user: any;
  authTokens: any;
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logoutUser: () => void;
  children: React.ReactNode;
}

//se crea el authcontexto con sus atributos del inteface de arriba asigano null a todo

const AuthContext = createContext<AuthContextProps | any>(null);

export default AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //se crea las variables para obtener la información correspondiente 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [correa, setCorrea] = useState("")

let checkAuthTokens = null;

if (typeof window !== "undefined") {
  const authTokens = localStorage.getItem("authTokens");

  if (authTokens) {
    try {
      checkAuthTokens = JSON.parse(authTokens);
    } catch (error) {
      console.error("Error parsing authTokens:", error);
    }
  }
}

let checkUser = null;

if (typeof window !== "undefined") {
  const authTokens = localStorage.getItem("authTokens");

  if (authTokens) {
    try {
      checkUser = jwtDecode(authTokens);
    } catch (error) {
      console.error("Error decoding user:", error);
    }
  }
}
  const [authTokens, setAuthTokens] = useState(checkAuthTokens)
  const [user, setUser] = useState(checkUser)
  



  const router = useRouter();


  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valor = e.currentTarget.email.value.toString()
    const response = await fetch('http://127.0.0.1:8000/my_view/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'email': e.currentTarget.email.value, 'password': e.currentTarget.password.value }),

    });
    const data = await response.json();
    if (response.status === 200) {
      console.log(valor)
      setAuthTokens(data);
      setUser(data.access);
      localStorage.setItem('authTokens', JSON.stringify(data));
      setIsAuthenticated(true);
      axios.get('http://127.0.0.1:8000/my_view/usuarios/', {
        params: {
          email: valor
        }
      }).then(response => {
//        const rolon = response
        console.log(response.data[0].matricula_nomina)
        axios.get('http://127.0.0.1:8000/my_view/usuarioGrupo/', {
          params: {
            matricula_nomina : response.data[0].matricula_nomina
          }
        }).then((respuesta) => {
          const hello = respuesta.data.length
          if (response.data[0].rol == "Alumno"){
            if (hello == 0){
              router.push('/userview/Addgroupview')
            } else {
              router.push('/userview/Inicioview')
            }
          }else if (response.data[0].rol == "Profesor") {
            router.push('/userview/Profesorview')
      }

        })

      // else router.push('/userview/Addgroupview');
 
      })
    } else {
      alert('Something went wrong!');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authTokens');
    router.push('/');
  };

  const contextData: AuthContextProps = {
    isAuthenticated,
    user,
    authTokens,
    loginUser,
    logoutUser,
    children,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}
