import React, { useState } from "react";
import Drug from "./Drug";
import DrugDetails from "./DrugDetails";
import AdminBar from "./AdminBar";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import Input from "@material-ui/core/Input";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionCreators from "../store/ActionCreators";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import useDataFetching from "../custom-hooks/useDataFetching";
import HOSTURL from "../config";
import { Card, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "100%",
    "& .MuiTableCell-head": {
      backgroundColor: "black",
    },
  },
  container: {
    maxHeight: 355,
  },

  search: {
    height: 45,
    width: "97%",
    fontSize: 25,
    marginTop: 15,
    paddingLeft: 15,
  },

  drugStockGrid: {
    background: "#ccc",
    padding: 15,
  },
  logo: {
    fontSize: 25,
    fontWeight: "bolder",
    textAlign: "center",
  },
  card: {
    marginTop: 25,
  },

  hrStyle: {
    border: "1px solid black",
    width: "85%",
  },
  drugDetailGrid: {
    position: "relative",
    padding: 10,
    marginLeft: "auto",
    marginTop: 30,
    marginRight: "auto",
    height: "100%",
    width: "100%",
  },

  drugDetailTitle: {
    fontSize: 25,
    fontWeight: "bolder",
    textAlign: "center",
  },
}));

const Admin = (props) => {
  const classes = useStyles();
  // const { drugsArray, setDrugsArray, showDrugs } = useShowDrugs();
  const [drugsArray, setDrugsArray] = useDataFetching(`${HOSTURL}/drug`);

  const [newStock, setNewStock] = useState(true);
  const [lookFor, setLookFor] = useState("");
  // const [drugsArray, setDrugsArray] = useState([]);
  const [drugId, setDrugId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [expiry, setExpiry] = useState("");
  const [qtyStocked, setQtyStocked] = useState("");
  const [qtySold, setQtySold] = useState("");
  const [qtyLeft, setQtyLeft] = useState("");
  const dispatch = useDispatch();
  const { showSnackBar } = bindActionCreators(actionCreators, dispatch);

  // callback function to get and set drug infomation
  const getDrugDetails = (drugId) => {
    const drug = drugsArray.find((eachDrug) => eachDrug.id === drugId);
    setDrugId(drug.id);
    setName(drug.name);
    setPrice(drug.price);
    setExpiry(drug.expiry);
    setQtyStocked(drug.stocked);
    setQtySold(drug.sold);
    setQtyLeft(drug.left);
    setNewStock(false);
  };

  //callback to clear input element to add a new stock

  const newStockHandler = () => {
    setNewStock(true);
    setName("");
    setPrice("");
    setExpiry("");
    setQtyStocked("");
    setQtySold("");
    setQtyLeft("");
  };

  //callback to submit or update new stock

  const submitStockHandler = (event) => {
    event.preventDefault();
    if (newStock) {
      const newDrug = {
        name: name.trim(),
        price: price,
        expiry: expiry.trim(),
        stocked: qtyStocked,
        sold: qtySold,
        left: qtyLeft,
      };
      console.log(".......Added Drug..........");
      console.log(newDrug);
      if (
        name === "" ||
        price === "" ||
        parseFloat(qtyStocked) !== parseFloat(qtyLeft) + parseFloat(qtySold)
      ) {
        return showSnackBar(
          true,
          "Wrong / incomplete data values...Please check again",
          "error"
        );
      }
      axios
        .post(`${HOSTURL}/drug/stock`, newDrug)
        .then((resp) => {
          showSnackBar(true, "drug added successfully", "success");
          setName("");
          setPrice("");
          setExpiry("");
          setQtyStocked("");
          setQtySold("");
          setQtyLeft("");
        })
        .catch((err) => {
          showSnackBar(true, "error adding drug", "error");
        });
    } else {
      const updatedDrug = {
        id: drugId,
        name: name.trim(),
        price: price,
        expiry: expiry.trim(),
        stocked: qtyStocked,
        sold: qtySold,
        left: qtyLeft,
      };
      console.log(".......Updated Drug..........");
      console.log(updatedDrug);
      if (
        name === "" ||
        price === "" ||
        parseFloat(qtyStocked) !== parseFloat(qtyLeft) + parseFloat(qtySold)
      ) {
        return showSnackBar(
          true,
          "Wrong / incomplete data values...Please check again",
          "error"
        );
      }
      axios
        .put(`${HOSTURL}/drug/update`, updatedDrug)
        .then((resp) => {
          const updatedDrug = resp.data;
          const drugIndex = drugsArray.findIndex(
            (drugArrayItem) => drugArrayItem.id === updatedDrug.id
          );
          const drugWithIndex = drugsArray[drugIndex];
          const newDrugWithIndex = {
            ...drugWithIndex,
          };
          const newDrugsArray = [...drugsArray];
          newDrugsArray[drugIndex] = newDrugWithIndex;
          setDrugsArray(newDrugsArray);
          showSnackBar(true, "drug updated successfully", "success");
          setDrugId("");
          setName("");
          setPrice("");
          setExpiry("");
          setQtyStocked("");
          setQtySold("");
          setQtyLeft("");
        })
        .catch((err) => {
          showSnackBar(true, "error updating drug", "error");
        });
    }
  };

  return (
    <div>
      <AdminBar addStock={newStockHandler} />
      <Grid container>
        <Grid item md={6} className={classes.drugStockGrid}>
          <Typography variant="h5" className={classes.logo}>
            DRUG STOCK
          </Typography>
          <div className={classes.search}>
            <Input
              placeholder="Search By Drug Name"
              className={classes.search}
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => {
                setLookFor(event.target.value);
              }}
              value={lookFor}
            />
          </div>
          {drugsArray.length !== 0 ? (
            <Card className={classes.card}>
              <TableContainer className={classes.container}>
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-label="customized table"
                >
                  <TableBody>
                    {drugsArray.length !== 0 &&
                      drugsArray
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .filter((drug) => {
                          if (lookFor === "") {
                            return drug;
                          } else if (
                            drug.name
                              .toLowerCase()
                              .includes(lookFor.toLowerCase())
                          ) {
                            return drug;
                          }
                        })
                        .map((drug) => (
                          <Drug
                            key={drug.id}
                            drugName={drug.name}
                            drugInfo={() => getDrugDetails(drug.id)}
                            stocked
                          />
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          ) : (
            <h4 style={{ textAlign: "center", marginTop: 25 }}>
              Loading drugs...
            </h4>
          )}
        </Grid>
        <Grid item md={6} className={classes.drugDetailGrid}>
          <Typography variant="h5" className={classes.drugDetailTitle}>
            DRUG DETAILS
          </Typography>
          <hr className={classes.hrStyle} />
          <DrugDetails
            submitStock={submitStockHandler}
            newStock={newStock}
            name={name}
            changeName={(event) => setName(event.target.value)}
            price={price}
            changePrice={(event) => setPrice(event.target.value)}
            expiry={expiry}
            changeExpiry={(event) => setExpiry(event.target.value)}
            stocked={qtyStocked}
            changeStocked={(event) => setQtyStocked(event.target.value)}
            sold={qtySold}
            changeSold={(event) => setQtySold(event.target.value)}
            left={qtyLeft}
            changeLeft={(event) => setQtyLeft(event.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
