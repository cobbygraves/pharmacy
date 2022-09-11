import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionCreators from "../store/ActionCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackBar = () => {
  const snackBar = useSelector((state) => state.snackBar);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showSnackBar } = bindActionCreators(actionCreators, dispatch);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    showSnackBar(false, "", "success");
  };
  const content = (
    <div className={classes.root}>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackBar.type}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("snackBar"));
};

export default SnackBar;
