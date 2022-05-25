/* eslint-disable dot-notation */
/* eslint-disable no-unused-expressions */
import { useDispatch, useSelector } from 'react-redux';

import { sort } from '../../services/reducers/sortReducer';

import classes from './mytabs.module.scss';

function MyTabs() {
  const dispatch = useDispatch();
  const sortTab = useSelector((state) => state.sort);
  let classActiveTab = '';
  let secondActiveTab = '';
  let optimalActiveTab = '';
  sortTab.sort[0] === 'price'
    ? (classActiveTab = 'active')
    : (classActiveTab = '');

  sortTab.sort[0] === 'duration'
    ? (secondActiveTab = 'active')
    : (secondActiveTab = '');

  sortTab.sort[0] === 'optimal'
    ? (optimalActiveTab = 'active')
    : (optimalActiveTab = '');

  return (
    <div className={classes['tabs']}>
      <div className={classes['mytabs']}>
        <button
          type="button"
          className={classes[classActiveTab]}
          onClick={() => dispatch(sort(['price']))}
        >
          САМЫЙ ДЕШЕВЫЙ
        </button>
        <button
          type="button"
          className={classes[secondActiveTab]}
          onClick={() => dispatch(sort(['duration']))}
        >
          САМЫЙ БЫСТРЫЙ
        </button>
        <button
          type="button"
          className={classes[optimalActiveTab]}
          onClick={() => dispatch(sort(['optimal']))}
        >
          ОПТИМАЛЬНЫЙ
        </button>
      </div>
    </div>
  );
}

export default MyTabs;
