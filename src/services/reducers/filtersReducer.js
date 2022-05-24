const initialState = [
  { label: "Без пересадок", id: "0", isChecked: true },
  { label: "1 пересадка", id: "1", isChecked: true },
  { label: "2 пересадки", id: "2", isChecked: true },
  { label: "3 пересадки", id: "3", isChecked: true },
];

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CHECKED":
      return state.map((item) =>
        item.id === payload.id ? { ...item, isChecked: !item.isChecked } : item
      );
    case "CHECK_ALL":
      return state.map((item) => ({ ...item, isChecked: payload.checked }));
    default:
      return state;
  }
};
