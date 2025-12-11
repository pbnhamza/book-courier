import React from "react";

import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import MyContainer from "../Components/MyContainer/MyContainer";
import Header from "../Components/Header/Header";
import { Toaster } from "react-hot-toast";

const MainLayouts = () => {
  return (
    <MyContainer>
      <Header></Header>
      <div
        className="min-h-[calc(100vh-242px)]"
        style={{
          background:
            "linear-gradient(180deg,rgba(204, 176, 235, 0.3) 0%, rgba(252, 194, 194, 0.3) 49%, rgba(255, 223, 163, 0.33) 98%)",
        }}
      >
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <Toaster />
    </MyContainer>
  );
};

export default MainLayouts;
