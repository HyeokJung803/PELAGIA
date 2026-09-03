import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const records = [
  {
    name: "김서윤",
    place: "제주 산호 정원",
    depth: "수심 96m",
    image: "/images/course-jeju.jpg",
    alt: "잠수정 전망창 너머로 촬영한 제주 연산호와 물고기 떼",
    quote: "창 하나를 사이에 두고 바다의 호흡을 처음 들었습니다.",
    layout: "lg:col-span-7 lg:row-span-2",
  },
  {
    name: "오진우",
    place: "태평양 침몰선 탐사",
    depth: "수심 810m",
    image: "/images/course-wreck.jpg",
    alt: "탐조등이 비추는 태평양의 오래된 난파선 갑판",
    quote: "녹슨 선체가 거대한 생명의 도시가 된 장면을 잊지 못합니다.",
    layout: "lg:col-span-5",
  },
  {
    name: "한유라",
    place: "마리아나 심해 원정",
    depth: "수심 5,840m",
    image: "/images/journal-jelly.jpg",
    alt: "칠흑 같은 심해에서 푸른빛을 내는 해파리",
    quote: "완전한 어둠에서 나타난 작은 빛은 별보다 선명했습니다.",
    layout: "lg:col-span-5",
  },
  {
    name: "박도현",
    place: "태평양 블루 홀",
    depth: "수심 420m",
    image: "/images/pelagia-hero.jpg",
    alt: "짙은 코발트빛 해저 협곡 사이를 지나는 잠수정",
    quote: "내려갈수록 고요는 커지고, 시간은 오히려 느려졌습니다.",
    layout: "lg:col-span-12 lg:h-[22rem]",
  },
] as const;

export function JournalGallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (active !== null && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [active]);

  const closeLightbox = () => {
    const previous = active;
    dialogRef.current?.close();
    setActive(null);
    requestAnimationFrame(() => {
      if (previous !== null) triggerRefs.current[previous]?.focus();
    });
  };

  const move = (direction: -1 | 1) => {
    setActive((current) =>
      current === null ? 0 : (current + direction + records.length) % records.length,
    );
  };

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="overflow-hidden bg-[#020914] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.18em] text-violet-300">탐험 기록</p>
            <h2
              id="journal-heading"
              className="text-[clamp(2.5rem,6vw,5.6rem)] font-semibold leading-[1.2] tracking-[-0.035em]"
            >
              심해에서 온 기록
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-400 sm:text-base">
            승객이 직접 남긴 네 번의 하강. 이미지를 선택하면 탐험의 순간을 크게 볼 수 있습니다.
          </p>
        </header>

        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:auto-rows-[14rem] lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {records.map((record, index) => (
            <motion.article
              key={record.image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className={`min-w-[84vw] snap-center lg:min-w-0 ${record.layout}`}
            >
              <button
                ref={(node) => {
                  triggerRefs.current[index] = node;
                }}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`${record.name}의 ${record.place} 탐험 기록 크게 보기`}
                aria-haspopup="dialog"
                className="group relative h-[30rem] w-full overflow-hidden bg-[#071523] text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#020914] lg:h-full"
              >
                <img
                  src={record.image}
                  alt={record.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-[#010812]/20 transition-colors group-hover:bg-transparent" />
                <div className="absolute inset-x-0 bottom-0 bg-[#020914]/90 p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-4 text-[0.68rem] tracking-[0.13em] text-cyan-200">
                    <span>{record.place}</span>
                    <span>{record.depth}</span>
                  </div>
                  <p className="max-w-2xl text-base font-medium leading-7 text-white sm:text-lg">
                    “{record.quote}”
                  </p>
                  <p className="mt-3 text-xs text-slate-400">탐험 참가자 {record.name}</p>
                </div>
              </button>
            </motion.article>
          ))}
        </div>

        <p className="mt-5 flex items-center gap-3 text-xs text-slate-500 lg:hidden">
          <ArrowRight size={15} aria-hidden="true" /> 옆으로 밀어 더 많은 기록 보기
        </p>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="탐험 기록 이미지 확대 보기"
        aria-modal="true"
        onCancel={(event) => {
          event.preventDefault();
          closeLightbox();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-[#01060d]/96 p-4 text-white backdrop:bg-[#01060d]/96 sm:p-8"
      >
        {active !== null && (
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-center">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs tracking-[0.16em] text-cyan-200">
                {String(active + 1).padStart(2, "0")} / {String(records.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                autoFocus
                onClick={closeLightbox}
                aria-label="확대 이미지 닫기"
                className="grid size-11 place-items-center border border-white/30 outline-none transition-colors hover:border-cyan-200 hover:text-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <X size={21} aria-hidden="true" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 bg-black">
              <img
                src={records[active].image}
                alt={records[active].alt}
                decoding="async"
                className="h-full w-full object-contain"
              />
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="이전 탐험 기록"
                className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/30 bg-black/60 outline-none hover:border-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-300 sm:left-4"
              >
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="다음 탐험 기록"
                className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/30 bg-black/60 outline-none hover:border-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-300 sm:right-4"
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>

            <div aria-live="polite" className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-sm text-cyan-200">{records[active].place} · {records[active].depth}</p>
                <p className="mt-2 text-lg font-medium leading-7 sm:text-xl">“{records[active].quote}”</p>
              </div>
              <p className="text-xs text-slate-400">탐험 참가자 {records[active].name}</p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

export default JournalGallery;
