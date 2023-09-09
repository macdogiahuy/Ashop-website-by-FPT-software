export function shortenNumber(num: number) {
  const calc = (max: number, suffix: string) => `${Math.round((num * 10) / max) / 10}${suffix}`;

  if (num < 1000) {
    return `${num}`;
  }
  if (num < 1000000) {
    return calc(1000, "K");
  }
  return calc(1000000, "M");
}

const NUMBER_CHARS = "0123456789";
export function generateRandomSeriesNumbers(length: number) {
  let ret = "";
  for (let i = 0; i < length; i++) {
    ret += NUMBER_CHARS[Math.floor(Math.random() * NUMBER_CHARS.length)];
  }
  return ret;
}
