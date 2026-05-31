import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle, CheckCircle2, Info, XCircle, Lock, MapPin, Clock } from 'lucide-react';
import Sidebar from './Sidebar';

const MyAlerts = () => {
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('userToken'); 

    useEffect(() => {
    const fetchAlerts = async () => {
      if (!token) {
        setLoading(false);
        navigate('/login');
        return;
      }
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/get_my_alerts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlerts(res.data || []);
      } catch (err) {
        console.error("Error fetching alerts", err);
        if (err.response?.status === 401) {
          localStorage.removeItem('userToken');
          alert('Session expired or invalid token. Please log in again.');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, [token, navigate]);

    const alertStyles = {
        Accident: { container: 'bg-amber-50 border-amber-200 text-amber-800', icon: <AlertCircle className="w-5 h-5 text-amber-500" /> },
        Theft: { container: 'bg-red-50 border-red-200 text-red-800', icon: <XCircle className="w-5 h-5 text-red-500" /> },
        Fire: { container: 'bg-orange-50 border-orange-200 text-orange-800', icon: <AlertCircle className="w-5 h-5 text-orange-500" /> },
        Medical: { container: 'bg-green-50 border-green-200 text-green-800', icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
        'Suspicious Activity': { container: 'bg-blue-50 border-blue-200 text-blue-800', icon: <Info className="w-5 h-5 text-blue-500" /> },
        default: { container: 'bg-slate-50 border-slate-200 text-slate-700', icon: <Info className="w-5 h-5 text-slate-500" /> },
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
                        alerts.map(alert => {
                            const style = alertStyles[alert.category] || alertStyles.default;
                            return (
                                <div 
                                    key={alert._id} 
                                    className={`flex flex-col gap-3 p-4 border rounded-lg shadow-sm ${style.container}`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="mr-2 mt-0.5">{style.icon}</div>
                                            <h3 className="font-bold text-sm uppercase tracking-tight">
                                                {alert.title || alert.category || 'My Alert'}
                                            </h3>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                            {alert.category || 'General'}
                                        </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">
                                        {alert.description || alert.message || 'No description provided.'}
                                    </p>
                                    <div className="flex flex-wrap gap-3 text-[12px] text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {alert.location?.address || 'Location not specified'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {new Date(alert.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
              </div>
            </main>
          </div>
        </div>
    );
};

export default MyAlerts;
