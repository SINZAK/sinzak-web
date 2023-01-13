export const category = {
  painting: "회화일반",
  orient: "동양화",
  sculpture: "조소",
  print: "판화",
  craft: "공예",
  other: "기타",
  portrait: "초상화",
  illustration: "일러스트",
  logo: "로고/브랜딩",
  poster: "포스터/배너/간판",
  design: "앱/웹 디자인",
  editorial: "인쇄물",
  label: "패키지/라벨",
} as const;

export type Category = keyof typeof category;

export const getCategoryText = (cate?: string) => {
  if (!cate) return null;
  return (category as any)[cate] || null;
};
