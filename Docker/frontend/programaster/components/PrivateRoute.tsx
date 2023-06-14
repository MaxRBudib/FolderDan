import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication =  () => {
      const authTokenStr = localStorage.getItem('authTokens')
      if (!authTokenStr) {
        router.replace('/auth/login')
      }
    }; 

    checkAuthentication();
  }, [router]);

  return  <>{children}</> 
};

export default PrivateRoute;

