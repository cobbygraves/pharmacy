import { SHOW_SNACKBAR, SHOW_MODAL } from "./Actions";

export const showSnackBar = (isOpen, message, type) => (dispatch) =>
  dispatch({
    type: SHOW_SNACKBAR,
    showSnack: isOpen,
    messageSnack: message,
    typeSnack: type,
  });

export const showModal = (isOpen, id, drug) => (dispatch) =>
  dispatch({
    type: SHOW_MODAL,
    openModal: isOpen,
    drugId: id,
    drugName: drug,
  });
