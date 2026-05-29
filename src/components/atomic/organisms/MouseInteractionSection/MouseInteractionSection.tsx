import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import Button from '@/components/atomic/atoms/Button/Button'

type Emotion = 'normal' | 'happy' | 'excited'

interface PupilOffset {
  x: number
  y: number
}

export default function MouseInteractionSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const targetOffsetRef = useRef<PupilOffset>({ x: 0, y: 0 })

  const [emotion, setEmotion] = useState<Emotion>('normal')
  const [pupilOffset, setPupilOffset] = useState<PupilOffset>({ x: 0, y: 0 })

  const maxPupilOffset = useMemo(
    () => (emotion === 'excited' ? 10 : 7),
    [emotion],
  )

  const calculateOffset = useCallback(
    (clientX: number, clientY: number) => {
      const bounds = sectionRef.current?.getBoundingClientRect()
      if (!bounds) return

      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2

      const dx = clientX - centerX
      const dy = clientY - centerY
      const angle = Math.atan2(dy, dx)

      const distance = Math.min(Math.hypot(dx, dy), 260)
      const normalized = distance / 260
      const radius = normalized * maxPupilOffset

      targetOffsetRef.current = {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      }
    },
    [maxPupilOffset],
  )

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      calculateOffset(event.clientX, event.clientY)
    },
    [calculateOffset],
  )

  useEffect(() => {
    const tick = () => {
      setPupilOffset((prev) => {
        const target = targetOffsetRef.current
        const nextX = prev.x + (target.x - prev.x) * 0.18
        const nextY = prev.y + (target.y - prev.y) * 0.18
        return { x: nextX, y: nextY }
      })
      animationFrameRef.current = window.requestAnimationFrame(tick)
    }

    animationFrameRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const handleButtonEnter = useCallback(() => {
    setEmotion('happy')
  }, [])

  const handleButtonLeave = useCallback(() => {
    setEmotion('normal')
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-interaction-bg text-main-text"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 py-24">
        <div className="text-center space-y-3">
          <p className="text-overline text-main-text/60">
            Mouse Interaction Lab
          </p>
          <h2 className="text-h4">Eye Tracking & State Mutation</h2>
          <p className="text-body-1 text-main-text/70 max-w-2xl">
            The eyes follow your cursor with smooth inertia. Hover the button to
            shift emotion and watch the expression react in real time.
          </p>
        </div>

        <div className="relative flex flex-col items-center gap-12">
          <div
            className={`relative flex h-96 w-96 items-center justify-center rounded-[60px] border border-interaction-border bg-interaction-surface shadow-[0_36px_120px_-50px_var(--interaction-shadow)] transition-colors ${
              emotion === 'excited'
                ? 'ring-2 ring-interaction-accent/50'
                : 'ring-2 ring-interaction-border/60'
            }`}
          >
            <div className="absolute -top-12 h-20 w-48 rounded-full bg-interaction-accent/35 blur-2xl" />
            <div className="absolute -top-16 h-24 w-56 rounded-full bg-interaction-accent/20 blur-3xl" />
            <div className="flex items-center gap-10">
              {[0, 1].map((index) => (
                <div
                  key={`eye-${index}`}
                  className={`relative flex items-center justify-center overflow-hidden rounded-full border border-interaction-eye/60 bg-interaction-eye transition-all ${
                    emotion === 'happy'
                      ? 'h-9 w-36'
                      : emotion === 'excited'
                        ? 'h-28 w-28'
                        : 'h-24 w-24'
                  }`}
                >
                  <div
                    className={`absolute h-12 w-12 rounded-full bg-interaction-pupil transition-opacity ${
                      emotion === 'happy' ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{
                      transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                    }}
                  />
                  {emotion === 'happy' && (
                    <div className="h-5 w-28 rounded-full bg-interaction-pupil/70" />
                  )}
                </div>
              ))}
            </div>
            <div
              className={`absolute -bottom-16 h-16 w-56 rounded-full bg-interaction-accent/25 blur-3xl transition-opacity ${
                emotion === 'excited' ? 'opacity-90' : 'opacity-40'
              }`}
            />
          </div>

          <Button
            onMouseEnter={handleButtonEnter}
            onMouseLeave={handleButtonLeave}
            onFocus={handleButtonEnter}
            onBlur={handleButtonLeave}
            className="rounded-full border border-interaction-border bg-interaction-accent px-6 py-3 text-body-2-semibold text-interaction-on-accent shadow-[0_12px_30px_-18px_var(--interaction-shadow)] hover:bg-interaction-accent/90"
          >
            Make it smile
          </Button>
        </div>
      </div>
    </section>
  )
}
