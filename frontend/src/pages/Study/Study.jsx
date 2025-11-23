import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Sparkles, RotateCw, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Study() {
    const [flashcards, setFlashcards] = useState([])
    const [isFlipped, setIsFlipped] = useState(false)
    const [showGenerator, setShowGenerator] = useState(false)
    const [topic, setTopic] = useState('')

    const generateFlashcards = () => {
        if (!topic.trim()) return
        toast.success(`Generated flashcards for: ${topic}`)
        setFlashcards([
            { id: 1, question: 'What is NEURA AI?', answer: 'A hyper-intelligent multi-agent autonomous system', difficulty: 'easy' },
            { id: 2, question: 'What technologies does NEURA AI use?', answer: 'React, FastAPI, PostgreSQL, Redis, and multiple AI models', difficulty: 'medium' },
        ])
        setShowGenerator(false)
        setTopic('')
    }

    return (
        <div className="h-full flex flex-col">
            <div className="glass rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Study Mode</h2>
                        <p className="text-gray-400">{flashcards.length} cards available</p>
                    </div>
                    <button onClick={() => setShowGenerator(true)} className="btn-primary flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Generate Cards
                    </button>
                </div>
            </div>

            {flashcards.length > 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-2xl">
                        <motion.div className="flashcard mb-8" onClick={() => setIsFlipped(!isFlipped)}>
                            <motion.div className="flashcard-inner relative" animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.6 }}>
                                <div className="flashcard-front absolute inset-0">
                                    <div className="glass rounded-3xl p-12 h-96 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all">
                                        <BookOpen className="w-12 h-12 text-primary-400 mb-6" />
                                        <h3 className="text-2xl font-bold text-white text-center mb-4">{flashcards[0].question}</h3>
                                        <p className="text-gray-400 text-sm">Click to reveal answer</p>
                                    </div>
                                </div>
                                <div className="flashcard-back absolute inset-0">
                                    <div className="glass rounded-3xl p-12 h-96 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all">
                                        <Check className="w-12 h-12 text-green-400 mb-6" />
                                        <h3 className="text-2xl font-bold text-white text-center mb-4">{flashcards[0].answer}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {isFlipped && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4">
                                <button className="px-8 py-4 glass rounded-xl text-red-400 hover:bg-red-500/20 transition-all flex items-center gap-2">
                                    <X className="w-5 h-5" />
                                    Hard
                                </button>
                                <button className="px-8 py-4 glass rounded-xl text-yellow-400 hover:bg-yellow-500/20 transition-all flex items-center gap-2">
                                    <RotateCw className="w-5 h-5" />
                                    Good
                                </button>
                                <button className="px-8 py-4 glass rounded-xl text-green-400 hover:bg-green-500/20 transition-all flex items-center gap-2">
                                    <Check className="w-5 h-5" />
                                    Easy
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">No Flashcards Yet</h3>
                        <p className="text-gray-400 mb-6">Generate some flashcards to start studying</p>
                        <button onClick={() => setShowGenerator(true)} className="btn-primary flex items-center gap-2 mx-auto">
                            <Sparkles className="w-5 h-5" />
                            Generate Flashcards
                        </button>
                    </div>
                </div>
            )}

            {showGenerator && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowGenerator(false)}>
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass rounded-3xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold text-white mb-6">Generate Flashcards</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Topic</label>
                                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., React Hooks, World War 2" className="input-field" />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setShowGenerator(false)} className="flex-1 btn-secondary">Cancel</button>
                                <button onClick={generateFlashcards} disabled={!topic.trim()} className="flex-1 btn-primary disabled:opacity-50">Generate</button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}
