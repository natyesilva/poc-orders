import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/create" element={<CreateOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
