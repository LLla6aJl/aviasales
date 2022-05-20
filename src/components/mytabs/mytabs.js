import "./mytabs.css";
import { useDispatch, useSelector } from "react-redux";
import { sort } from "../../services/reducers/sortReducer";
function MyTabs() {
  const dispatch = useDispatch();
  const sortTab = useSelector((state) => state.sort);
  let classActiveTab = "";
  let secondActiveTab = "";
  sortTab.sort[0] === "price"
    ? (classActiveTab = "active")
    : (classActiveTab = "");

  sortTab.sort[0] === "duration"
    ? (secondActiveTab = "active")
    : (secondActiveTab = "");

  return (
    <div className="tabs">
      <div className="mytabs">
        <button
          className={`tabsbutton ${classActiveTab}`}
          onClick={() => dispatch(sort(["price"]))}
        >
          САМЫЙ ДЕШЕВЫЙ
        </button>
        <button
          className={`tabsbutton ${secondActiveTab}`}
          onClick={() => dispatch(sort(["duration"]))}
        >
          САМЫЙ БЫСТРЫЙ
        </button>
      </div>
    </div>
  );
}

export default MyTabs;
