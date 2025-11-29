import React, { useState } from 'react';
import { LayoutDashboard, Activity, Shield, Settings, LogOut, Bell, Volume2, VolumeX } from 'lucide-react';
import TacticalMap from '../components/dashboard/TacticalMap';
import TribunalLog from '../components/dashboard/TribunalLog';
import { useRealtimeThreats } from '../hooks/useRealtimeThreats';

// --- Helper Components (Hoisted) ---

const SidebarItem = ({ icon, active, onClick, label }) => (
    <button
        onClick={onClick}
        title={label}
        className={`w-full aspect-square flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${active ? 'bg-[#00FFFF]/10 text-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
    >
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

const StatusRow = ({ name, status }) => (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
        <span className="text-sm font-medium">{name}</span>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-500 font-mono">{status}</span>
        </div>
    </div>
);

// --- Main Component ---

const DashboardPage = () => {
    const { activeThreats } = useRealtimeThreats();
    const [threatsNeutralized, setThreatsNeutralized] = useState(843);
    const [currentView, setCurrentView] = useState('dashboard'); // dashboard, activity, shield, settings
    const [soundEnabled, setSoundEnabled] = useState(true);

    const handleNeutralize = () => {
        setThreatsNeutralized(prev => prev + 1);
    };

    const systemStatus = activeThreats.length > 3 ? 'ENGAGING' : 'ONLINE';
    const statusColor = activeThreats.length > 3 ? 'text-red-500' : 'text-[#00FFFF]';
    const statusBg = activeThreats.length > 3 ? 'bg-red-500/10 border-red-500/20' : 'bg-[#00FFFF]/10 border-[#00FFFF]/20';
    const statusDot = activeThreats.length > 3 ? 'bg-red-500' : 'bg-[#00FFFF]';

    const renderContent = () => {
        switch (currentView) {
            case 'activity':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold mb-4">Activity Logs</h2>
                        <div className="bg-[#151515] border border-white/5 rounded-xl p-6">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-400 border-b border-white/10">
                                        <th className="pb-4">Timestamp</th>
                                        <th className="pb-4">Event</th>
                                        <th className="pb-4">Sector</th>
                                        <th className="pb-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {activeThreats.length === 0 ? (
                                        <tr><td colSpan="4" className="py-4 text-center text-gray-500">No recent activity</td></tr>
                                    ) : (
                                        activeThreats.map((t, i) => (
                                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="py-3 font-mono text-xs">{new Date(t.timestamp * 1000).toLocaleTimeString()}</td>
                                                <td className="py-3 text-[#00FFFF]">{t.type}</td>
                                                <td className="py-3">{t.sector}</td>
                                                <td className="py-3">
                                                    <span className={`px-2 py-1 rounded text-xs ${t.isZyndVerified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                        {t.isZyndVerified ? 'VERIFIED' : 'PENDING'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'shield':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold mb-4">System Diagnostics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DashboardCard title="Network Latency" value="12ms" trend="OPTIMAL" />
                            <DashboardCard title="AI Confidence" value="98.4%" trend="STABLE" />
                            <DashboardCard title="Sentry Uptime" value="24h 12m" trend="ONLINE" />
                            <DashboardCard title="Active Nodes" value="4" trend="CONNECTED" />
                        </div>
                        <div className="bg-[#151515] border border-white/5 rounded-xl p-6 mt-6">
                            <h3 className="text-lg font-bold mb-4">Node Status</h3>
                            <div className="space-y-4">
                                <StatusRow name="Commander Agent" status="ONLINE" />
                                <StatusRow name="Aggressor Agent" status="ONLINE" />
                                <StatusRow name="Guardian Agent" status="ONLINE" />
                                <StatusRow name="Logistican Agent" status="ONLINE" />
                            </div>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold mb-4">System Configuration</h2>
                        <div className="bg-[#151515] border border-white/5 rounded-xl p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">Audio Alerts</h3>
                                    <p className="text-sm text-gray-400">Play sound when new threats are detected</p>
                                </div>
                                <button
                                    onClick={() => setSoundEnabled(!soundEnabled)}
                                    className={`p-3 rounded-lg border transition-all ${soundEnabled ? 'bg-[#00FFFF]/20 border-[#00FFFF] text-[#00FFFF]' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                >
                                    {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                                </button>
                            </div>
                            <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                <div>
                                    <h3 className="font-medium">Notifications</h3>
                                    <p className="text-sm text-gray-400">Desktop notifications for critical events</p>
                                </div>
                                <button className="w-12 h-6 rounded-full bg-white/10 relative transition-colors hover:bg-white/20">
                                    <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-gray-400 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default: // dashboard
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 animate-in fade-in duration-500">
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
                                    lat: t.coordinates ? t.coordinates[0] : 51.505, // Fallback if no coords
                                    lng: t.coordinates ? t.coordinates[1] : -0.09,
                                    type: t.type,
                                    status: t.status || 'DETECTED',
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
                );
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#101010] text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-[80px] flex-shrink-0 border-r border-white/10 flex flex-col items-center py-6 bg-[#0A0A0A] z-20 relative">
                <div onClick={() => window.location.reload()} className="mb-8 cursor-pointer">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                        <img src="/logo.png" alt="ARES Logo" className="w-10 hover:animate-pulse h-10 object-contain" />
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-6 w-full px-2">
                    <SidebarItem
                        icon={<LayoutDashboard size={24} />}
                        active={currentView === 'dashboard'}
                        onClick={() => { console.log("Nav: Dashboard"); setCurrentView('dashboard'); }}
                        label="Dashboard"
                    />
                    <SidebarItem
                        icon={<Activity size={24} />}
                        active={currentView === 'activity'}
                        onClick={() => { console.log("Nav: Activity"); setCurrentView('activity'); }}
                        label="Activity"
                    />
                    <SidebarItem
                        icon={<Shield size={24} />}
                        active={currentView === 'shield'}
                        onClick={() => { console.log("Nav: Shield"); setCurrentView('shield'); }}
                        label="System Status"
                    />
                </nav>

                <div className="mt-auto">
                    <SidebarItem
                        icon={<Settings size={24} />}
                        active={currentView === 'settings'}
                        onClick={() => { console.log("Nav: Settings"); setCurrentView('settings'); }}
                        label="Settings"
                    />
                    <div className="mt-4 pt-4 border-t border-white/10 w-full flex justify-center">
                        <SidebarItem
                            icon={<LogOut size={24} />}
                            onClick={() => window.location.reload()}
                            label="Logout"
                        />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 relative z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

                <header className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {currentView === 'dashboard' && 'SYSTEM DASHBOARD'}
                            {currentView === 'activity' && 'ACTIVITY LOGS'}
                            {currentView === 'shield' && 'SYSTEM DIAGNOSTICS'}
                            {currentView === 'settings' && 'CONFIGURATION'}
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            {currentView === 'dashboard' && 'Overview of active autonomous agents'}
                            {currentView === 'activity' && 'Real-time threat detection history'}
                            {currentView === 'shield' && 'Network and agent status monitoring'}
                            {currentView === 'settings' && 'Manage system preferences'}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono transition-colors duration-300 ${statusBg} ${statusColor}`}>
                            <span className={`w-2 h-2 rounded-full animate-pulse ${statusDot}`} />
                            SYSTEM {systemStatus}
                        </div>
                    </div>
                </header>

                {renderContent()}
            </main>
        </div>
    );
};

export default DashboardPage;
