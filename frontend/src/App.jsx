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
      <div className="min-h-screen bg-transparent text-slate-100 antialiased">
        <div className="relative z-10">
          <Navbar />
          <main className="relative z-10 pb-28 md:pb-32">
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
          </main>
        </div>

        <footer className="fixed bottom-0 z-20 w-full border-t border-slate-700/70 bg-slate-950/75 text-slate-300 py-6 px-6 shadow-[0_-12px_35px_rgba(2,6,23,0.7)] backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white tracking-tight">SafeNeighbor</span>
            </div>
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Security Project. Stay Informed, Stay Safe.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

