import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Clock3, Gauge, ScanLine, Users } from "lucide-react";

const HOTSPOTS = [
  {
    id: "viewport",
    number: "01",
    label: "파노라마 전망창",
    eyebrow: "광학 돔",
    position: { left: "34%", top: "49%" },
    description: "광학 왜곡을 억제한 220mm 강화 아크릴 돔입니다. 여섯 명 모두가 같은 시야에서 360도 심해 풍경을 관찰할 수 있습니다.",
  },
  {
    id: "hull",
    number: "02",
    label: "티타늄 압력 선체",
    eyebrow: "압력 선체",
    position: { left: "51%", top: "40%" },
    description: "일체형 티타늄 구체가 7,000m 수심의 압력을 균일하게 분산합니다. 이중 센서가 선체 변형을 실시간으로 감시합니다.",
  },
  {
    id: "life-support",
    number: "03",
    label: "생명유지 모듈",
    eyebrow: "생명유지 계통",
    position: { left: "69%", top: "48%" },
    description: "산소 순환과 이산화탄소 제거를 독립 계통으로 운용합니다. 주 시스템과 분리된 72시간 비상 생명유지 장치를 갖췄습니다.",
  },
  {
    id: "thruster",
    number: "04",
    label: "벡터 추진기",
    eyebrow: "벡터 추진 계통",
    position: { left: "87%", top: "58%" },
    description: "저소음 전기 추진기 여덟 기가 난류 속에서도 정밀하게 자세를 유지합니다. 해양 생물의 행동을 방해하지 않도록 설계했습니다.",
  },
  {
    id: "ascent",
    number: "05",
    label: "비상 부상 장치",
    eyebrow: "비상 부상 계통",
    position: { left: "53%", top: "71%" },
    description: "전원과 무관하게 작동하는 중량 분리 장치입니다. 비상 시 양성 부력을 확보해 잠수정을 스스로 수면까지 상승시킵니다.",
  },
] as const;

const SPECS = [
  { label: "탑승 인원", value: "6명", Icon: Users },
  { label: "최대 잠항", value: "7,000m", Icon: Gauge },
  { label: "생명유지", value: "72시간", Icon: Clock3 },
  { label: "전망 범위", value: "360°", Icon: ScanLine },
] as const;

export function Submersible() {
  const [selectedId, setSelectedId] = useState<(typeof HOTSPOTS)[number]["id"]>("viewport");
  const reduceMotion = useReducedMotion();
  const selected = HOTSPOTS.find((hotspot) => hotspot.id === selectedId) ?? HOTSPOTS[0];

  return (
    <section
      id="nereid"
      aria-labelledby="nereid-title"
      className="relative overflow-hidden bg-[#02070c] text-white break-keep"
      style={{ fontFamily: '"Pretendard Variable", Pretendard, "Noto Sans KR", sans-serif' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(116,240,230,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(116,240,230,.22) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <header className="grid gap-8 border-b border-cyan-100/20 pb-9 lg:grid-cols-[1fr_22rem] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-cyan-200/65">
              <span className="h-px w-10 bg-cyan-200/50" />
              잠수정 시스템 / NX1—7000
            </div>
            <p className="mb-3 text-sm font-medium tracking-[-0.02em] text-cyan-100/70">차세대 유인 심해 잠수정</p>
            <h2 id="nereid-title" className="text-5xl font-semibold leading-none tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              NEREID X1
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 tracking-[-0.02em] text-white/55 sm:text-base">
            인간의 시야와 심해 사이에 놓인 가장 정교한 경계. NEREID X1은 안전을 타협하지 않으면서도 바다를 온전히 마주하도록 설계되었습니다.
          </p>
        </header>

        <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-10">
          <div>
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border border-cyan-100/15 bg-[#031019]/70 sm:aspect-[16/10]"
              role="group"
              aria-label="NEREID X1 주요 장치 선택"
            >
              <div className="absolute left-4 top-4 z-10 font-mono text-[9px] leading-5 tracking-[0.16em] text-cyan-100/35 sm:left-6 sm:top-5">
                <p>좌현 측면도</p>
                <p>축척 1:24</p>
              </div>
              <div className="absolute right-4 top-4 z-10 text-right font-mono text-[9px] leading-5 text-cyan-100/35 sm:right-6 sm:top-5">
                <p>설계 번호 7000—NX1—KR</p>
                <p>개정 04</p>
              </div>

              <svg viewBox="0 0 900 560" className="absolute inset-0 h-full w-full" role="img" aria-labelledby="nereid-diagram-title nereid-diagram-desc">
                <title id="nereid-diagram-title">NEREID X1 잠수정 측면 기술 도면</title>
                <desc id="nereid-diagram-desc">전망창, 압력 선체, 생명유지 모듈, 추진기, 비상 부상 장치 위치가 표시된 도면입니다.</desc>
                <defs>
                  <pattern id="nereid-minor-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0H0v20" fill="none" stroke="rgba(145,243,236,.055)" strokeWidth="1" />
                  </pattern>
                  <filter id="nereid-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <rect width="900" height="560" fill="url(#nereid-minor-grid)" />
                <g fill="none" stroke="#9cf8ee" strokeOpacity=".22" strokeWidth="1">
                  <path d="M62 280H838" strokeDasharray="5 8" />
                  <path d="M450 74V488" strokeDasharray="5 8" />
                  <path d="M165 429H735m-570-8v16m570-16v16" />
                  <path d="M165 447v25m570-25v25M165 460h570" />
                </g>
                <g fill="#9cf8ee" fillOpacity=".4" fontFamily="monospace" fontSize="10">
                  <text x="420" y="456">5,800mm</text>
                  <text x="70" y="272">C/L</text>
                </g>

                <motion.g
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1 }}
                  fill="none"
                  stroke="#94f6ed"
                  strokeWidth="2"
                >
                  <path d="M134 292c27-88 119-143 255-149h202c92 0 153 39 185 109l74 21-4 75-72 15c-33 49-93 73-183 73H379c-135-2-219-47-245-144Z" fill="#06161f" fillOpacity=".82" />
                  <path d="M168 279c15-73 91-115 204-121M169 311c27 68 101 104 211 107" strokeOpacity=".42" />
                  <path d="M705 195c18-30 48-51 88-63l-5 85M709 409c20 32 50 53 89 62l-8-85" />
                  <path d="M770 251h61v112h-60M791 259v96M813 263v88" />
                  <circle cx="388" cy="288" r="116" fill="#06141c" />
                  <circle cx="388" cy="288" r="96" fill="#0b3541" fillOpacity=".7" strokeWidth="4" />
                  <path d="M317 253c41-54 114-63 167-22" stroke="#dbfffb" strokeLinecap="round" strokeOpacity=".7" strokeWidth="7" />
                  <path d="M501 177v222M612 163v252M691 183v212" strokeOpacity=".22" />
                  <path d="M518 241h159v92H518zM543 258h42v57h-42zm64 0h45v57h-45" strokeOpacity=".55" />
                  <path d="M301 396c47 18 126 20 174 1l22 47H281Z" fill="#06161f" />
                  <path d="M548 436c8 30 31 45 66 47h61l-18-48" />
                  <path d="M201 223 137 194v59m62 100-63 34v-62" />
                  <circle cx="815" cy="307" r="20" strokeOpacity=".7" />
                  <circle cx="815" cy="307" r="8" fill="#94f6ed" fillOpacity=".22" />
                </motion.g>

                <motion.path
                  d="M132 292c27-88 119-143 255-149h202c92 0 153 39 185 109"
                  fill="none"
                  stroke="#d7fffb"
                  strokeWidth="2"
                  initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <circle cx="388" cy="288" r="105" fill="none" stroke="#72f7e6" strokeDasharray="2 12" strokeLinecap="round" opacity=".38" />
                <motion.circle
                  cx="388"
                  cy="288"
                  r="105"
                  fill="none"
                  stroke="#72f7e6"
                  strokeDasharray="70 590"
                  strokeWidth="2"
                  filter="url(#nereid-glow)"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  style={{ transformOrigin: "388px 288px" }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />
              </svg>

              {HOTSPOTS.map((hotspot) => {
                const isSelected = hotspot.id === selectedId;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => setSelectedId(hotspot.id)}
                    aria-label={`${hotspot.number} ${hotspot.label} 설명 보기`}
                    aria-pressed={isSelected}
                    aria-controls="nereid-hotspot-detail"
                    className={`absolute z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[10px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100 ${
                      isSelected
                        ? "border-cyan-100 bg-cyan-200 text-[#031016]"
                        : "border-cyan-100/55 bg-[#031018]/85 text-cyan-100 hover:border-cyan-100 hover:bg-cyan-200/15"
                    }`}
                    style={hotspot.position}
                  >
                    {!reduceMotion && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-[-5px] rounded-full border border-cyan-200/45"
                        animate={{ scale: [0.85, 1.35], opacity: [0.65, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: Number(hotspot.number) * 0.18 }}
                      />
                    )}
                    {hotspot.number}
                  </button>
                );
              })}

              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-[10px] tracking-[-0.02em] text-white/40 sm:bottom-5 sm:left-6">
                <span className="inline-block h-2 w-2 rounded-full border border-cyan-200" />
                번호를 선택해 세부 구조를 확인하세요
              </div>
            </div>

            <div className="mt-5 grid border-y border-white/15 sm:grid-cols-4">
              {SPECS.map(({ label, value, Icon }) => (
                <div key={label} className="flex items-center gap-3 border-b border-white/10 px-1 py-4 last:border-b-0 sm:block sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0">
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-300/70 sm:mb-5" />
                  <div>
                    <p className="text-[11px] text-white/40">{label}</p>
                    <p className="mt-0.5 font-mono text-lg text-cyan-50 sm:mt-1">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="border-l border-cyan-100/20 pl-5 sm:pl-7" aria-label="선택한 잠수정 장치 설명">
            <p className="mb-6 font-mono text-[10px] tracking-[0.15em] text-cyan-200/50">장치 목록</p>
            <ol className="space-y-1">
              {HOTSPOTS.map((hotspot) => (
                <li key={hotspot.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(hotspot.id)}
                    aria-pressed={hotspot.id === selectedId}
                    className={`grid w-full grid-cols-[2rem_1fr] border-b px-1 py-3 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-100 ${
                      hotspot.id === selectedId ? "border-cyan-200/60 text-cyan-50" : "border-white/10 text-white/40 hover:text-white/75"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-cyan-200/60">{hotspot.number}</span>
                    <span className="tracking-[-0.02em]">{hotspot.label}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div id="nereid-hotspot-detail" aria-live="polite" className="mt-9 min-h-52 border-t border-cyan-200/45 pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-mono text-[10px] tracking-[0.16em] text-violet-300/80">{selected.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em]">{selected.label}</h3>
                  <p className="mt-4 text-sm leading-7 tracking-[-0.02em] text-white/55">{selected.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Submersible;
