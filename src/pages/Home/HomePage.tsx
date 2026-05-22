import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
// Import các section bạn sẽ tạo dưới đây
// import Hero from '../components/organisms/Hero';
// import FeaturedProjects from '../components/organisms/FeaturedProjects';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION: Gây ấn tượng đầu tiên với Typography lớn */}
      <section className="min-h-screen flex flex-col gap-2 justify-center items-center px-10 bg-[#0a0a0a] text-white">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary font-mono mb-4"
        >
          Junior Frontend Engineer
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-9xl font-black leading-tight tracking-tighter"
        >
          {/* MẠNH <br /> NGUYỄN. */}
        </motion.h1>
        <p className="mt-8 max-w-md text-gray-400 text-lg">
          Chuyên tâm xây dựng các trải nghiệm kỹ thuật số hiện đại, tập trung
          vào hiệu suất và sự tinh tế trong từng dòng code.
        </p>
        <div className="flex gap-2">
          <Link
            to={'https://interact-hub.jackethee.dev/'}
            className="px-2 py-1 rounded-md bg-white/10"
          >
            Social Media: MALHH
          </Link>
          <Link
            to={'https://mqsaqn.jackethee.dev/'}
            className="px-2 py-1 rounded-md bg-white/10"
          >
            E-Commerce: MQSAQN
          </Link>
          <Link
            to={'https://examhub.jackethee.dev/'}
            className="px-2 py-1 rounded-md bg-white/10"
          >
            Examhub: MaChHiAn
          </Link>
          <Link
            to={'https://pos.jackethee.dev/ban/1'}
            className="px-2 py-1 rounded-md bg-white/10"
          >
            POS: ANSODUHOVIMA
          </Link>
        </div>
      </section>
    </div>
  )
}
