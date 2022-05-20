export function getTime(date) {
  const Data = new Date(date);
  const Hour =
    Data.getHours().toString().length < 2
      ? "0" + Data.getHours()
      : Data.getHours();
  const Minutes =
    Data.getMinutes().toString().length < 2
      ? "0" + Data.getMinutes()
      : Data.getMinutes();
  return `${Hour}:${Minutes}`;
}

export const convertMinsToHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return `${h}:${m}`;
};

export function prettify(num) {
  var n = num.toString();
  var separator = " ";
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
}
