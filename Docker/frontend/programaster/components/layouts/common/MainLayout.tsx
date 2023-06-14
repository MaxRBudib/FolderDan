// components/common/MainLayout.tsx
import React, { PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";



const MainLayout = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () =>{
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header>
        <div className="flex items-center space-x-2 md:flex">
          <div className="cursor-pointer">
            <Link className="headerLink text-lg font-medium" href="/">Inicio</Link>
          </div>
          {/*<ul className="hidden space-x-4 md:flex">
            <li className="headerLink">
              <Link href="/playground/Two Sum">Compiler</Link>
            </li>
          </ul>*/}
        </div>
        <div>
          <ul className="flex items-center space-x-4 text-sm font-light">
            <li className="headerLink text-lg font-medium">
              <Link href="/auth/login">Inicia sesión</Link>
            </li>
            <li className="headerLink text-lg font-medium">
              <Link href="/auth/signup">Regístrate</Link>
            </li>
          </ul>
        </div>
      </header>  
      <AuthProvider> {children} </AuthProvider>
    </>
  );
};
 //NO BORRAR NADA, EL LAYOUT FUNCIONA PERO TENEMOS QUE MODIFICAR LAS PAGINAS
export default MainLayout;