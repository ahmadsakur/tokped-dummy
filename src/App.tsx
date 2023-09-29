import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/Layout/Layout";
import Favourite from "@/pages/Favourite";
import Contact from "@/pages/Contact";
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favourite" element={<Favourite />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
