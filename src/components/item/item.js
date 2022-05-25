/* eslint-disable dot-notation */
import { useSelector } from 'react-redux';

import {
  convertMinsToHrsMins,
  getTime,
  prettify,
  keysSelectedFilter,
  filterTickets,
} from '../../services/helper';

import classes from './item.module.scss';

function Item(tickets) {
  const sort = useSelector((state) => state.sort);
  const filters = useSelector((state) => state.filters);
  const ticketsCount = useSelector((state) => state.tickets.ticketsCount);
  // eslint-disable-next-line react/destructuring-assignment
  const res = [...tickets.tickets];
  if (sort.sort[0] === 'price') {
    res.sort((a, b) => a.price - b.price);
  }

  if (sort.sort[0] === 'duration') {
    res.sort(
      (a, b) =>
        a.segments[0].duration +
        a.segments[1].duration -
        (b.segments[0].duration + b.segments[1].duration)
    );
  }

  if (sort.sort[0] === 'optimal') {
    res.sort(
      (a, b) =>
        a.segments[0].duration +
        a.segments[1].duration -
        (b.segments[0].duration + b.segments[1].duration)
    );
  }

  const selectedFilter = keysSelectedFilter(filters);
  const result = filterTickets(res, selectedFilter);
  const arr = result.slice(0, ticketsCount);
  if (sort.sort[0] === 'optimal') {
    arr.sort((a, b) => a.price - b.price);
  }
  const noItems =
    result.length === 0 ? (
      <span>Рейсов, подходящих под заданные фильтры, не найдено</span>
    ) : null;
  return (
    <ul className={classes['items']}>
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
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} className={classes['item-wrapper']}>
            <div className={classes['item-title']}>
              <span className={classes['price']}>{priceOne} Р</span>
              <img
                className={classes['company']}
                src={`//pics.avs.io/99/36/${carrier}.png`}
                alt="avia company"
              />
            </div>
            <div className={classes['flight']}>
              <div className={classes['flight-title']}>
                <span>
                  {origin} – {destination}
                </span>
                <span>В ПУТИ</span>
                <span>
                  {stops.length ? stops.length : null}{' '}
                  {stops.length === 1 ? 'ПЕРЕСАДКА' : 'ПЕРЕСАДКИ'}
                </span>
              </div>
              <div className={classes['flight-content']}>
                <span>
                  {timeStart} - {timeFinish}
                </span>
                <span>{durationHours}</span>
                <span>{stops.length ? stops.join(' ') : 'НЕТ'}</span>
              </div>
            </div>
            <div className={classes['flight']}>
              <div className={classes['flight-title']}>
                <span>
                  {originBack} – {destinationBack}
                </span>
                <span>В ПУТИ</span>
                <span>
                  {stopsBack.length ? stopsBack.length : null}{' '}
                  {stopsBack.length === 1 ? 'ПЕРЕСАДКА' : 'ПЕРЕСАДКИ'}
                </span>
              </div>
              <div className={classes['flight-content']}>
                <span>
                  {timeStartBack} - {timeFinishBack}
                </span>
                <span>{durationHoursBack}</span>
                <span>{stopsBack.length ? stopsBack.join(' ') : 'НЕТ'}</span>
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
