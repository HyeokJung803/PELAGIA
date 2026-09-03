import { useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { ArrowDown, Compass, Gauge, Sparkles } from "lucide-react"
import { Hero } from "./components/Hero"
import { Footer, Header } from "./components/SiteChrome"
import BookingSection from "./components/BookingSection"
import DepthExplorer from "./components/DepthExplorer"
import ExpeditionCourses from "./components/ExpeditionCourses"
import JournalGallery from "./components/JournalGallery"
import SafetyFlow from "./components/SafetyFlow"
import Submersible from "./components/Submersible"

function DepthGauge() {
  const { scrollYProgress } = useScroll()
  const [depth, setDepth] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (value) => setDepth(Math.round(value * 6000)))

  return (
    <aside aria-label={`현재 페이지 수심 ${depth.toLocaleString("ko-KR")}미터`} className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3 xl:flex">
      <div className="relative h-44 w-px bg-white/18">
        <motion.div className="absolute inset-x-0 top-0 origin-top bg-cyan-300" style={{ height: `${Math.max(2, (depth / 6000) * 100)}%` }} />
        {[0, 1, 2, 3, 4].map((tick) => <span key={tick} className="absolute -left-1 h-px w-2 bg-white/35" style={{ top: `${tick * 25}%` }} />)}
      </div>
      <div className="flex h-44 flex-col justify-between py-0.5 text-right">
        <span className="text-[9px] tracking-[0.15em] text-white/38">현재 수심</span>
        <div>
          <strong className="block text-lg font-medium tabular-nums text-cyan-100">{depth.toLocaleString("ko-KR")}</strong>
          <span className="block text-[9px] tracking-[0.12em] text-white/42">미터</span>
        </div>
      </div>
    </aside>
  )
}

function DescentInterlude() {
  const notes = [
    { icon: Compass, label: "단 여섯 명에게만 허락된 시야" },
    { icon: Gauge, label: "7,000m 인증 잠항" },
    { icon: Sparkles, label: "한 번뿐인 항로" },
  ]
  return (
    <section aria-labelledby="descent-title" className="relative overflow-hidden bg-[#041524] px-5 py-28 sm:px-8 lg:px-14 lg:py-40">
      <div className="absolute left-1/2 top-0 h-72 w-px bg-cyan-200/25" />
      <div className="mx-auto max-w-[1500px]">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-[10px] font-semibold tracking-[0.18em] text-cyan-200/70">빛이 사라지는 경계 아래</span>
          <h2 id="descent-title" className="text-balance mt-7 text-[clamp(2rem,5vw,4.6rem)] font-semibold text-white">
            바다는 깊어질수록 더 조용해지고,<br className="hidden md:block" /> 더 많은 이야기를 드러냅니다.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-[1.8] text-slate-300/70 sm:text-base">
            PELAGIA의 여정은 관광이 아니라 관찰입니다. 해양 생태를 방해하지 않는 속도로,
            훈련된 파일럿과 함께 각 수심의 고유한 풍경에 머뭅니다.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl border-y border-white/10 sm:grid-cols-3">
          {notes.map(({ icon: Icon, label }, index) => (
            <div key={label} className={`flex items-center justify-center gap-3 px-4 py-5 text-xs font-medium text-white/66 ${index < 2 ? "sm:border-r sm:border-white/10" : ""}`}>
              <Icon aria-hidden="true" className="h-4 w-4 text-cyan-300" /> {label}
            </div>
          ))}
        </div>
        <ArrowDown aria-hidden="true" className="mx-auto mt-16 h-5 w-5 text-white/35" />
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#020a12] text-white">
      <a href="#main-content" className="fixed left-4 top-3 z-[100] -translate-y-20 bg-cyan-200 px-4 py-2 text-sm font-semibold text-slate-950 transition-transform focus:translate-y-0">
        본문으로 바로가기
      </a>
      <Header />
      <DepthGauge />
      <main id="main-content">
        <Hero />
        <DescentInterlude />
        <ExpeditionCourses />
        <DepthExplorer />
        <Submersible />
        <BookingSection />
        <JournalGallery />
        <SafetyFlow />
      </main>
      <Footer />
    </div>
  )
}
