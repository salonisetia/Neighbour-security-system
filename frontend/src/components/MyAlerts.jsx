import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle2, Info, XCircle, Lock } from 'lucide-react';
import Sidebar from './Sidebar';

const MyAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Use "userToken" to match your Navbar.jsx implementation
    const token = localStorage.getItem('userToken'); 

    useEffect(() => {
        const fetchAlerts = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get('http://localhost:5000/api/my-alerts', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAlerts(res.data);
            } catch (err) {
                console.error("Error fetching alerts", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAlerts();
    }, [token]);

    const alertStyles = {
        info: { container: 'bg-blue-50 border-blue-200 text-blue-800', icon: <Info className="w-5 h-5 text-blue-500" /> },
        success: { container: 'bg-green-50 border-green-200 text-green-800', icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
        warning: { container: 'bg-amber-50 border-amber-200 text-amber-800', icon: <AlertCircle className="w-5 h-5 text-amber-500" /> },
        error: { container: 'bg-red-50 border-red-200 text-red-800', icon: <XCircle className="w-5 h-5 text-red-500" /> },
    };

    if (!token) {
        return (
            <div className="flex min-h-screen bg-slate-50 pt-16">
              <div className="flex flex-col items-center justify-center flex-1 text-gray-400 p-10">
                <Lock className="w-10 h-10 mb-2" />
                <p className="text-lg">Please login to view your alerts.</p>
                <Link to="/login" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">
                  Go to Login
                </Link>
              </div>
            </div>
        );
    }

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 pt-16">
          <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-6">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-slate-900">My Posted Alerts</h1>
                <div className="space-y-4">
                    {alerts.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl">
                            <p className="text-gray-400">You haven't posted any alerts yet.</p>
                        </div>
                    ) : (
                        alerts.map(alert => (
                            <div 
                                key={alert._id} 
                                className={`flex items-start p-4 border rounded-lg shadow-sm ${alertStyles[alert.type]?.container || 'bg-gray-50'}`}
                            >
                                <div className="mr-3 mt-0.5">
                                    {alertStyles[alert.type]?.icon || <Info className="w-5 h-5" />}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-sm uppercase tracking-tight">{alert.title || alert.type}</h3>
                                    <p className="text-slate-700 my-1">{alert.message || alert.description}</p>
                                    <span className="text-[10px] text-gray-400 font-medium">
                                        {new Date(alert.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
              </div>
            </main>
          </div>
        </div>
    );
};

export default MyAlerts;
