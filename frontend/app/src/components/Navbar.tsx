import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 px-4 py-3 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Gestão de Pedidos</h1>

      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Pedidos</Link>
        <Link to="/create" className="hover:underline">Criar Pedido</Link>
      </div>
    </nav>
  );
}
