'use client'

import { motion } from 'framer-motion'
import { Twitter, Github, FileText } from 'lucide-react'

export function Header() {
  return (
    <header className="relative z-20 w-full border-b-2 border-[#9e5f0d]/30 bg-black/60 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <motion.a
              href="https://x.com/CyberForge_Ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#9e5f0d] hover:text-[#9e5f0d] hover:bg-[#9e5f0d]/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter size={20} />
            </motion.a>
            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#9e5f0d] hover:text-[#9e5f0d] hover:bg-[#9e5f0d]/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="/whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#9e5f0d] hover:text-[#9e5f0d] hover:bg-[#9e5f0d]/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FileText size={20} />
            </motion.a>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold tracking-wider text-center text-[#9e5f0d]">
            Quantum Chrono Terminal
          </h1>

          {/* Empty div for flex spacing */}
          <div className="w-[108px]" /> {/* Same width as social links */}
        </div>
      </div>
    </header>
  )
}

