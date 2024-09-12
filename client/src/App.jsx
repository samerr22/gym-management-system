import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/main";
import Bill from "./pages/Bill";
import Cart from "./pages/Cart";
import Inventrylogin from "./pages/Inventrylogin";
import StoreM from "./pages/StoreM";
import Addnewproduct from "./pages/Addnewproduct";
import Update from "./pages/update";
import Details from "./pages/details";





export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Inventrylogin" element={<Inventrylogin />} />

        <Route element={<PrivateRoute />}>
         
          <Route path="/bill" element={<Bill />} /> 
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/store" element={<StoreM />} />
          <Route path="/add" element={<Addnewproduct />} />
          <Route path="/update/:Id" element={<Update />} />
          <Route path="/details/:itemId" element={<Details />} />
         
         
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
