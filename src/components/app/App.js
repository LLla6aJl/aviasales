/* eslint-disable dot-notation */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import {
  fetchTickets,
  getFullTickets,
  getMoreTickets,
} from '../../services/reducers/ticketsReducer';
import FilterBox from '../filters/filters';
import Item from '../item/item';
import MyTabs from '../mytabs/mytabs';

import classes from './App.module.scss';

import 'antd/dist/antd.min.css';

function App() {
  const dispatch = useDispatch();
  const sessionID = useSelector((state) => state.tickets.sessionID);
  const ticketsStatus = useSelector((state) => state.tickets.status);
  const tickets = useSelector((state) => state.tickets.tickets);
  const ticketsCount = useSelector((state) => state.tickets.ticketsCount);

  const fetchFullTickets = () =>
    // eslint-disable-next-line no-shadow
    function (dispatch) {
      fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${sessionID}`
      )
        .then((response) => response.json())
        .then((json) => dispatch(getFullTickets(json)));
    };

  const stopFetch = useSelector((state) => state.tickets.stopFetch);
  useEffect(() => {
    if (ticketsStatus === 'idle') {
      dispatch(fetchTickets());
    }
  }, [ticketsStatus, dispatch]);

  useEffect(() => {
    let time;
    if (!stopFetch) {
      time = setInterval(() => {
        dispatch(fetchFullTickets());
      }, 1000);
    }
    return () => clearInterval(time);
  }, [stopFetch, dispatch]);

  const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
  const spinner = !stopFetch ? (
    <Spin indicator={antIcon}>Загрузка всех билетов</Spin>
  ) : null;
  const items =
    tickets.length > 1 ? (
      <Item tickets={tickets} />
    ) : (
      <Spin indicator={antIcon} />
    );
  return (
    <div className={classes['wrapper']}>
      <header className={classes['header']} />
      <div className={classes['content']}>
        <FilterBox />
        <div className={classes['menu']}>
          <MyTabs />
          <div className="item-list">
            {spinner}
            {items}
          </div>
          <button
            type="button"
            className={classes['getTickets']}
            onClick={() => dispatch(getMoreTickets(ticketsCount + 5))}
          >
            ЗАГРУЗИТЬ ЕЩЕ 5 БИЛЕТОВ
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
