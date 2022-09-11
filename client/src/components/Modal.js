import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionCreators from "../store/ActionCreators";

const Modal = (props) => {
  const { open, name } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  //   const handleClickOpen = () => {
  //     showModal(true);
  //   };

  const handleClose = () => {
    showModal(false, "");
  };

  const content = (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"WARNING"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you want to add ${name} back to shelf?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.addDrug} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

export default Modal;
