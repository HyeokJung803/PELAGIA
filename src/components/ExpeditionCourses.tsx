import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Eye, Thermometer, Waves } from "lucide-react";
import { useState } from "react";

const courses = [
  {
    id: "jeju",
    number: "01",
    title: "제주 산호 정원",
    subtitle: "빛과 해류가 빚은 남쪽 바다의 숲",
    image: "/images/course-jeju.jpg",
    alt: "제주 바다 아래 펼쳐진 형형색색의 연산호 군락",
    depth: "120m",
    duration: "3시간",
    price: "890,000원",
    difficulty: "입문",
    temperature: "16–21°C",
    creatures: ["큰수지맨드라미", "자리돔", "큰돌고래"],
    description:
      "빛이 남아 있는 마지막 수심을 따라 제주 남단의 연산호 군락을 유영합니다. 첫 심해 탐험자를 위해 해양 생태 해설과 잠수정 적응 세션을 포함합니다.",
  },
  {
    id: "wreck",
    number: "02",
    title: "태평양 침몰선 탐사",
    subtitle: "시간이 멈춘 선체를 따라가는 기록 항해",
    image: "/images/course-wreck.jpg",
    alt: "푸른 심해에 가라앉아 해양 생물의 서식지가 된 난파선",
    depth: "850m",
    duration: "6시간",
    price: "2,400,000원",
    difficulty: "중급",
    temperature: "4–7°C",
    creatures: ["유리오징어", "육방해면", "심해상어"],
    description:
      "태평양 해저에 잠든 탐사선의 항해 기록을 추적합니다. 선체 외곽과 기관실 진입부를 천천히 선회하며, 난파선이 새로운 생태계가 되는 과정을 관찰합니다.",
  },
  {
    id: "mariana",
    number: "03",
    title: "마리아나 심해 원정",
    subtitle: "지구에서 가장 고요한 경계로",
    image: "/images/course-mariana.jpg",
    alt: "마리아나 해구의 사면을 비추며 잠항하는 심해 잠수정",
    depth: "6,000m",
    duration: "3일",
    price: "18,000,000원",
    difficulty: "원정",
    temperature: "1–2°C",
    creatures: ["초롱아귀", "심해해파리", "거대 단각류"],
    description:
      "모선에서 이틀간 적응한 뒤, 단 한 번의 긴 하강으로 해구의 사면에 닿습니다. 생물 발광과 지각 활동을 기록하는 PELAGIA의 가장 깊고 희소한 원정입니다.",
  },
] as const;

export function ExpeditionCourses() {
  const [selected, setSelected] = useState<string | null>(courses[0].id);

  return (
    <section
      id="courses"
      aria-labelledby="courses-heading"
      className="relative overflow-hidden bg-[#061421] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-16 grid gap-6 border-b border-white/20 pb-10 md:grid-cols-12 md:items-end lg:mb-24">
          <div className="md:col-span-8">
            <p className="mb-5 text-xs font-medium tracking-[0.22em] text-cyan-300">
              대표 탐험 코스
            </p>
            <h2
              id="courses-heading"
              className="max-w-3xl text-[clamp(2.5rem,6vw,5.8rem)] font-semibold leading-[1.2] tracking-[-0.035em]"
            >
              깊이마다 달라지는 바다의 표정
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300 md:col-span-4 md:justify-self-end md:text-base">
            익숙한 연안에서 인간이 거의 닿지 않은 해구까지. 세 개의 항로는 서로 다른
            밀도와 시간으로 바다를 보여줍니다.
          </p>
        </header>

        <div>
          {courses.map((course, index) => {
            const isSelected = selected === course.id;
            const detailId = `course-detail-${course.id}`;

            return (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-white/15 py-12 lg:py-20"
              >
                <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
                  <div
                    className={`relative overflow-hidden bg-[#020a12] lg:col-span-8 ${
                      index % 2 ? "lg:order-2" : ""
                    }`}
                  >
                    <motion.img
                      src={course.image}
                      alt={course.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] h-full w-full object-cover sm:aspect-[16/9] lg:aspect-[3/2]"
                      whileHover={{ scale: 1.025 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[#03101a]/20" />
                    <span className="absolute left-4 top-4 border border-white/35 bg-[#020a12]/70 px-3 py-2 text-xs tracking-[0.2em] text-white sm:left-6 sm:top-6">
                      탐험 {course.number}
                    </span>
                    <p className="absolute bottom-0 left-0 bg-[#03101a]/90 px-4 py-3 text-xs tracking-[0.14em] text-cyan-200 sm:px-6">
                      최대 수심 {course.depth}
                    </p>
                  </div>

                  <div className={`lg:col-span-4 ${index % 2 ? "lg:order-1" : ""}`}>
                    <p className="mb-3 text-sm text-cyan-300">{course.subtitle}</p>
                    <h3 className="text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                      {course.title}
                    </h3>

                    <dl className="mt-8 grid grid-cols-2 border-y border-white/15 sm:grid-cols-3">
                      <div className="py-5">
                        <dt className="text-[0.68rem] tracking-[0.12em] text-slate-500">최대 수심</dt>
                        <dd className="mt-2 text-sm font-medium sm:text-base">{course.depth}</dd>
                      </div>
                      <div className="border-l border-white/10 py-5 pl-4">
                        <dt className="text-[0.68rem] tracking-[0.12em] text-slate-500">탐험 일정</dt>
                        <dd className="mt-2 text-sm font-medium sm:text-base">{course.duration}</dd>
                      </div>
                      <div className="col-span-2 border-t border-white/10 py-5 sm:col-span-1 sm:border-l sm:border-t-0 sm:pl-4">
                        <dt className="text-[0.68rem] tracking-[0.12em] text-slate-500">1인 기준</dt>
                        <dd className="mt-2 text-sm font-medium sm:text-base">{course.price}</dd>
                      </div>
                    </dl>

                    <button
                      type="button"
                      aria-expanded={isSelected}
                      aria-controls={detailId}
                      onClick={() => setSelected(isSelected ? null : course.id)}
                      className="mt-7 flex w-full items-center justify-between border-b border-cyan-300/60 py-3 text-left text-sm font-medium text-cyan-100 outline-none transition-colors hover:border-cyan-200 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#061421]"
                    >
                      {isSelected ? "탐험 정보 닫기" : "탐험 정보 펼치기"}
                      <motion.span animate={{ rotate: isSelected ? 180 : 0 }} aria-hidden="true">
                        <ChevronDown size={18} />
                      </motion.span>
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.div
                      id={detailId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pt-9 md:grid-cols-12 lg:pt-12">
                        <p className="max-w-2xl text-base leading-8 text-slate-300 md:col-span-6 md:text-lg">
                          {course.description}
                        </p>
                        <dl className="grid grid-cols-2 gap-x-6 gap-y-7 md:col-span-6 md:grid-cols-3">
                          <div>
                            <dt className="flex items-center gap-2 text-xs text-slate-500">
                              <Waves size={15} aria-hidden="true" /> 난이도
                            </dt>
                            <dd className="mt-2 font-medium">{course.difficulty}</dd>
                          </div>
                          <div>
                            <dt className="flex items-center gap-2 text-xs text-slate-500">
                              <Thermometer size={15} aria-hidden="true" /> 수온
                            </dt>
                            <dd className="mt-2 font-medium">{course.temperature}</dd>
                          </div>
                          <div className="col-span-2 md:col-span-1">
                            <dt className="flex items-center gap-2 text-xs text-slate-500">
                              <Eye size={15} aria-hidden="true" /> 관찰 생물
                            </dt>
                            <dd className="mt-2 text-sm leading-7 text-slate-200">
                              {course.creatures.join(" · ")}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ExpeditionCourses;
