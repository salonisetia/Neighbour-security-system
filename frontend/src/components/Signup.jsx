import { useState } from "react";
import { ShieldCheck, Mail, Lock, User, Eye, EyeOff, MapPin } from "lucide-react";

export default function Signup() {
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "", 
        role: "resident"
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, location, role } = formData;
    try {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, location, role }) 
        });

        const data = await response.json();

        if (response.ok) {
            // alert("Signup successful! Your data is saved in MongoDB Atlas.");
            localStorage.setItem("userToken", data.token);
         window.location.href ="/dashboard";
        } else {
            alert("Signup failed: " + data.error);
        }
    } catch (error) {
        console.error("Connection error:", error);
        alert("Server is not running. Please start your backend.");
    }
    console.log("Form submitted:", formData);
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                        <ShieldCheck className="text-white h-8 w-8" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Create Account</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Join your local community security network
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Name Input */}
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                            </button>
                        </div>
                        {/* Location Input */}
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                            <input
                                name="location"
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                placeholder="Neighborhood / Street Address"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Role Selection */}
                        <div className="relative">
                            <ShieldCheck className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                            <select
                                name="role"
                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white text-slate-600"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="resident">Resident</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg shadow-blue-200"
                        >
                            Get Started
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-slate-600">Already have an account? </span>
                        <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Log in
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

