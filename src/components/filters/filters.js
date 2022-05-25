/* eslint-disable dot-notation */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './filters.module.scss';

export const toggleCheckbox = (e) => ({
  type: 'CHECKED',
  payload: {
    id: e.target.id,
  },
});

export const toggleCheckAll = (e) => ({
  type: 'CHECK_ALL',
  payload: {
    checked: e.target.checked,
  },
});

function FilterBox() {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const renderInput = (label, id, isChecked, handler) => (
    <div key={id} className={classes['checkbox-wrap']}>
      <label className={classes['check']} htmlFor={id}>
        <input
          id={id}
          onChange={(e) => dispatch(handler(e))}
          checked={isChecked}
          type="checkbox"
          className={classes['checkInput']}
        />
        <span className={classes['check__box']}> </span>
        {label}
      </label>
    </div>
  );

  const renderElements = () =>
    filters.map(({ label, id, isChecked }) =>
      renderInput(label, id, isChecked, toggleCheckbox)
    );

  const areAllChecked = filters.every((item) => item.isChecked);

  return (
    <div className={classes['filters-wrap']}>
      <aside className={classes['filters']}>
        <div className={classes['filters-items']}>
          <fieldset>
            <legend className={classes['filter-title']}>
              КОЛИЧЕСТВО ПЕРЕСАДОК
            </legend>
            {renderInput('Все', 'all', areAllChecked, toggleCheckAll)}
            {renderElements()}
          </fieldset>
        </div>
        <div className={classes['divider']} />
      </aside>
    </div>
  );
}

export default FilterBox;
