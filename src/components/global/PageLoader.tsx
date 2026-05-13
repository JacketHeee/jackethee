import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const PageLoader = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.floor(Math.random() * 15) // Tăng ngẫu nhiên cho cảm giác thật
      })
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-white"
    >
      <div className="relative overflow-hidden">
        {/* Chữ JF - Thương hiệu cá nhân của bạn */}
        <motion.h1
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="text-8xl font-black tracking-tighter md:text-[12rem]"
        >
          JF
        </motion.h1>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="h-0.5 w-48 bg-white/10">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-sm uppercase tracking-widest opacity-50">
          Initializing Experience {progress}%
        </span>
      </div>
    </motion.div>
  )
}
