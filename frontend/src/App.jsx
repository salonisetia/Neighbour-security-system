import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login"; 
import QuickSetup from "./components/QuickSetup";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Help from "./components/Help";
import MyAlerts from "./components/MyAlerts";
import MyAlertsSidebar from "./components/MyAlertsSidebar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/> 
        <Route path="/quick-setup" element={<QuickSetup />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myalerts" element={<MyAlerts />} />
      </Routes>
      <div className="h-24 md:h-32"></div> {/* Spacer */}
      <footer className="fixed bottom-0 w-full bg-slate-900 text-slate-300 py-8 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tight">SafeNeighbor</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Security Project. Stay Informed, Stay Safe.
          </p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;

