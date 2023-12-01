import { Route, Routes } from "react-router-dom";

import { Sidebar } from "../components/sidebar/Sidebar";
import { Profile } from "../components/profile/Profile";
import { Products } from "../components/admin/Products";
import { CreateProduct } from "../components/admin/CreateProduct";
import { Home } from "../components/home/Home";

export const StoreRoutes = () => {
  return (
    <>
      <div className="row vh-100">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Products />} />
            <Route path="/admin/create" element={<CreateProduct />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
