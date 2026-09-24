import { NavLink } from "react-router-dom";
import { LayoutDashboard, Bell, LifeBuoy } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-4 space-y-2 fixed h-full">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Menu</p>
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition border ${
            isActive 
              ? "bg-slate-800 text-blue-400 shadow-sm border-slate-700" 
              : "text-slate-300 hover:bg-slate-800 hover:text-blue-400 border-transparent hover:border-slate-700"
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
              ? "bg-slate-800 text-blue-400 shadow-sm border-slate-700" 
              : "text-slate-300 hover:bg-slate-800 hover:text-blue-400 border-transparent hover:border-slate-700"
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
              ? "bg-slate-800 text-blue-400 shadow-sm border-slate-700" 
              : "text-slate-300 hover:bg-slate-800 hover:text-blue-400 border-transparent hover:border-slate-700"
          }`
        }
      >
        <LifeBuoy size={18} />
        <span className="font-medium">Help</span>
      </NavLink>
    </aside>
  );
}
