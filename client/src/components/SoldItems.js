import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
  headerStyle: {
    color: "white",
    background: "black",
    fontWeight: "bolder",
  },
  containerStyle: {
    // width: "60%",
    marginLeft: 85,
    marginRight: 85,
    marginTop: 25,
  },

  drugRow: {
    // "& :hover": {

    // }
    cursor: "pointer",
  },
});

const SoldItems = (props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.containerStyle}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerStyle}>Name</TableCell>
            <TableCell align="right" className={classes.headerStyle}>
              Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.drugSold.map((drug) => {
            return (
              <TableRow
                key={drug.id + Math.random()}
                className={classes.drugRow}
                onClick={() => props.showModal(drug.id, drug.name)}
              >
                <TableCell component="th" scope="row">
                  {drug.name}
                </TableCell>
                <TableCell align="right">{drug.price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SoldItems;
