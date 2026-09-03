import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Gauge, MoveDown, Sun, Thermometer } from "lucide-react";

type CreatureId = "reef" | "squid" | "angler" | "jelly" | "unknown";

const CREATURES: Array<{
  depth: number;
  name: string;
  scientific: string;
  note: string;
  id: CreatureId;
}> = [
  {
    depth: 20,
    name: "산호와 열대어",
    scientific: "산호초 생태계",
    note: "햇빛이 닿는 마지막 정원. 산호 군락 사이로 자리돔과 나비고기가 흐릅니다.",
    id: "reef",
  },
  {
    depth: 200,
    name: "대왕오징어",
    scientific: "대왕오징어류",
    note: "해가 사라지는 박명대. 거대한 눈이 잠수정의 미세한 빛을 먼저 발견합니다.",
    id: "squid",
  },
  {
    depth: 1_000,
    name: "초롱아귀",
    scientific: "검은아귀과",
    note: "완전한 어둠 속에서 스스로 만든 빛으로 먹이를 부르는 작은 사냥꾼입니다.",
    id: "angler",
  },
  {
    depth: 3_000,
    name: "심해 해파리",
    scientific: "아톨라해파리",
    note: "고요한 심해를 떠다니며 원형의 생체 발광 신호를 천천히 내보냅니다.",
    id: "jelly",
  },
  {
    depth: 6_000,
    name: "미확인 심해 생물",
    scientific: "미분류 표본 PX-6000",
    note: "아직 이름 붙지 않은 움직임. PELAGIA의 관측 기록에 새롭게 등록될 가능성이 있습니다.",
    id: "unknown",
  },
];

const BUBBLES = [
  [9, 9, 6],
  [18, 57, 4],
  [31, 22, 8],
  [44, 73, 5],
  [59, 14, 3],
  [72, 65, 7],
  [84, 34, 4],
  [93, 81, 6],
] as const;

function CreatureSilhouette({ id }: { id: CreatureId }) {
  if (id === "reef") {
    return (
      <g>
        <path d="M520 330v-74m0 24-24-26m24 2 28-34m-7 108v-52m0 16 22-18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="8" />
        <path d="M430 226c24-17 54-14 73 4-19 18-49 22-73 5l-22 13 5-22-5-20 22 20Z" fill="currentColor" opacity=".8" />
        <circle cx="481" cy="230" r="3" fill="#03131f" />
      </g>
    );
  }
  if (id === "squid") {
    return (
      <g>
        <path d="M475 196c29 15 40 56 22 88-14 23-52 23-66 0-18-32-7-73 22-88l11-12 11 12Z" fill="currentColor" opacity=".75" />
        <path d="M442 278c-25 38 22 52-2 88m18-81c-8 42 32 48 13 86m10-88c15 38-18 54 9 80m5-86c32 31-5 57 29 75" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5" />
        <circle cx="450" cy="252" r="6" fill="#06131f" />
        <circle cx="478" cy="252" r="6" fill="#06131f" />
      </g>
    );
  }
  if (id === "angler") {
    return (
      <g>
        <path d="M405 277c31-52 111-60 151-3-38 64-119 58-151 3l-37 27 9-35-9-34 37 25Z" fill="currentColor" opacity=".78" />
        <path d="M478 235c-2-38 30-44 42-62" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="523" cy="169" r="10" fill="#7fffea" />
        <circle cx="523" cy="169" r="23" fill="#7fffea" opacity=".15" />
        <circle cx="520" cy="264" r="5" fill="#031018" />
        <path d="m487 296 8-12 8 13 8-12 7 10" fill="none" stroke="#031018" strokeWidth="3" />
      </g>
    );
  }
  if (id === "jelly") {
    return (
      <g>
        <path d="M424 260c0-60 81-87 121-39 11 13 17 29 17 46-41 18-94 17-138-7Z" fill="currentColor" opacity=".5" />
        <path d="M438 266c-9 54 33 55 13 108m35-103c-13 43 23 61 2 103m35-106c22 41-14 66 15 97m-76-96c25 46-22 66 9 100" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" opacity=".8" />
        <ellipse cx="493" cy="257" rx="68" ry="13" fill="none" stroke="#bca7ff" strokeWidth="3" opacity=".85" />
      </g>
    );
  }
  return (
    <g>
      <path d="M395 275c32-61 133-89 183-17-25 50-97 70-153 39l-55 23 23-42-25-37 56 20c-1 0-1 0-1 1" fill="currentColor" opacity=".55" />
      <path d="M456 229c10-31 30-45 48-54m-18 157c16 26 38 34 59 35" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" opacity=".65" />
      <circle cx="530" cy="254" r="5" fill="#d6c8ff" />
      <circle cx="530" cy="254" r="19" fill="#a88cff" opacity=".17" />
    </g>
  );
}

function SubmersibleMark({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.g
      animate={reduceMotion ? undefined : { y: [-4, 4, -4], x: [-2, 2, -2] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M116 196c20-30 59-45 104-45h56c49 0 86 14 112 45-24 34-63 50-112 50h-56c-47 0-84-16-104-50Z" fill="#071b29" stroke="#78f3e3" strokeWidth="2" />
      <path d="M179 157c15-35 37-48 69-48 27 0 49 13 62 43" fill="#071b29" stroke="#78f3e3" strokeWidth="2" />
      <path d="M385 185h35v23h-35M126 185 92 169v54l34-17" fill="#071b29" stroke="#78f3e3" strokeWidth="2" />
      <ellipse cx="247" cy="195" rx="47" ry="36" fill="#0d5368" stroke="#b9fff6" strokeWidth="3" />
      <path d="M218 181c18-15 45-17 63-3" fill="none" stroke="#d5fffa" strokeLinecap="round" strokeWidth="5" opacity=".75" />
      <circle cx="144" cy="199" r="5" fill="#8fffee" />
      <path d="M407 190h34m-34 13h47" stroke="#8fffee" strokeLinecap="round" strokeWidth="3" opacity=".5" />
    </motion.g>
  );
}

export function DepthExplorer() {
  const [depth, setDepth] = useState(20);
  const reduceMotion = useReducedMotion();

  const active = useMemo(() => {
    return [...CREATURES].reverse().find((creature) => depth >= creature.depth) ?? CREATURES[0];
  }, [depth]);

  const metrics = useMemo(() => {
    const pressure = 1 + depth / 10.1;
    const temperature = depth <= 200 ? 24 - depth * 0.05 : 14 - ((depth - 200) / 5_800) * 12;
    const sunlight = depth === 0 ? 100 : 100 * Math.exp(-depth / 90);
    return {
      pressure: pressure.toFixed(1),
      temperature: temperature.toFixed(1),
      sunlight: sunlight < 0.05 ? "0.0" : sunlight.toFixed(1),
    };
  }, [depth]);

  const descent = depth / 6_000;
  const background = `rgb(${Math.round(2 - descent * 2)}, ${Math.round(16 - descent * 12)}, ${Math.round(29 - descent * 21)})`;

  return (
    <section
      id="depth-lab"
      aria-labelledby="depth-explorer-title"
      className="relative isolate min-h-screen overflow-hidden border-y border-white/10 text-white transition-colors duration-700 break-keep"
      style={{
        backgroundColor: background,
        fontFamily: '"Pretendard Variable", Pretendard, "Noto Sans KR", sans-serif',
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-50"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(72,210,232,.28), transparent 70%)" }}
      />
      {BUBBLES.map(([left, top, size], index) => (
        <motion.span
          key={`${left}-${top}`}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full border border-cyan-100/25"
          style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
          animate={reduceMotion ? undefined : { y: [18, -70], opacity: [0, 0.5, 0] }}
          transition={{ duration: 8 + index, delay: index * 0.45, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-12 lg:py-28">
        <div className="min-w-0">
          <div className="mb-8 flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-cyan-200/80">
            <span className="h-px w-10 bg-cyan-200/60" />
            인터랙티브 잠항 / 03
          </div>
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-medium text-cyan-100/70">수심을 직접 선택해 보세요</p>
              <h2 id="depth-explorer-title" className="max-w-2xl text-4xl font-semibold leading-[1.22] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                어둠 속 생명의<br />좌표를 따라갑니다
              </h2>
            </div>
            <div className="shrink-0 text-left md:text-right">
              <output htmlFor="depth-control" aria-live="polite" className="font-mono text-5xl font-light tabular-nums text-cyan-100 sm:text-6xl">
                {depth.toLocaleString("ko-KR")}
              </output>
              <span className="ml-2 text-lg text-cyan-100/60">m</span>
              <p className="mt-1 text-xs tracking-[0.14em] text-white/45">현재 수심</p>
            </div>
          </div>

          <div className="relative min-h-[20rem] overflow-hidden border border-white/15 bg-black/10 sm:min-h-[30rem]">
            <svg
              viewBox="0 0 680 430"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={`수심 ${depth.toLocaleString("ko-KR")}미터에서 관측 중인 ${active.name}`}
            >
              <defs>
                <pattern id="depth-grid" width="42" height="42" patternUnits="userSpaceOnUse">
                  <path d="M42 0H0v42" fill="none" stroke="rgba(180,244,255,.08)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="680" height="430" fill="url(#depth-grid)" />
              <path d="M0 357c118-28 189 28 309 1 126-29 207 16 371-17v89H0Z" fill="rgba(1,6,13,.4)" />
              <SubmersibleMark reduceMotion={reduceMotion} />
              <AnimatePresence mode="wait">
                <motion.g
                  key={active.id}
                  className={active.id === "unknown" ? "text-violet-300" : "text-cyan-200"}
                  initial={reduceMotion ? false : { opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -25 }}
                  transition={{ duration: 0.6 }}
                >
                  <CreatureSilhouette id={active.id} />
                </motion.g>
              </AnimatePresence>
            </svg>

            <div className="absolute bottom-0 left-0 max-w-md border-r border-t border-white/15 bg-[#020b12]/80 p-5 backdrop-blur-sm sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                >
                  <p className="mb-1 font-mono text-[10px] tracking-[0.12em] text-cyan-200/60">{active.scientific} · {active.depth.toLocaleString("ko-KR")}m</p>
                  <h3 className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl">{active.name}</h3>
                  <p className="mt-2 text-sm leading-7 tracking-[-0.02em] text-white/60">{active.note}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute right-3 top-3 hidden h-[calc(100%-1.5rem)] w-16 sm:block" aria-hidden="true">
              <div className="absolute bottom-0 right-7 h-full w-px bg-white/20" />
              <motion.div
                className="absolute right-[22px] h-3 w-3 rounded-full border border-cyan-100 bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.8)]"
                animate={{ top: `calc(${descent * 100}% - 6px)` }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              />
              <span className="absolute right-0 top-0 font-mono text-[9px] text-white/35">0m</span>
              <span className="absolute bottom-0 right-0 font-mono text-[9px] text-white/35">6K</span>
            </div>
          </div>
        </div>

        <aside className="self-end border-l border-white/15 pl-5 sm:pl-7 lg:mb-0" aria-label="잠항 제어 및 환경 정보">
          <div className="mb-9">
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="depth-control" className="flex items-center gap-2 text-sm font-medium">
                <MoveDown aria-hidden="true" className="h-4 w-4 text-cyan-300" />
                잠항 수심
              </label>
              <span className="font-mono text-xs text-white/45">0—6,000m</span>
            </div>
            <input
              id="depth-control"
              type="range"
              min="0"
              max="6000"
              step="20"
              value={depth}
              onChange={(event) => setDepth(Number(event.target.value))}
              aria-valuetext={`${depth.toLocaleString("ko-KR")}미터`}
              aria-describedby="depth-help"
              className="h-1 w-full cursor-pointer appearance-none bg-white/20 accent-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-cyan-200"
            />
            <p id="depth-help" className="mt-3 text-xs leading-5 text-white/40">방향키로 20m씩 정밀하게 조절할 수 있습니다.</p>
          </div>

          <div className="border-y border-white/15">
            {[
              { label: "수압", value: `${metrics.pressure} atm`, Icon: Gauge },
              { label: "수온", value: `${metrics.temperature} °C`, Icon: Thermometer },
              { label: "햇빛 도달률", value: `${metrics.sunlight}%`, Icon: Sun },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="flex items-center justify-between border-b border-white/10 py-4 last:border-b-0">
                <span className="flex items-center gap-2 text-sm text-white/55"><Icon aria-hidden="true" className="h-4 w-4 text-cyan-200/70" />{label}</span>
                <span className="font-mono text-sm tabular-nums text-cyan-50">{value}</span>
              </div>
            ))}
          </div>

          <nav className="mt-8" aria-label="대표 수심으로 이동">
            <p className="mb-3 text-[10px] tracking-[0.15em] text-white/35">대표 관찰 수심</p>
            <div className="grid grid-cols-5 gap-1 lg:grid-cols-1">
              {CREATURES.map((creature) => (
                <button
                  key={creature.depth}
                  type="button"
                  onClick={() => setDepth(creature.depth)}
                  aria-pressed={active.id === creature.id}
                  className={`group flex min-h-12 items-center border-l px-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 lg:px-3 ${
                    active.id === creature.id ? "border-cyan-300 bg-cyan-300/10 text-white" : "border-white/15 text-white/45 hover:border-white/45 hover:text-white"
                  }`}
                >
                  <span className="w-full font-mono text-[10px] tabular-nums lg:w-16">{creature.depth >= 1_000 ? `${creature.depth / 1_000}K` : creature.depth} M</span>
                  <span className="hidden text-xs tracking-[-0.02em] lg:block">{creature.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>
      </div>
    </section>
  );
}

export default DepthExplorer;
