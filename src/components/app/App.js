import classes from "./App.module.scss";
import Filters from "../filters/filters";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets } from "../../services/reducers/ticketsReducer";
import MyTabs from "../mytabs/mytabs";
import "antd/dist/antd.min.css";
import Item from "../item/item";

function App() {
  const dispatch = useDispatch();

  const ticketsStatus = useSelector((state) => state.tickets.status);

  useEffect(() => {
    if (ticketsStatus === "idle") {
      dispatch(fetchTickets());
    }
  }, [ticketsStatus, dispatch]);

  const tickets = useSelector((state) => state.tickets.tickets);

  const items = tickets.length > 1 ? <Item tickets={tickets} /> : null;
  return (
    <div className={classes["wrapper"]}>
      <header className={classes["header"]}></header>
      <div className={classes["content"]}>
        <Filters />
        <div className={classes["menu"]}>
          <MyTabs />
          <div className="item-list">{items}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
