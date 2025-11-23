import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Plus, Check, Trash2, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Reminders() {
    const [reminders, setReminders] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ title: '', description: '', time_expression: '' })

    const createReminder = (e) => {
        e.preventDefault()
        const newReminder = {
            id: Date.now(),
            ...formData,
            scheduled_time: new Date(Date.now() + 3600000).toISOString(),
            is_completed: false
        }
        setReminders([...reminders, newReminder])
        toast.success('Reminder created!')
        setShowForm(false)
        setFormData({ title: '', description: '', time_expression: '' })
    }

    const deleteReminder = (id) => {
        setReminders(reminders.filter(r => r.id !== id))
        toast.success('Reminder deleted!')
    }

    return (
        <div className="h-full flex flex-col">
            <div className="glass rounded-2xl p-6 mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Reminders</h2>
                    <p className="text-gray-400">{reminders.length} active reminders</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    New Reminder
                </button>
            </div>

            {showForm && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 mb-6">
                    <form onSubmit={createReminder} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-field" placeholder="Study for exam" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Description (optional)</label>
                            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field resize-none" rows={3} placeholder="Review chapters 5-7" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">When?</label>
                            <input type="text" required value={formData.time_expression} onChange={(e) => setFormData({ ...formData, time_expression: e.target.value })} className="input-field" placeholder="tomorrow at 3pm, in 2 hours" />
                            <p className="text-xs text-gray-500 mt-1">Examples: "in 30 minutes", "tomorrow at 2pm"</p>
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setShowForm(false)} className="flex-1 btn-secondary">Cancel</button>
                            <button type="submit" className="flex-1 btn-primary">Create Reminder</button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="flex-1 space-y-4 overflow-y-auto">
                {reminders.length === 0 ? (
                    <div className="glass rounded-2xl p-12 text-center">
                        <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Reminders</h3>
                        <p className="text-gray-400">Create your first reminder to get started</p>
                    </div>
                ) : (
                    reminders.map((reminder) => (
                        <motion.div key={reminder.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 hover:bg-white/10 transition-all">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-1">{reminder.title}</h3>
                                    {reminder.description && <p className="text-gray-400 text-sm mb-3">{reminder.description}</p>}
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span>{reminder.time_expression}</span>
                                    </div>
                                </div>
                                <button onClick={() => deleteReminder(reminder.id)} className="p-2 glass rounded-xl hover:bg-red-500/20 text-red-400 transition-all">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}
