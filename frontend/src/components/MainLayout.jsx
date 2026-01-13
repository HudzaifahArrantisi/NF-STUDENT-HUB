// src/components/MainLayout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";

const MainLayout = ({ children }) => {
  const { user } = useAuth();
  const role = user?.role;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white font-instagram">
      {/* SIDEBAR - Desktop Only */}
      <div className="hidden lg:block">
        <Sidebar
          role={role}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col w-full">
        {/* NAVBAR */}
        <Navbar onMenuToggle={() => setIsSidebarOpen(true)} />

        {/* SIDEBAR - Mobile Overlay */}
        <div className="lg:hidden">
          <Sidebar
            role={role}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 bg-white animate-fadeIn">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;