import { SHOW_SNACKBAR, SHOW_MODAL } from "../Actions";

export const snackBarReducer = (
  state = { open: false, message: "", type: "success" },
  action
) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        open: action.showSnack,
        message: action.messageSnack,
        type: action.typeSnack,
      };
    default:
      return state;
  }
};

export const modalReducer = (
  state = { open: false, id: " ", name: "" },
  action
) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        open: action.openModal,
        id: action.drugId,
        name: action.drugName,
      };
    default:
      return state;
  }
};
