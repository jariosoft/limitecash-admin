import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState(0);
  const [dados, setDados] = useState([
    { nome: "Carlos Silva", valor: 1200, status: "pendente", data: "30/07/2025" },
    { nome: "Maria Souza", valor: 800, status: "pago", data: "29/07/2025" },
    { nome: "João Costa", valor: 1500, status: "cancelado", data: "28/07/2025" },
  ]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const logado = localStorage.getItem("logado");
    if (logado !== "true") router.push("/login");
  }, [router]);

  const logout = () => {
    localStorage.removeItem("logado");
    router.push("/login");
  };

  const exportar = () => {
    const csv = ["Nome,Valor,Status,Data"];
    dadosFiltrados.forEach((d) => {
      csv.push(`${d.nome},${d.valor},${d.status},${d.data}`);
    });
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const alterarStatus = (index, novo) => {
    const confirmar = confirm("Confirmar mudança de status?");
    if (!confirmar) return;
    const novoDados = [...dados];
    novoDados[index].status = novo;
    setDados(novoDados);
  };

  const dadosFiltrados = dados.filter(
    (d) => filtro === "todos" || d.status === filtro
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Painel Admin</h1>
      <button onClick={logout}>Sair</button>

      <div>
        <label>Filtro:</label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="pago">Pago</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <button onClick={exportar}>Exportar CSV</button>
      </div>

      <ul>
        {dadosFiltrados.map((item, idx) => (
          <li key={idx}>
            {item.nome} - R$ {item.valor} - {item.status} - {item.data}
            {item.status === "pendente" && (
              <>
                <button onClick={() => alterarStatus(idx, "pago")}>Aprovar</button>
                <button onClick={() => alterarStatus(idx, "cancelado")}>Cancelar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
