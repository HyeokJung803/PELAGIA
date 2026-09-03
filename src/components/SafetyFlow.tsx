import { motion } from "motion/react";
import { HeartPulse, LifeBuoy, Navigation, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const safetySteps: Array<{
  number: string;
  phase: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    number: "01",
    phase: "잠항 전",
    title: "전문 조종사",
    description: "국제 상업 잠수정 자격과 1,000시간 이상의 심해 운항 경력을 갖춘 전담 조종팀이 모든 항해를 책임집니다.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    phase: "잠항 중",
    title: "실시간 위치 추적",
    description: "모선 관제팀이 음향 비콘, 수심, 선체 상태를 초 단위로 확인하고 항로 이탈을 즉시 감지합니다.",
    icon: Navigation,
  },
  {
    number: "03",
    phase: "비상 대응",
    title: "비상 부상 장치",
    description: "주 전원과 무관한 기계식 밸러스트 해제 장치가 작동해 통신 두절 상황에서도 자동으로 수면에 복귀합니다.",
    icon: LifeBuoy,
  },
  {
    number: "04",
    phase: "귀환 후",
    title: "의료 지원 체계",
    description: "모선의 응급의학 전문 인력과 육상 고압산소치료센터가 귀환 완료까지 하나의 대응망으로 연결됩니다.",
    icon: HeartPulse,
  },
];

export function SafetyFlow() {
  return (
    <section
      id="safety"
      aria-labelledby="safety-heading"
      className="relative overflow-hidden bg-[#01050a] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="grid gap-7 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="mb-5 text-xs font-medium tracking-[0.18em] text-cyan-300">안전 절차</p>
            <h2
              id="safety-heading"
              className="max-w-4xl text-[clamp(2.5rem,6vw,5.7rem)] font-semibold leading-[1.2] tracking-[-0.035em]"
            >
              하강 전부터 귀환 후까지,<br className="hidden sm:block" /> 하나의 안전선
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-400 md:col-span-4 md:justify-self-end md:text-base">
            안전은 개별 장비의 목록이 아니라 끊기지 않는 절차입니다. 네 단계는 같은 관제 체계 안에서 동시에 작동합니다.
          </p>
        </header>

        <div className="relative mt-20 lg:mt-28">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 left-6 top-6 w-px origin-top bg-cyan-300/45 lg:hidden"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px origin-left bg-cyan-300/45 lg:block"
          />

          <ol className="relative grid gap-14 lg:grid-cols-4 lg:gap-8">
            {safetySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.14, duration: 0.55 }}
                  className="grid grid-cols-[3rem_1fr] gap-5 lg:block"
                >
                    <div className="relative z-10 grid size-12 place-items-center border border-cyan-200/60 bg-[#01050a] text-cyan-200 lg:mx-auto lg:size-14">
                    <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <div className="border-t border-white/15 pt-5 lg:mt-9 lg:pt-7">
                    <div className="flex items-center justify-between gap-4 text-[0.66rem] tracking-[0.16em]">
                      <span className="text-cyan-300">{step.phase}</span>
                      <span className="text-slate-600">{step.number}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-y border-white/15 py-5 text-xs tracking-[0.12em] text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:mt-28">
          <span>PELAGIA 운항 관제</span>
          <span className="flex items-center gap-2 text-cyan-200">
            <span className="size-2 bg-cyan-300" aria-hidden="true" /> 전 항로 안전 프로토콜 정상
          </span>
        </div>
      </div>
    </section>
  );
}

export default SafetyFlow;
