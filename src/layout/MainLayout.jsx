import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../stores/useStore";
import { HiMenu, HiX, HiLogout } from "react-icons/hi";

export default function MainLayout({ children }) {
  const auth = useStore((s) => s.auth);
  const logout = useStore((s) => s.logout);
  const seedBots = useStore((s) => s.seedBots);
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (useStore.getState().bots.length === 0) seedBots(10);
  }, [seedBots]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/bots", label: "Bot Status" },
    { to: "/allocate", label: "Allocate Task" },
    { to: "/queue", label: "Task Queue" },
    { to: "/analytics", label: "Analytics" },
    { to: "/map", label: "Map" },
  ];

  return (
    <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden">
      {/* MOBILE OVERLAY BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-black text-white flex flex-col py-6 px-5 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white hover:text-red-400"
        >
          <HiX size={24} />
        </button>

        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="text-2xl font-extrabold tracking-wide">Delhivery</div>
          <div className="text-xs text-gray-400 mt-1">Warehouse Dashboard</div>
        </div>

        {/* User Info */}
        {auth.loggedIn && (
          <div className="mb-6 pb-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                {auth.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {auth.username}
                </div>
                <div className="text-xs text-gray-400">{auth.user?.email}</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                location.pathname === link.to
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-800">
          {auth.loggedIn && (
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            >
              <HiLogout size={18} />
              Logout
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden">
        {/* TOP NAVBAR (mobile only) */}
        <header className="w-full bg-white shadow-sm px-4 py-3 flex items-center justify-between lg:hidden sticky top-0 z-30">
          <button
            onClick={() => setOpen(true)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiMenu size={26} className="text-gray-700" />
          </button>

          <h1 className="text-lg font-semibold text-gray-800">
            {navLinks.find((link) => link.to === location.pathname)?.label ||
              "Dashboard"}
          </h1>

          {/* User Avatar - Mobile */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {auth.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <button
              onClick={handleLogout}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <HiLogout size={20} className="text-gray-700" />
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="w-full max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}