import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const logado = localStorage.getItem("logado");
    if (logado !== "true") {
      router.push("/login");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("logado");
    router.push("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Painel Admin</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
