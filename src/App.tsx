import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/Layout/Layout";
import Favourite from "@/pages/Favourite";
import Contact from "@/pages/Contact";
import CreateContact from "@/pages/CreateContact";
import EditContact from "@/pages/EditContact";
import { ContactProvider } from "./context/contactContext";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <Layout>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/create" element={<CreateContact />} />
            <Route path="/contact/edit/:id" element={<EditContact />} />
            <Route path="/favourite" element={<Favourite />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ContactProvider>
  );
}
