/* eslint-disable prefer-template */
export function getTime(date) {
  const Data = new Date(date);
  const Hour =
    Data.getHours().toString().length < 2
      ? '0' + Data.getHours()
      : Data.getHours();
  const Minutes =
    Data.getMinutes().toString().length < 2
      ? '0' + Data.getMinutes()
      : Data.getMinutes();
  return `${Hour}:${Minutes}`;
}

export const convertMinsToHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h}:${m}`;
};

export function prettify(num) {
  const n = num.toString();
  const separator = ' ';
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + separator);
}

export const keysSelectedFilter = (state) =>
  state.filter((i) => i.isChecked).map((i) => +i.id);

// eslint-disable-next-line no-shadow
export const filterTickets = (state, keysSelectedFilter) =>
  state.filter((i) => {
    const sum = i.segments[0].stops.length + i.segments[1].stops.length;
    return keysSelectedFilter.includes(sum);
  });

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
