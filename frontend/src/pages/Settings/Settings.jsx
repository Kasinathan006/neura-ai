import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Palette, Shield, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Settings() {
    const [activeTab, setActiveTab] = useState('profile')

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'security', label: 'Security', icon: Shield },
    ]

    const handleLogout = () => {
        toast.success('Logged out successfully')
    }

    return (
        <div className="h-full">
            <div className="glass rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
                <p className="text-gray-400">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="glass rounded-2xl p-4">
                    <nav className="space-y-2">
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-primary-500/20 text-primary-400' : 'text-gray-400 hover:bg-white/5'}`}>
                                <tab.icon className="w-5 h-5" />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/20 transition-all mt-8">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </nav>
                </div>

                <div className="lg:col-span-3 glass rounded-2xl p-6">
                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <h3 className="text-xl font-bold text-white mb-4">Profile Settings</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input type="text" defaultValue="User" className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input type="email" defaultValue="user@neura.ai" className="input-field" disabled />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                                <input type="text" defaultValue="user" className="input-field" disabled />
                            </div>
                            <button className="btn-primary">Save Changes</button>
                        </motion.div>
                    )}
                    {activeTab === 'appearance' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h3 className="text-xl font-bold text-white mb-4">Appearance</h3>
                            <p className="text-gray-400">Dark mode is enabled by default</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
