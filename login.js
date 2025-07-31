import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const logar = () => {
    if (email === "admin@limitecash.com" && senha === "123456") {
      localStorage.setItem("logado", "true");
      router.push("/admin");
    } else {
      alert("Credenciais incorretas");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>
      <input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={logar}>Entrar</button>
    </div>
  );
}
