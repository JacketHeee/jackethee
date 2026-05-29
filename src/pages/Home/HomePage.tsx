import { motion } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import LoadingOverlay from '@/components/global/LoadingOverlay'
import { useTranslation } from 'react-i18next'
// Import các section bạn sẽ tạo dưới đây
// import Hero from '../components/organisms/Hero';
// import FeaturedProjects from '../components/organisms/FeaturedProjects';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [shouldThrowError, setShouldThrowError] = useState(false)
  const [shouldThrowSentryError, setShouldThrowSentryError] = useState(false)
  const { t } = useTranslation()

  const handleToastDemo = () => {
    toast.success(t('home.toastReady'))
  }

  const handleLoadingDemo = () => {
    setIsLoading(true)
    const toastId = toast.loading(t('home.loadingData'))

    setTimeout(() => {
      setIsLoading(false)
      toast.dismiss(toastId)
      toast.success(t('home.loadingDone'))
    }, 1500)
  }

  if (shouldThrowError) {
    throw new Error(t('home.errorDemo'))
  }

  if (shouldThrowSentryError) {
    throw new Error(t('home.sentryDemo'))
  }

  return (
    <div className="flex flex-col w-full">
      <LoadingOverlay isVisible={isLoading} label={t('home.loadingData')} />
      {/* 1. HERO SECTION: Gây ấn tượng đầu tiên với Typography lớn */}
      <section className="dark min-h-screen flex flex-col gap-2 justify-center items-center px-10 bg-main-bg text-main-text">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-overline mb-4"
        >
          {t('home.role')}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-h2 md:text-h1"
        >
          {/* {t('home.name').split(' ').slice(0, 1).join(' ')} <br />
          {t('home.name').split(' ').slice(1).join(' ')} */}
        </motion.h1>
        <p className="mt-8 max-w-md text-subtitle-1 text-main-text/70">
          {t('home.tagline')}
        </p>
        <div className="flex gap-2">
          <Link
            to={'https://interact-hub.jackethee.dev/'}
            className="px-2 py-1 rounded-md border border-main-border text-body-2"
          >
            {t('home.links.social')}: MALHH
          </Link>
          <Link
            to={'https://mqsaqn.jackethee.dev/'}
            className="px-2 py-1 rounded-md border border-main-border text-body-2"
          >
            {t('home.links.ecommerce')}: MQSAQN
          </Link>
          <Link
            to={'https://examhub.jackethee.dev/'}
            className="px-2 py-1 rounded-md border border-main-border text-body-2"
          >
            {t('home.links.examhub')}: MaChHiAn
          </Link>
          <Link
            to={'https://pos.jackethee.dev/ban/1'}
            className="px-2 py-1 rounded-md border border-main-border text-body-2"
          >
            {t('home.links.pos')}: ANSODUHOVIMA
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleToastDemo}
            className="px-3 py-2 rounded-md border border-main-border text-body-2-semibold hover:bg-main-text/10 transition-colors"
          >
            {t('home.buttons.toast')}
          </button>
          <button
            type="button"
            onClick={handleLoadingDemo}
            className="px-3 py-2 rounded-md border border-main-border text-body-2-semibold hover:bg-main-text/10 transition-colors"
          >
            {t('home.buttons.loading')}
          </button>
          <button
            type="button"
            onClick={() => setShouldThrowError(true)}
            className="px-3 py-2 rounded-md border border-main-border text-body-2-semibold hover:bg-main-text/10 transition-colors"
          >
            {t('home.buttons.error')}
          </button>
          <button
            type="button"
            onClick={() => setShouldThrowSentryError(true)}
            className="px-3 py-2 rounded-md border border-main-border text-body-2-semibold hover:bg-main-text/10 transition-colors"
          >
            {t('home.buttons.sentry')}
          </button>
        </div>
      </section>
    </div>
  )
}
