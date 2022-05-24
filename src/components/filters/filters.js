import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './filters.scss';

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

const FilterBox = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const renderInput = (label, id, isChecked, handler) => {
    return (
      <div key={id} className="checkbox-wrap">
        <label className="check">
          <input
            id={id}
            onChange={(e) => dispatch(handler(e))}
            checked={isChecked}
            type="checkbox"
            className="checkInput"
          ></input>
          <span className="check__box"> </span>
          {label}
        </label>
      </div>
    );
  };

  const renderElements = () => {
    return filters.map(({ label, id, isChecked }) =>
      renderInput(label, id, isChecked, toggleCheckbox)
    );
  };

  const areAllChecked = filters.every((item) => item.isChecked);

  return (
    <div className="filters-wrap">
      <aside className="filters">
        <div className="filters-items">
          <fieldset>
            <legend className="filter-title">КОЛИЧЕСТВО ПЕРЕСАДОК</legend>
            {renderInput('Все', '1', areAllChecked, toggleCheckAll)}
            {renderElements()}
          </fieldset>
        </div>
        <div className="divider" />
      </aside>
    </div>
  );
};

export default FilterBox;
