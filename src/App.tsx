import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "src/pages/Home";
import Layout from "src/components/Layout/Layout";
import Favourite from "src/pages/Favourite";
import Contact from "src/pages/Contact";
import CreateContact from "src/pages/CreateContact";
import EditContact from "src/pages/EditContact";
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
