export const formatNumber = (number?: number | bigint) => {
  if (!number) return null;
  return new Intl.NumberFormat("ko").format(number);
};

const msPerMinute = 60 * 1000;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerWeek = msPerHour * 24;
const msPerMonth = msPerDay * 30;
const msPerYear = msPerDay * 365;

export const formatRelativeTime = (timestamp?: Date | string) => {
  if (!timestamp) return null;
  const current = Date.now();
  const elapsed = current - new Date(timestamp).getTime();

  const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  if (elapsed < msPerMinute) {
    return "방금 전";
  } else if (elapsed < msPerHour) {
    return rtf.format(-Math.floor(elapsed / msPerMinute), "minutes");
  } else if (elapsed < msPerDay) {
    return rtf.format(-Math.floor(elapsed / msPerHour), "hours");
  } else if (elapsed < msPerWeek) {
    return rtf.format(-Math.floor(elapsed / msPerDay), "days");
  } else {
    return new Date(timestamp).toLocaleDateString("ko");
  }
};
