import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, Square, Waveform } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Voice() {
    const [isRecording, setIsRecording] = useState(false)
    const [transcript, setTranscript] = useState('')

    const startRecording = () => {
        setIsRecording(true)
        toast.success('Recording started')
    }

    const stopRecording = () => {
        setIsRecording(false)
        setTranscript('This is a demo transcription. Connect to backend for real voice recognition!')
        toast.success('Recording stopped')
    }

    return (
        <div className="h-full flex flex-col">
            <div className="glass rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Voice Assistant</h2>
                <p className="text-gray-400">Record audio and get instant transcription</p>
            </div>

            <div className="flex-1 glass rounded-2xl p-12 flex flex-col items-center justify-center">
                {isRecording && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-12">
                        {[...Array(20)].map((_, i) => (
                            <motion.div key={i} className="w-1 bg-primary-500 rounded-full waveform-bar" style={{ height: '60px', animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </motion.div>
                )}

                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={isRecording ? stopRecording : startRecording} className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50' : 'bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/50'}`}>
                    {isRecording ? <Square className="w-12 h-12 text-white" /> : <Mic className="w-12 h-12 text-white" />}
                </motion.button>

                <p className="mt-6 text-gray-400 text-lg">{isRecording ? 'Recording... Click to stop' : 'Click to start recording'}</p>

                {transcript && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 w-full max-w-2xl glass rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Transcript</h3>
                        <p className="text-gray-300 leading-relaxed">{transcript}</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
