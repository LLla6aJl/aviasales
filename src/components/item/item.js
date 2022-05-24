import './item.scss';
import {
  convertMinsToHrsMins,
  getTime,
  prettify,
  keysSelectedFilter,
  filterTickets,
} from '../../services/helper';

import { useSelector } from 'react-redux';

function Item(tickets) {
  const sort = useSelector((state) => state.sort);
  const filters = useSelector((state) => state.filters);
  const ticketsCount = useSelector((state) => state.tickets.ticketsCount);
  let res = [...tickets.tickets];
  if (sort.sort[0] === 'price') {
    res.sort(function (a, b) {
      return a.price - b.price;
    });
  }

  if (sort.sort[0] === 'duration') {
    res.sort(function (a, b) {
      return (
        a.segments[0].duration +
        a.segments[1].duration -
        (b.segments[0].duration + b.segments[1].duration)
      );
    });
  }

  if (sort.sort[0] === 'optimal') {
    res.sort(function (a, b) {
      return (
        a.segments[0].duration +
        a.segments[1].duration -
        (b.segments[0].duration + b.segments[1].duration)
      );
    });
  }

  const selectedFilter = keysSelectedFilter(filters);
  let result = filterTickets(res, selectedFilter);
  let arr = result.slice(0, ticketsCount);
  if (sort.sort[0] === 'optimal') {
    arr.sort(function (a, b) {
      return a.price - b.price;
    });
  }
  const noItems =
    result.length === 0 ? (
      <span>Рейсов, подходящих под заданные фильтры, не найдено</span>
    ) : null;
  return (
    <ul className="items">
      {arr.map((item, index) => {
        const { price, carrier, segments } = item;
        const { origin, destination, date, duration, stops } = segments[0];
        const {
          origin: originBack,
          destination: destinationBack,
          date: dateBack,
          duration: durationBack,
          stops: stopsBack,
        } = segments[1];

        const timeStart = getTime(date);
        const timeFinish = getTime(
          new Date(Date.parse(date) + duration * 60000)
        );
        const durationHours = convertMinsToHrsMins(duration);

        const timeStartBack = getTime(dateBack);
        const timeFinishBack = getTime(
          new Date(Date.parse(dateBack) + durationBack * 60000)
        );
        const durationHoursBack = convertMinsToHrsMins(durationBack);
        const priceOne = prettify(price);
        return (
          <li key={index} className="item-wrapper">
            <div className="item-title">
              <span className="price">{priceOne} Р</span>
              <img
                className="company"
                src={`//pics.avs.io/99/36/${carrier}.png`}
                alt="avia company"
              ></img>
            </div>
            <div className="flight">
              <div className="flight-title">
                <span>
                  {origin} – {destination}
                </span>
                <span>В ПУТИ</span>
                <span>
                  {stops.length ? stops.length : null}{' '}
                  {stops.length === 1 ? `ПЕРЕСАДКА` : `ПЕРЕСАДКИ`}
                </span>
              </div>
              <div className="flight-content">
                <span>
                  {timeStart} - {timeFinish}
                </span>
                <span>{durationHours}</span>
                <span>{stops.length ? stops.join(' ') : `НЕТ`}</span>
              </div>
            </div>
            <div className="flight">
              <div className="flight-title">
                <span>
                  {originBack} – {destinationBack}
                </span>
                <span>В ПУТИ</span>
                <span>
                  {stopsBack.length ? stopsBack.length : null}{' '}
                  {stopsBack.length === 1 ? `ПЕРЕСАДКА` : `ПЕРЕСАДКИ`}
                </span>
              </div>
              <div className="flight-content">
                <span>
                  {timeStartBack} - {timeFinishBack}
                </span>
                <span>{durationHoursBack}</span>
                <span>{stopsBack.length ? stopsBack.join(' ') : `НЕТ`}</span>
              </div>
            </div>
          </li>
        );
      })}
      {noItems}
    </ul>
  );
}

export default Item;
