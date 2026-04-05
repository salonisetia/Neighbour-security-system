import { useState, useEffect } from "react";
import { User, Mail, Home, Phone, Shield, Save, Camera } from "lucide-react";

import { ShieldCheck } from "lucide-react";

export default function Settings() {
    return (
        <div className="min-h-screen bg-slate-50 p-6 pt-24 flex items-center justify-center">
            <div className="max-w-md w-full text-center bg-white rounded-3xl p-12 shadow-2xl border border-slate-100">
                <div className="mx-auto h-20 w-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
                    <ShieldCheck className="h-10 w-10 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Profile Editing Updated</h1>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Profile editing is now accessible by clicking the <strong>profile icon</strong> at the top-left corner 
                    (blue when logged in). Login or signup first!
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <p className="text-sm text-blue-800 font-medium">💡 Tip: After login, click the user icon next to "SafeNeighbor" logo.</p>
                </div>
            </div>
        </div>
    );
}
