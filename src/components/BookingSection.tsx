import {
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Minus,
  Microscope,
  Plus,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const courses = [
  {
    id: "jeju",
    name: "제주 산호 정원",
    depth: "최대 120m",
    duration: "3시간",
    price: 890_000,
  },
  {
    id: "pacific",
    name: "태평양 침몰선 탐사",
    depth: "최대 850m",
    duration: "6시간",
    price: 2_400_000,
  },
  {
    id: "mariana",
    name: "마리아나 심해 원정",
    depth: "최대 6,000m",
    duration: "3일",
    price: 18_000_000,
  },
] as const;

const addOns = [
  {
    id: "photography",
    name: "수중 촬영",
    description: "전문 촬영 장비와 원본 사진 제공",
    price: 450_000,
    Icon: Camera,
  },
  {
    id: "scientist",
    name: "전문 해양학자 동행",
    description: "탐사 전 브리핑과 선상 해설 포함",
    price: 1_800_000,
    Icon: Microscope,
  },
  {
    id: "film",
    name: "기념 영상 제작",
    description: "탐험 기록을 4분 분량으로 편집",
    price: 800_000,
    Icon: Video,
  },
] as const;

type CourseId = (typeof courses)[number]["id"];
type AddOnId = (typeof addOns)[number]["id"];

type BookingReceipt = {
  requestNumber: string;
  courseName: string;
  date: string;
  people: number;
  options: string[];
  total: number;
};

const wonFormatter = new Intl.NumberFormat("ko-KR");
const dateFormatter = new Intl.DateTimeFormat("ko-KR", { dateStyle: "long" });

function formatWon(value: number) {
  return `${wonFormatter.format(value)}원`;
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T12:00:00`));
}

function tomorrowValue() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function BookingSection() {
  const minimumDate = useMemo(tomorrowValue, []);
  const firstCourseRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [courseId, setCourseId] = useState<CourseId | "">("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnId[]>([]);
  const [errors, setErrors] = useState<{ course?: string; date?: string }>({});
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const selectedCourse = courses.find((course) => course.id === courseId);
  const optionTotal = addOns
    .filter((option) => selectedAddOns.includes(option.id))
    .reduce((sum, option) => sum + option.price, 0);
  const total = (selectedCourse?.price ?? 0) * people + optionTotal;

  function selectCourse(id: CourseId) {
    setCourseId(id);
    setErrors((current) => ({ ...current, course: undefined }));
  }

  function toggleAddOn(id: AddOnId) {
    setSelectedAddOns((current) =>
      current.includes(id)
        ? current.filter((selected) => selected !== id)
        : [...current, id],
    );
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = {
      ...(!selectedCourse && { course: "탐험 코스를 선택해 주세요." }),
      ...(!date
        ? { date: "희망 날짜를 선택해 주세요." }
        : date < minimumDate
          ? { date: "내일 이후의 날짜를 선택해 주세요." }
          : {}),
    };

    setErrors(nextErrors);
    if (nextErrors.course) {
      firstCourseRef.current?.focus();
      return;
    }
    if (nextErrors.date) {
      dateRef.current?.focus();
      return;
    }
    if (!selectedCourse) return;

    setReceipt({
      requestNumber: `PLG-${Date.now().toString().slice(-8)}`,
      courseName: selectedCourse.name,
      date,
      people,
      options: addOns
        .filter((option) => selectedAddOns.includes(option.id))
        .map((option) => option.name),
      total,
    });
    setDialogOpen(true);
  }

  return (
    <section
      id="booking"
      aria-labelledby="reservation-title"
      className="relative overflow-hidden bg-[#020811] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#64f4ff]/30"
      />
      <div className="mx-auto max-w-[1440px]">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-14 grid gap-6 border-b border-white/12 pb-10 lg:grid-cols-12 lg:items-end lg:pb-14"
        >
          <div className="lg:col-span-8">
            <p className="mb-5 text-xs font-medium tracking-[0.18em] text-[#64f4ff]">
              탐험 예약
            </p>
            <h2
              id="reservation-title"
              className="max-w-4xl text-[clamp(2.5rem,6vw,5.6rem)] font-semibold leading-[1.2] tracking-[-0.035em]"
            >
              미지의 바다를 향한
              <br />첫 좌표를 정하세요.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 tracking-[-0.02em] text-white/55 lg:col-span-4 lg:justify-self-end lg:text-base lg:leading-8">
            예약 요청 후 전담 익스페디션 디렉터가 24시간 안에 연락드립니다.
            결제는 일정과 건강 확인이 완료된 뒤 별도로 진행됩니다.
          </p>
        </motion.header>

        <form
          noValidate
          onSubmit={submitBooking}
          className="grid gap-14 lg:grid-cols-12 lg:gap-12"
        >
          <div className="space-y-16 lg:col-span-8">
            <fieldset aria-describedby={errors.course ? "course-error" : undefined}>
              <legend className="mb-6 flex items-center gap-4 text-lg font-semibold tracking-[-0.03em]">
                <span className="font-normal text-[#64f4ff]">01</span>
                탐험 코스
              </legend>
              <div className="border-y border-white/15">
                {courses.map((course, index) => {
                  const checked = course.id === courseId;
                  return (
                    <label
                      key={course.id}
                      className={`group relative grid cursor-pointer gap-4 border-b border-white/10 px-1 py-6 transition-colors last:border-b-0 focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#64f4ff] sm:grid-cols-[2rem_1fr_auto] sm:items-center sm:px-4 ${checked ? "bg-[#64f4ff]/[0.06]" : "hover:bg-white/[0.025]"}`}
                    >
                      <input
                        ref={index === 0 ? firstCourseRef : undefined}
                        type="radio"
                        name="course"
                        value={course.id}
                        checked={checked}
                        onChange={() => selectCourse(course.id)}
                        className="sr-only"
                        aria-invalid={Boolean(errors.course)}
                      />
                      <span className="text-xs tabular-nums text-white/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="flex items-center gap-3 text-lg font-medium tracking-[-0.03em] sm:text-xl">
                          {course.name}
                          <Check
                            className={`size-4 text-[#64f4ff] transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="mt-2 block text-xs tracking-[-0.02em] text-white/45 sm:text-sm">
                          {course.depth} · {course.duration}
                        </span>
                      </span>
                      <span className="text-sm font-medium tabular-nums text-white/80 sm:text-base">
                        {formatWon(course.price)}
                        <span className="ml-1 text-xs font-normal text-white/35">/ 인</span>
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.course && (
                <p id="course-error" role="alert" className="mt-3 text-sm text-[#ff9dba]">
                  {errors.course}
                </p>
              )}
            </fieldset>

            <div className="grid gap-12 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="expedition-date"
                  className="mb-6 flex items-center gap-4 text-lg font-semibold tracking-[-0.03em]"
                >
                  <span className="font-normal text-[#64f4ff]">02</span>
                  희망 날짜
                </label>
                <div className="relative border-b border-white/20 pb-3 focus-within:border-[#64f4ff]">
                  <CalendarDays
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-1/2 size-5 -translate-y-1/2 text-white/40"
                  />
                  <input
                    ref={dateRef}
                    id="expedition-date"
                    type="date"
                    min={minimumDate}
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                      setErrors((current) => ({ ...current, date: undefined }));
                    }}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? "date-error" : "date-help"}
                    className="w-full bg-transparent py-3 pl-9 pr-2 text-base text-white outline-none [color-scheme:dark]"
                  />
                </div>
                <p
                  id={errors.date ? "date-error" : "date-help"}
                  role={errors.date ? "alert" : undefined}
                  className={`mt-3 text-sm ${errors.date ? "text-[#ff9dba]" : "text-white/35"}`}
                >
                  {errors.date ?? "기상에 따라 일정이 조정될 수 있습니다."}
                </p>
              </div>

              <div>
                <p className="mb-6 flex items-center gap-4 text-lg font-semibold tracking-[-0.03em]">
                  <span className="font-normal text-[#64f4ff]">03</span>
                  탐험 인원
                </p>
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <Users className="size-5 text-white/40" aria-hidden="true" />
                  <div className="flex items-center gap-5">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPeople((count) => Math.max(1, count - 1))}
                      disabled={people === 1}
                      aria-label="인원 한 명 줄이기"
                    >
                      <Minus className="size-4" aria-hidden="true" />
                    </Button>
                    <output
                      aria-live="polite"
                      className="min-w-12 text-center text-xl font-medium tabular-nums"
                    >
                      {people}명
                    </output>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPeople((count) => Math.min(6, count + 1))}
                      disabled={people === 6}
                      aria-label="인원 한 명 늘리기"
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/35">
                  NEREID X1은 최대 6명까지 탑승할 수 있습니다.
                </p>
              </div>
            </div>

            <fieldset>
              <legend className="mb-6 flex items-center gap-4 text-lg font-semibold tracking-[-0.03em]">
                <span className="font-normal text-[#64f4ff]">04</span>
                추가 옵션
              </legend>
              <div className="border-y border-white/15">
                {addOns.map(({ id, name, description, price, Icon }) => {
                  const checked = selectedAddOns.includes(id);
                  return (
                    <label
                      key={id}
                      className="grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 py-5 last:border-b-0 focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#64f4ff] sm:gap-6"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddOn(id)}
                        className="size-4 shrink-0 accent-[#64f4ff]"
                      />
                      <span className="flex min-w-0 items-center gap-4">
                        <Icon
                          className={`hidden size-5 shrink-0 sm:block ${checked ? "text-[#64f4ff]" : "text-white/35"}`}
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block text-sm font-medium tracking-[-0.02em] sm:text-base">
                            {name}
                          </span>
                          <span className="mt-1 hidden text-sm text-white/40 sm:block">
                            {description}
                          </span>
                        </span>
                      </span>
                      <span className="text-xs tabular-nums text-white/60 sm:text-sm">
                        + {formatWon(price)}
                      </span>
                    </label>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-white/35">옵션 가격은 예약 건당 적용됩니다.</p>
            </fieldset>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="border-l border-[#64f4ff]/35 bg-[#07121f]/65 p-6 sm:p-8 lg:sticky lg:top-24">
              <p className="mb-8 text-xs font-medium tracking-[0.16em] text-[#64f4ff]">
                예약 요약
              </p>
              <dl className="space-y-5 text-sm">
                <div className="flex items-start justify-between gap-5">
                  <dt className="text-white/40">코스</dt>
                  <dd className="max-w-[65%] text-right font-medium">
                    {selectedCourse?.name ?? "선택 전"}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-5">
                  <dt className="text-white/40">일정</dt>
                  <dd className="text-right font-medium">
                    {date ? formatDate(date) : "선택 전"}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-5">
                  <dt className="text-white/40">인원</dt>
                  <dd className="font-medium tabular-nums">{people}명</dd>
                </div>
                <div className="flex items-start justify-between gap-5">
                  <dt className="text-white/40">코스 금액</dt>
                  <dd className="font-medium tabular-nums">
                    {selectedCourse ? formatWon(selectedCourse.price * people) : "—"}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-5">
                  <dt className="text-white/40">추가 옵션</dt>
                  <dd className="font-medium tabular-nums">{formatWon(optionTotal)}</dd>
                </div>
              </dl>

              <div className="my-8 h-px bg-white/15" />

              <div className="mb-8 flex items-end justify-between gap-4">
                <span className="text-sm text-white/50">예상 총액</span>
                <strong
                  aria-live="polite"
                  className="text-2xl font-semibold tabular-nums tracking-[-0.04em] sm:text-3xl"
                >
                  {formatWon(total)}
                </strong>
              </div>

              <Button type="submit" className="w-full justify-between px-5">
                탐험 예약 요청
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
              <p className="mt-4 text-xs leading-5 text-white/35">
                이 요청은 결제가 아닙니다. 최종 일정과 금액은 전담 디렉터와
                상담 후 확정됩니다.
              </p>
            </div>
          </motion.aside>
        </form>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {receipt && (
          <DialogContent
            aria-labelledby="booking-success-title"
            aria-describedby="booking-success-description"
          >
            <DialogHeader>
              <CheckCircle2
                className="mb-5 size-10 text-[#64f4ff]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <DialogTitle id="booking-success-title">
                탐험 예약 요청이 접수되었습니다.
              </DialogTitle>
              <DialogDescription id="booking-success-description">
                전담 익스페디션 디렉터가 입력하신 일정의 운항 가능 여부를 확인한 뒤
                24시간 안에 연락드립니다.
              </DialogDescription>
            </DialogHeader>

            <dl className="my-7 divide-y divide-white/10 border-y border-white/15 text-sm">
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-white/40">요청 번호</dt>
                <dd className="font-medium tracking-[0.08em] text-[#8cf6ff]">
                  {receipt.requestNumber}
                </dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-white/40">탐험</dt>
                <dd className="text-right font-medium">{receipt.courseName}</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-white/40">출항 희망일</dt>
                <dd className="text-right font-medium">{formatDate(receipt.date)}</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-white/40">탑승 인원</dt>
                <dd className="font-medium">{receipt.people}명</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-white/40">추가 옵션</dt>
                <dd className="max-w-[65%] text-right font-medium">
                  {receipt.options.length ? receipt.options.join(", ") : "선택 없음"}
                </dd>
              </div>
              <div className="flex items-end justify-between gap-6 py-4">
                <dt className="text-white/40">예상 총액</dt>
                <dd className="text-xl font-semibold tabular-nums">
                  {formatWon(receipt.total)}
                </dd>
              </div>
            </dl>

            <DialogClose className="w-full">확인</DialogClose>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}

export default BookingSection;
