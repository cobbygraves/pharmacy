import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionCreators from "../store/ActionCreators";
import HOSTURL from "../config";

const useStyles = makeStyles({
  inputStyle: {
    width: "25%",
    height: 45,
    textAlign: "center",
    fontSize: 20,
  },
});

const RecieptItem = (props) => {
  const classes = useStyles();

  const [quantity, setQuantity] = useState(1);
  const [acceptQty, setAcceptQty] = useState(false);

  const dispatch = useDispatch();
  const { showSnackBar } = bindActionCreators(actionCreators, dispatch);

  const acceptItem = () => {
    axios
      .get(`${HOSTURL}/drug/${props.id}`)
      .then((resp) => {
        const drug = resp.data;
        if (drug.left < quantity) {
          return showSnackBar(
            true,
            `Only ${drug.left} ${drug.name} in Stock`,
            "error"
          );
        } else {
          const amount = quantity * props.price;
          props.addAmount(amount, quantity);
          setAcceptQty(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <>
      <tr>
        <td data-label="Name" className={classes.nameStyle}>
          {props.name}
        </td>
        {/* <td data-label="Quantity">{props.quantity}</td> */}
        <td data-label="Quantity">
          <IconButton
            aria-label="cancel"
            disabled={acceptQty}
            onClick={props.removeDrug}
          >
            <CancelIcon style={{ color: acceptQty ? "gray" : "red" }} />
          </IconButton>
          <input
            type="text"
            className={classes.inputStyle}
            value={quantity}
            onChange={quantityHandler}
            disabled={acceptQty}
          />
          <IconButton
            aria-label="add"
            disabled={acceptQty}
            onClick={acceptItem}
          >
            <CheckBoxIcon style={{ color: acceptQty ? "gray" : "green" }} />
          </IconButton>
        </td>
        <td data-label="Price">{props.price.toFixed(2)}</td>
        <td data-label="Amount">{(quantity * props.price).toFixed(2)}</td>
      </tr>
    </>
  );
};

export default RecieptItem;
