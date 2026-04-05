import { Link } from "react-router-dom";
import { LayoutDashboard, Bell, LifeBuoy } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-100 flex flex-col p-4 space-y-2 fixed h-full">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Menu</p>
      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-white hover:text-blue-600 rounded-xl transition border border-transparent hover:border-slate-100">
        <LayoutDashboard size={18} />
        <span className="font-medium">Dashboard</span>
      </Link>
      <Link to="/myalerts" className="flex items-center gap-3 px-4 py-3 bg-white text-blue-600 rounded-xl shadow-sm border border-slate-100 transition">
        <Bell size={18} />
        <span className="font-medium">My Alerts</span>
      </Link>
      <Link to="/help" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-white hover:text-blue-600 rounded-xl transition border border-transparent hover:border-slate-100">
        <LifeBuoy size={18} />
        <span className="font-medium">Help</span>
      </Link>
    </aside>
  );
}
