import { configureStore } from '@reduxjs/toolkit';

import ticketsReducer from './reducers/ticketsReducer';
import sortReducer from './reducers/sortReducer';
import { reducer } from './reducers/filtersReducer';

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
    sort: sortReducer,
    filters: reducer,
  },
});
