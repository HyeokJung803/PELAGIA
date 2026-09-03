import { Instagram, Mail, Menu, Waves, X, Youtube } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useState } from "react"

const links = [
  ["탐험 코스", "#courses"],
  ["심해 체험", "#depth-lab"],
  ["NEREID X1", "#nereid"],
  ["탐험 기록", "#journal"],
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 60))

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${scrolled || open ? "border-white/10 bg-[#020a12]/90 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
      <nav aria-label="주요 메뉴" className="mx-auto flex h-18 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-14">
        <a href="#intro" aria-label="PELAGIA 홈" className="flex items-center gap-2.5 text-white">
          <Waves aria-hidden="true" className="h-[18px] w-[18px] text-cyan-300" strokeWidth={1.7} />
          <span className="text-sm font-semibold tracking-[0.24em]">PELAGIA</span>
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-xs font-medium text-white/66 transition-colors hover:text-cyan-200">
              {label}
            </a>
          ))}
          <a href="#booking" className="border border-white/28 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-cyan-200 hover:text-cyan-100">
            탐험 예약하기
          </a>
        </div>
        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center text-white lg:hidden"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#020a12] lg:hidden"
          >
            <div className="grid px-5 py-5 sm:px-8">
              {links.concat([["탐험 예약", "#booking"]]).map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/8 py-4 text-base font-medium text-white/82 last:border-0">
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="noise relative overflow-hidden bg-[#000307] px-5 pt-28 pb-10 sm:px-8 lg:px-14 lg:pt-40">
      <div className="water-rays pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-25" />
      <div className="relative mx-auto max-w-[1500px]">
        <span className="section-label">하강은 여기에서 시작됩니다</span>
        <div className="mt-8 grid items-end gap-12 border-b border-white/12 pb-20 lg:grid-cols-[1fr_auto]">
          <h2 className="text-balance max-w-5xl text-[clamp(2.5rem,7vw,6.8rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-white">
            당신은 얼마나 깊이<br className="hidden sm:block" /> 내려갈 준비가 되었나요?
          </h2>
          <a href="#booking" className="inline-flex min-h-14 items-center justify-center bg-cyan-200 px-7 text-sm font-semibold text-[#00131c] transition-colors hover:bg-white">
            탐험 예약하기
          </a>
        </div>

        <div className="grid gap-10 pt-10 text-xs text-white/48 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-2.5 text-white">
              <Waves aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              <span className="font-semibold tracking-[0.22em]">PELAGIA</span>
            </div>
            <p>본 사이트는 포트폴리오를 위해 제작된 가상의 서비스입니다.</p>
            <p className="mt-1">© 2026 PELAGIA 심해 탐험.</p>
          </div>
          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex gap-5">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/58 hover:text-cyan-200"><Instagram className="h-5 w-5" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="text-white/58 hover:text-cyan-200"><Youtube className="h-5 w-5" /></a>
              <a href="mailto:hello@pelagia.example" aria-label="이메일" className="text-white/58 hover:text-cyan-200"><Mail className="h-5 w-5" /></a>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href="#safety" className="hover:text-white">안전 규정</a>
              <a href="#booking" className="hover:text-white">예약 안내</a>
              <a href="#intro" className="hover:text-white">회사 소개</a>
              <a href="mailto:hello@pelagia.example" className="hover:text-white">문의</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
