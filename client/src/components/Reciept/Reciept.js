import React from "react";
import "./Reciept.css";
import { makeStyles } from "@material-ui/core/styles";
import RecieptItem from "../RecieptItem";
import TableContainer from "@material-ui/core/TableContainer";

const useStyles = makeStyles({
  container: {
    maxHeight: 300,
  },
});

const Reciept = (props) => {
  const classes = useStyles();

  return (
    <div>
      <TableContainer className={classes.container}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {props.cartItems.map((item) => (
              <RecieptItem
                key={item.id}
                name={item.name}
                addAmount={(amt, qty) => props.addAmount(item.id, amt, qty)}
                price={item.price}
                id={item.id}
                removeDrug={() => props.removeItem(item.id)}
              />
            ))}
          </tbody>
        </table>
      </TableContainer>
    </div>
  );
};

export default Reciept;
