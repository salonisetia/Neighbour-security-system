import { NavLink } from "react-router-dom";
import { LayoutDashboard, Bell, LifeBuoy } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-100 flex flex-col p-4 space-y-2 fixed h-full">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Menu</p>
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition border ${
            isActive 
              ? "bg-white text-blue-600 shadow-sm border-slate-100" 
              : "text-slate-600 hover:bg-white hover:text-blue-600 border-transparent hover:border-slate-100"
          }`
        }
      >
        <LayoutDashboard size={18} />
        <span className="font-medium">Dashboard</span>
      </NavLink>
      <NavLink 
        to="/myalerts" 
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition border ${
            isActive 
              ? "bg-white text-blue-600 shadow-sm border-slate-100" 
              : "text-slate-600 hover:bg-white hover:text-blue-600 border-transparent hover:border-slate-100"
          }`
        }
      >
        <Bell size={18} />
        <span className="font-medium">My Alerts</span>
      </NavLink>
      <NavLink 
        to="/help" 
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition border ${
            isActive 
              ? "bg-white text-blue-600 shadow-sm border-slate-100" 
              : "text-slate-600 hover:bg-white hover:text-blue-600 border-transparent hover:border-slate-100"
          }`
        }
      >
        <LifeBuoy size={18} />
        <span className="font-medium">Help</span>
      </NavLink>
    </aside>
  );
}
