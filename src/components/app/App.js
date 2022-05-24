import classes from './App.module.scss';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTickets,
  getFullTickets,
} from '../../services/reducers/ticketsReducer';
import MyTabs from '../mytabs/mytabs';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import Item from '../item/item';
import FilterBox from '../filters/filters';
import { getMoreTickets } from '../../services/reducers/ticketsReducer';

function App() {
  const dispatch = useDispatch();
  const fetchFullTickets = () => {
    return function (dispatch) {
      fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${sessionID}`
      )
        .then((response) => response.json())
        .then((json) => dispatch(getFullTickets(json)));
    };
  };

  const ticketsStatus = useSelector((state) => state.tickets.status);
  const tickets = useSelector((state) => state.tickets.tickets);
  const ticketsCount = useSelector((state) => state.tickets.ticketsCount);
  const sessionID = useSelector((state) => state.tickets.sessionID);
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
      return () => clearInterval(time);
    }
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
      <header className={classes['header']}></header>
      <div className={classes['content']}>
        <FilterBox />
        <div className={classes['menu']}>
          <MyTabs />
          <div className="item-list">
            {spinner}
            {items}
          </div>
          <button
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
