import { useEffect, useState } from "react";
import api from "../api/ordersApi";

interface Order {
  id: number;
  cliente: string;
  produto: string;
  valor: number;
  status: string;
  dataCriacao: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pedidos</h2>

      <table className="table-auto w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Cliente</th>
            <th className="px-4 py-2 text-left">Produto</th>
            <th className="px-4 py-2 text-left">Valor</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Data</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr
              key={o.id}
              className="border-b hover:bg-gray-100 cursor-pointer"
            >
              <td className="px-4 py-2">{o.id}</td>
              <td className="px-4 py-2">{o.cliente}</td>
              <td className="px-4 py-2">{o.produto}</td>
              <td className="px-4 py-2">R$ {o.valor.toFixed(2)}</td>
              <td className="px-4 py-2">{o.status}</td>
              <td className="px-4 py-2">
                {new Date(o.dataCriacao).toLocaleString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
