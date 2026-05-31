import { useState } from "react";

// ✅ Destructure onAlertAdded from props
export default function PostAlertModal({ isOpen, onClose, onAlertAdded }) {
    const [alertData, setAlertData] = useState({
        category: "Accident",
        title: "",
        description: "",
        location: "",
        photo: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ["Accident", "Theft", "Fire", "Medical", "Suspicious Activity"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Transform location string to match schema: {address: string}
        const payload = {
            ...alertData,
            location: { address: alertData.location }  // Fix: nest location
        };
        delete payload.photo;  // Remove unused photo field

        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                alert("You must be logged in to post an alert.");
                setIsSubmitting(false);
                return;
            }

            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/post_alert`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (response.ok) {
                alert("Alert Posted Successfully!");
                if (onAlertAdded) {
                    await onAlertAdded();
                }
                window.dispatchEvent(new CustomEvent('alertPosted'));
                onClose();
            } else {
                console.error('Alert post failed:', response.status, result);
                if (response.status === 401) {
                    localStorage.removeItem('userToken');
                    alert('Session expired or invalid token. Please log in again.');
                    window.location.href = '/login';
                    return;
                }
                alert(`Error: ${result.error || result.message || 'Failed to post alert'}`);
            }
        } catch (error) {
            console.error("Error posting alert:", error);
            alert("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800">Report New Incident</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                        <select 
                            className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
                            value={alertData.category}
                            onChange={(e) => setAlertData({...alertData, category: e.target.value})}
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Incident Title</label>
                        <input 
                            type="text"
                            required
                            placeholder="Brief title (e.g., Smoke near main gate)"
                            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setAlertData({...alertData, title: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                        <textarea 
                            required
                            rows="3"
                            placeholder="Provide details about the incident..."
                            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setAlertData({...alertData, description: e.target.value})}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                        <input 
                            type="text"
                            required
                            placeholder="Street name or landmark"
                            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setAlertData({...alertData, location: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Photo (Optional)</label>
                        <input 
                            type="file"
                            accept="image/*"
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={(e) => setAlertData({...alertData, photo: e.target.files[0]})}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? "Posting..." : "Submit Alert"}
                    </button>
                </form>
            </div>
        </div>
    );
}