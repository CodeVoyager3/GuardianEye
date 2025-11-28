import React, { useState } from 'react';
import { LayoutDashboard, Activity, Shield, Settings, LogOut } from 'lucide-react';
import TacticalMap from '../components/dashboard/TacticalMap';
import TribunalLog from '../components/dashboard/TribunalLog';
import { useThreatSimulation } from '../hooks/useThreatSimulation';

const DashboardPage = () => {
    const { activeThreats } = useThreatSimulation();
    const [threatsNeutralized, setThreatsNeutralized] = useState(843);

    const handleNeutralize = () => {
        setThreatsNeutralized(prev => prev + 1);
    };

    const systemStatus = activeThreats.length > 3 ? 'ENGAGING' : 'ONLINE';
    const statusColor = activeThreats.length > 3 ? 'text-red-500' : 'text-[#00FFFF]';
    const statusBg = activeThreats.length > 3 ? 'bg-red-500/10 border-red-500/20' : 'bg-[#00FFFF]/10 border-[#00FFFF]/20';
    const statusDot = activeThreats.length > 3 ? 'bg-red-500' : 'bg-[#00FFFF]';

    return (
        <div className="flex h-screen w-full bg-[#101010] text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-[80px] flex-shrink-0 border-r border-white/10 flex flex-col items-center py-6 bg-[#0A0A0A]">
                <div onClick={() => window.location.reload()} className="mb-8">
                    <div className="w-10 h-10  rounded-lg flex items-center justify-center ">
                        <img src="/logo.png" alt="ARES Logo" className="w-10 hover:animate-pulse h-10 object-contain" />
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-6 w-full px-2">
                    <SidebarItem icon={<LayoutDashboard size={24} />} active />
                    <SidebarItem icon={<Activity size={24} />} />
                    <SidebarItem icon={<Shield size={24} />} />
                </nav>

                <div className="mt-auto">
                    <SidebarItem icon={<Settings size={24} />} />
                    <div className="mt-4 pt-4 border-t border-white/10 w-full flex justify-center">
                        <SidebarItem icon={<LogOut size={24} />} />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

                <header className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">SYSTEM DASHBOARD</h1>
                        <p className="text-gray-400 text-sm mt-1">Overview of active autonomous agents</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono transition-colors duration-300 ${statusBg} ${statusColor}`}>
                            <span className={`w-2 h-2 rounded-full animate-pulse ${statusDot}`} />
                            SYSTEM {systemStatus}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {/* Real-time Widgets */}
                    <DashboardCard title="Active Threats" value={activeThreats.length} trend={activeThreats.length > 3 ? "HIGH" : "NORMAL"} />
                    <DashboardCard title="Threats Neutralized" value={threatsNeutralized} trend="+1" />
                    <DashboardCard title="System Status" value={systemStatus} trend="Stable" />

                    {/* Tactical Map */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[400px] bg-[#151515] border border-white/5 rounded-xl overflow-hidden relative group">
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-xs font-mono text-red-500 tracking-wider">LIVE FEED</span>
                        </div>
                        <TacticalMap
                            threats={activeThreats.map(t => ({
                                id: t.id,
                                lat: t.coordinates[0],
                                lng: t.coordinates[1],
                                type: t.type,
                                status: t.status,
                                isZyndVerified: t.isZyndVerified
                            }))}
                            onNeutralize={handleNeutralize}
                        />
                    </div>

                    {/* Tribunal Log */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 h-[400px] rounded-xl overflow-hidden">
                        <TribunalLog activeThreats={activeThreats} />
                    </div>
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, active }) => (
    <button className={`w-full aspect-square flex items-center justify-center rounded-xl transition-all duration-200 ${active ? 'bg-[#00FFFF]/10 text-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
        {icon}
    </button>
);

const DashboardCard = ({ title, value, trend }) => (
    <div className="bg-[#151515] border border-white/5 rounded-xl p-6 hover:border-[#00FFFF]/30 transition-colors duration-300 group">
        <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
        <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-white group-hover:text-[#00FFFF] transition-colors">{value}</span>
            <span className="text-xs font-mono text-[#00FFFF] bg-[#00FFFF]/10 px-2 py-1 rounded">{trend}</span>
        </div>
    </div>
);

export default DashboardPage;
