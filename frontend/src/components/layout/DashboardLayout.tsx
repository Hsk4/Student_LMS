import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";
import {Outlet} from "react-router-dom"


export default function DashboardLayout() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return(
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <Sidebar isMobileOpen={isMobileOpen} />
            
            {/* Mobile overlay */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 lg:hidden z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

