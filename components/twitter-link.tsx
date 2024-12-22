'use client'

import { motion } from 'framer-motion'
import { Twitter } from 'lucide-react'

export function TwitterLink() {
  return (
    <motion.a
      href="https://x.com/CyberForge_Ai"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-6 right-6 z-50 p-3 bg-black/40 backdrop-blur-sm rounded-full border border-[#9e5f0d]/30 
                 text-[#9e5f0d] hover:text-[#9e5f0d] hover:bg-black/60 transition-all duration-200
                 shadow-lg hover:shadow-[#9e5f0d]/20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Twitter size={20} />
    </motion.a>
  )
}

