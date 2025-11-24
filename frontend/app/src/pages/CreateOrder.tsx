import { useState } from "react";
import api from "../api/ordersApi";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState(0);

  async function handleSubmit(e: any) {
    e.preventDefault();

    await api.post("/orders", {
      cliente,
      produto,
      valor,
      status: "Pendente",
    });

    navigate("/");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Criar Pedido</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white shadow p-6 rounded-lg"
      >
        <div>
          <label className="block mb-1 font-semibold">Cliente</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Produto</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Valor (R$)</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            required
          />
        </div>

        <button
          className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
          type="submit"
        >
          Criar Pedido
        </button>
      </form>
    </div>
  );
}
