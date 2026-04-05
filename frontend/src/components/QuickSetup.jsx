import { useState } from "react";
import { Shield, Bell, MapPin, CheckCircle, Loader2 } from "lucide-react";

export default function QuickSetup() {
    const [selectedAlerts, setSelectedAlerts] = useState([]);
    const [radius, setRadius] = useState(5);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [notificationPref, setNotificationPref] = useState("Email Alerts");
    const [addAddress, setAddAddress] = useState(false);

    const categories = [
        "Accident",
        "Theft",
        "Fire",
        "Weather",
        "Suspicious Activity",
        "Medical Emergency"
    ];

    const toggleAlert = (cat) => {
        setSelectedAlerts((prev) =>
            prev.includes(cat)
                ? prev.filter((item) => item !== cat)
                : [...prev, cat]
        );
    };

    const handleGetGPS = () => {
        setLoading(true);

        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );

                    const data = await response.json();

                    const area =
                        data.address.suburb ||
                        data.address.neighbourhood ||
                        data.address.road ||
                        "Local Area";

                    const city =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        "Unknown City";

                    const country = data.address.country || "Unknown Country";

                    setAddress(`${area}, ${city}, ${country}`);
                } catch (error) {
                    console.error("Geocoding error:", error);
                    setAddress(
                        "Coordinates found, but address lookup failed."
                    );
                }

                setLoading(false);
            },
            () => {
                alert(
                    "GPS Access Denied. Please enable location permissions."
                );
                setLoading(false);
            }
        );
    };

    const handleManualChange = (e) => {
    setAddress(e.target.value);
    };

    const setManually = () => {
        setAddAddress(true);
        setAddress(""); // Clear GPS address to allow fresh manual input
        setLocation(null); // Reset numeric coordinates
    };

    const handleFinish = async () => {
    if (!address || address.trim() === "") {
        alert("Please provide your location (GPS or Manual) to continue.");
        return;
    }

    const token = localStorage.getItem("userToken");

    if (!token) {
        alert("Session expired. Please sign up again.");
        // Optional: window.location.href = "/signup";
        return;
    }

    try {
        setLoading(true); // Start the loading spinner

        const response = await fetch("http://localhost:5000/api/quicksetup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // This is the "ID Card" that tells the server who you are
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({
                selectedAlerts,
                radius,
                location, // Numeric coordinates for the backend logic
                address,  // The "Area, City, Country" string for the UI
                notificationPref
            })
        });

        const data = await response.json();

        if (response.ok) {
            // SUCCESS: Profile is updated in MongoDB
            alert("Security Profile Created Successfully!");
            
            // Redirect to the resident dashboard or home page
            window.location.href = "/dashboard"; 
        } else {
            // SERVER ERROR: (e.g., Token expired or Database error)
            alert(data.error || "Failed to save preferences.");
        }
    } catch (error) {
        // NETWORK ERROR: (e.g., Server is offline)
        console.error("Connection error:", error);
        alert("Could not connect to the server. Please check your internet.");
    } finally {
        setLoading(false); // Stop the loading spinner
    }
};

    return (
        <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-center">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Quick Setup
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                    Complete your profile to secure your neighborhood.
                </p>

                {/* Alert Categories */}
                <div className="mb-8">
                    <label className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        Alert Categories
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => toggleAlert(cat)}
                                className={`py-2 px-3 rounded-lg text-[11px] font-medium border transition-all ${
                                    selectedAlerts.includes(cat)
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-white text-slate-600 border-slate-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Preferences */}
                <div className="mb-8">
                    <label className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <Bell className="h-4 w-4 text-blue-600" />
                        Preferences
                    </label>

                    <select
                        value={notificationPref}
                        onChange={(e) =>
                            setNotificationPref(e.target.value)
                        }
                        className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 mb-4 outline-none"
                    >
                        <option>Email Alerts</option>
                        <option>Push Notifications</option>
                    </select>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-slate-500">
                                Alert Radius
                            </span>
                            <span className="text-blue-600 font-bold">
                                {radius} km
                            </span>
                        </div>

                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={radius}
                            onChange={(e) =>
                                setRadius(Number(e.target.value))
                            }
                            className="w-full accent-blue-600 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="mb-8">
                    <label className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        Confirm Location
                    </label>

                    {/* Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleGetGPS}
                            disabled={loading}
                            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                                address
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-slate-100 text-slate-700"
                            }`}
                        >
                            {loading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                                <MapPin className="h-3 w-3" />
                            )}
                            {address ? "Location Verified" : "Use GPS"}
                        </button>

                        <button
                            onClick={setManually}
                            className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
                        >
                            Set Manually
                        </button>
                    </div>

                    {/* Textarea below buttons */}
                    {addAddress && (
                        <div className="mt-3">
                            <textarea
                                placeholder="Enter Area, City, Country Here..."
                                value={address}
                                onChange={handleManualChange}
                                className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                            ></textarea>
                        </div>
                    )}

                    {/* Detected Address */}
                    {address && (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 mt-3">
                            <p className="text-[10px] font-bold text-blue-800 uppercase mb-1">
                                Detected Address:
                            </p>
                            <p className="text-[12px] text-slate-700 font-medium leading-tight">
                                {address}
                            </p>
                        </div>
                    )}
                </div>

                {/* Finish Button */}
                <button onClick={handleFinish} 
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                    Finish Setup
                </button>
            </div>
        </div>
    );
}