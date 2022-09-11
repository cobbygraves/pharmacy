import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles({
  root: {
    position: "relative",
    // border: "1px solid gray",
    cursor: (props) => (props.stocked ? "pointer" : "default"),
    "& :hover": {
      // background: "gray",
      // color: "white",
      // boxShadow: "0px 4px 5px black",
    },
  },

  drugname: {
    color: (props) => (props.stocked ? "black" : "red"),
  },
  priceStyle: {
    position: "relative",
    left: "60%",
    // top: 10,
    height: "100%",
    color: (props) => (props.stocked ? "black" : "red"),
    fontSize: 18.5,
    "&:hover": {
      background: "none",
      boxShadow: "none",
    },
  },
});

const Drug = (props) => {
  const classes = useStyles(props);
  return (
    <TableRow className={classes.root} onClick={props.drugInfo}>
      <TableCell align="left" colSpan={1}>
        <Typography variant="h5" className={classes.drugname}>
          {props.drugName}{" "}
        </Typography>
      </TableCell>
      <TableCell align="left" colSpan={1}>
        <Typography variant="h6">
          <span className={classes.priceStyle}>{props.drugPrice}</span>{" "}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default Drug;
