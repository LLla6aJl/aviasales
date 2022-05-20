import { configureStore } from "@reduxjs/toolkit";

import ticketsReducer from "./reducers/ticketsReducer";
import sortReducer from "./reducers/sortReducer";
import filtersReducer from "./reducers/filtersReducer";

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
    sort: sortReducer,
    filters: filtersReducer,
  },
});
