import "./filters.scss";
import { useDispatch } from "react-redux";
import { filtered } from "../../services/reducers/filtersReducer";
function Filters() {
  const dispatch = useDispatch();

  return (
    <aside className="filters">
      <div className="filters-items">
        <fieldset>
          <legend className="filter-title">КОЛИЧЕСТВО ПЕРЕСАДОК</legend>
          <div>
            <input
              type="checkbox"
              id="all"
              name="all"
              onClick={() => dispatch(filtered(["all"]))}
            ></input>
            <label className="filter-label" htmlFor="all">
              Все
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="no-transfer"
              name="no-transfer"
              checked={isChecked}
              onClick={() => dispatch(noTransfer())}
            ></input>
            <label className="filter-label" htmlFor="no-transfer">
              Без пересадок
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="one-transfer"
              name="one-transfer"
              checked={isChecked}
              onClick={() => dispatch(oneTransfer())}
            ></input>
            <label className="filter-label" htmlFor="one-transfer">
              1 пересадка
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="two-transfer"
              name="two-transfer"
              checked={isChecked}
              onClick={() => dispatch(filtered(["two"]))}
            ></input>
            <label className="filter-label" htmlFor="two-transfer">
              2 пересадки
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="three-transfer"
              name="three-transfer"
              checked={isChecked}
              onClick={() => dispatch(filtered(["three"]))}
            ></input>
            <label className="filter-label" htmlFor="three-transfer">
              3 пересадки
            </label>
          </div>
        </fieldset>
      </div>
      <div className="divider" />
    </aside>
  );
}

export default Filters;
