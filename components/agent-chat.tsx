'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypingAnimation } from './typing-animation'
import { LoadingState } from './loading-state'

interface AgentChatProps {
  agent: string
  role: string
  onClose: () => void
}

export function AgentChat({ agent, role, onClose }: AgentChatProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent', content: string }>>([])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Get initial greeting from API
    const initializeAgent = async () => {
      try {
        const response = await fetch('/api/quantum/agent/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agent, role })
        })
        const data = await response.json()
        setMessages([{ role: 'agent', content: data.greeting }])
        setIsProcessing(false)
        setIsInitialized(true)
      } catch (error) {
        setMessages([{ 
          role: 'agent', 
          content: `[${agent}] Neural link established. Ready to assist with ${role.toLowerCase()} operations.` 
        }])
        setIsProcessing(false)
        setIsInitialized(true)
      }
    }
    initializeAgent()
  }, [agent, role])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    if (input.toLowerCase() === 'exit') {
      onClose()
      return
    }

    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    setIsProcessing(true)

    try {
      const response = await fetch('/api/quantum/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent, query: input })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'agent', content: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'agent', content: 'Error processing request. Please try again.' }])
    }
    setIsProcessing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
    >
      <div className="w-full max-w-4xl h-[80vh] bg-black/90 backdrop-blur-lg rounded-lg border-2 border-[#9e5f0d]/30 p-4 flex flex-col">
        {/* Agent Header */}
        <motion.div 
          className="flex justify-between items-center mb-4 border-b border-[#9e5f0d]/30 pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-2">
            <h2 className="text-[#9e5f0d] text-xl font-bold">{agent}</h2>
            <span className="text-[#9e5f0d]/60 text-sm">| {role}</span>
          </div>
          <button 
            onClick={onClose}
            className="text-[#9e5f0d] hover:text-[#9e5f0d]/80"
          >
            [X]
          </button>
        </motion.div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-auto space-y-4 mb-4">
          {!isInitialized && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full space-y-4"
            >
              <div className="text-[#9e5f0d] text-lg">Initializing Neural Interface...</div>
              <LoadingState />
            </motion.div>
          )}
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`${
                msg.role === 'user' ? 'text-green-500' : 'text-[#9e5f0d]'
              }`}
            >
              <TypingAnimation text={msg.content} delay={20} />
            </motion.div>
          ))}
          {isProcessing && <LoadingState />}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'exit' to close or enter your query..."
            className="flex-1 bg-black/50 border border-[#9e5f0d]/30 rounded px-3 py-2 text-[#9e5f0d] focus:outline-none focus:border-[#9e5f0d]"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="px-4 py-2 bg-[#9e5f0d]/20 border border-[#9e5f0d]/30 rounded text-[#9e5f0d] hover:bg-[#9e5f0d]/30 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </motion.div>
  )
}

