// components/PrivateRoute.jsx
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redireciona para a página de login se o usuário não estiver autenticado
      router.push("/");
    }
  }, [user, router]);

  // Enquanto o estado de autenticação está sendo verificado, você pode mostrar um carregamento
  if (!user) {
    return <div>Loading...</div>;
  }

  return children;
};

export default PrivateRoute;
