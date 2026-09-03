import { ArrowDown, ArrowUpRight, Waves } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

const bubbles = Array.from({ length: 16 }, (_, index) => ({
  left: `${4 + ((index * 19) % 92)}%`,
  size: `${4 + ((index * 7) % 13)}px`,
  duration: `${12 + ((index * 3) % 14)}s`,
  delay: `${-((index * 2.7) % 18)}s`,
  drift: `${-30 + ((index * 17) % 65)}px`,
}))

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentY = useTransform(scrollYProgress, [0, 0.75], [0, 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0])

  return (
    <section ref={ref} id="intro" className="noise relative min-h-[105svh] overflow-hidden bg-[#061a2c]">
      <motion.img
        src="/images/pelagia-hero.jpg"
        alt="심해 협곡 위를 비행하듯 잠항하는 PELAGIA 잠수정"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
        style={{ y: imageY, scale: imageScale }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,7,15,.9)_0%,rgba(0,10,20,.56)_43%,rgba(0,9,18,.12)_75%),linear-gradient(0deg,rgba(0,8,15,.92)_0%,transparent_42%,rgba(1,12,23,.32)_100%)]" />
      <div className="water-rays absolute -inset-x-40 top-0 h-[72%] opacity-70" />
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {bubbles.map((bubble, index) => (
          <span
            key={index}
            className="bubble"
            style={
              {
                "--left": bubble.left,
                "--size": bubble.size,
                "--duration": bubble.duration,
                "--delay": bubble.delay,
                "--drift": bubble.drift,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-[105svh] w-full max-w-[1500px] items-end px-5 pb-24 sm:px-8 sm:pb-28 lg:px-14 lg:pb-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-[780px]">
          <div className="mb-6 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-cyan-100/80 uppercase sm:text-xs">
            <Waves aria-hidden="true" className="h-4 w-4 text-cyan-300" />
            프라이빗 심해 탐험 · 2026년 설립
          </div>
          <h1 className="text-balance text-[clamp(2.9rem,8vw,7.6rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-white">
            빛이 닿지 않는<br className="hidden sm:block" /> 세계로
          </h1>
          <p className="mt-7 max-w-xl text-[1.02rem] leading-[1.75] font-normal text-slate-200/85 sm:text-lg">
            지구의 마지막 미지의 공간을 직접 탐험하세요. 여섯 개의 좌석, 한 번의 잠항,
            그리고 평생 잊지 못할 푸른 침묵.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#courses"
              className="group inline-flex min-h-13 items-center gap-5 bg-cyan-200 px-6 py-3.5 text-sm font-semibold text-[#00141d] transition-colors hover:bg-white"
            >
              탐험 시작하기
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#depth-lab" className="inline-flex items-center gap-2 text-sm font-medium text-white/72 transition-colors hover:text-white">
              수심을 직접 탐색하기
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>

      <div className="absolute right-5 bottom-8 z-10 hidden items-center gap-3 text-[10px] tracking-[0.16em] text-white/50 uppercase sm:flex">
        스크롤해 잠항하기
        <span className="relative h-12 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-5 bg-cyan-200"
            animate={{ y: [0, 48] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  )
}
