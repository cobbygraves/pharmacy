import React, { useEffect, useState } from "react";

import Drug from "./Drug";
import Reciept from "./Reciept/Reciept";
import NavigationBar from "./NavigationBar";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SoldItems from "./SoldItems";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useFetchData from "../custom-hooks/useDataFetching";
import Modal from "./Modal";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import HOSTURL from "../config";
import { Card, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionCreators from "../store/ActionCreators";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "100%",
    "& .MuiTableCell-head": {
      backgroundColor: "black",
    },
  },
  container: {
    maxHeight: 345,
  },

  search: {
    height: 45,
    width: "99%",
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

  totalCartCost: {
    color: "GrayText",
    textAlign: "center",
    marginBottom: 15,
  },

  hrStyle: {
    border: "1px solid black",
    width: "85%",
  },
  cartItemGrid: {
    position: "relative",

    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    height: "100%",
    width: "100%",
  },
  secondHr: {
    border: "1px solid black",
    width: "100%",
    marginTop: 25,
  },
  cartItemTitle: {
    fontSize: 25,
    fontWeight: "bolder",
    textAlign: "center",
  },
  cartCostDiv: {
    position: "sticky",
    marginTop: 45,
    left: "30%",
    bottom: 15,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const Home = () => {
  const classes = useStyles();

  const [drugsArray, setDrugsArray] = useFetchData(
    "http://localhost:5000/drug"
  );

  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);
  const { id } = useSelector((state) => state.modal);

  const [lookFor, setLookFor] = useState("");
  // const [drugsArray, setDrugsArray] = useState([]);
  const [cartDrugs, setCartDrugs] = useState([]);
  const [dailyDrugs, setDailyDrugs] = useState([]);
  const [showDailyDrugs, setShowDailyDrugs] = useState(false);
  const [showDaily, setShowDaily] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  const [amountArray, setAmountArray] = useState([]);

  //callback function to update drug in the database

  const updateDrugHandler = (drugId, quantity) => {
    const drug = drugsArray.find((eachDrug) => eachDrug.id === drugId);

    const qtySold = drug.sold;
    const qtyLeft = drug.left;

    const newDrug = {
      ...drug,
      sold: qtySold + parseFloat(quantity),
      left: qtyLeft - parseFloat(quantity),
    };

    //make an axios put request to the database to get the updated drug from the server
    axios
      .put(`${HOSTURL}/drug/update`, newDrug)
      .then((resp) => {
        const updatedDrug = resp.data;
        updateDrugsArray(updatedDrug); // updating drugs array at client side
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  };

  //callback function to update drugArray at the client side

  const updateDrugsArray = (drug, quantity) => {
    const drugIndex = drugsArray.findIndex(
      (drugArrayItem) => drugArrayItem.id === drug.id
    );
    const drugWithIndex = drugsArray[drugIndex];
    const qtySold = drugWithIndex.sold;
    const qtyLeft = drugWithIndex.left;
    const newDrugWithIndex = {
      ...drugWithIndex,

      sold: qtySold + parseFloat(quantity),
      left: qtyLeft - parseFloat(quantity),
    };
    const newDrugsArray = [...drugsArray];
    newDrugsArray[drugIndex] = newDrugWithIndex;
    setDrugsArray(newDrugsArray);
  };

  //callback function to add updated drug to the array of cart items
  const addDrugHandler = (drug) => {
    if (cartDrugs.length > 0) {
      const drugExist = cartDrugs.some((cartItem) => cartItem.id === drug.id);
      if (drugExist) {
        return;
      } else {
        const newDrug = {
          id: drug.id,
          name: drug.name,
          price: drug.price,
          quantity: 1,
        };
        const newCartDrugs = [...cartDrugs];
        setCartDrugs(newCartDrugs.concat(newDrug));
      }
    } else {
      const newDrug = {
        id: drug.id,
        name: drug.name,
        price: drug.price,
        quantity: 1,
      };
      setCartDrugs(cartDrugs.concat(newDrug));
    }
  };

  const paymentHandler = () => {
    //logic to add items in cart to daily sales
    if (cartDrugs.length > 0) {
      setTotalSales((prevSales) => prevSales + totalCost);
      const newCartDrugs = [...cartDrugs];
      const newDailyDrugs = [];
      newCartDrugs.forEach((eachDrug) => {
        for (let index = 0; index < eachDrug.quantity; index++) {
          const drug = { ...eachDrug, id: uuidv4() };
          newDailyDrugs.unshift(drug);
        }
        const fullDailyDrugs = [...dailyDrugs];
        const newFullDailyDrugs = fullDailyDrugs.concat(newDailyDrugs);
        setDailyDrugs(newFullDailyDrugs);
      });
    }
    setCartDrugs([]);
    setAmountArray([]);
    setShowDaily(true);
  };

  //callback to remove a drug from the cart items
  const removeItemHandler = (drugId) => {
    const newCartDrugs = cartDrugs.filter((eachDrug) => eachDrug.id !== drugId);
    setCartDrugs(newCartDrugs);
  };

  //callback to show daily drugs sold
  const showDailySalesHandler = () => {
    setShowDailyDrugs(!showDailyDrugs);
  };

  // callback to close daily sales
  const closeSalesHandler = () => {
    const dailyDrugsArray = {
      sales: 0,
      id: "sales",
      drugs: [],
    };
    axios
      .put(`${HOSTURL}/sales/update`, dailyDrugsArray)
      .then((resp) => {
        setDailyDrugs([]);
        setTotalSales(0);
        setCartDrugs([]);
        setShowDailyDrugs(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //callback to add amount to array of amount
  const addAmountHandler = (id, amount, quantity) => {
    updateDrugHandler(id, quantity);
    const drugIndex = cartDrugs.findIndex((cartItem) => cartItem.id === id);
    const drugWithIndex = cartDrugs[drugIndex];
    const newDrug = { ...drugWithIndex, quantity: quantity };
    const newCartDrugs = [...cartDrugs];
    newCartDrugs[drugIndex] = newDrug;
    const newAmountArray = [...amountArray];
    const updatedAmountArray = newAmountArray.concat(amount);
    setCartDrugs(newCartDrugs);
    setAmountArray(updatedAmountArray);
  };

  //logic to remove drug from drug sold array

  const showModalHandler = (drugId, drugName) => {
    showModal(true, drugId, drugName);
  };

  useEffect(() => {
    let totalCost = 0;
    amountArray.forEach((amount) => {
      totalCost += amount;
    });
    setTotalCost(totalCost);
  }, [amountArray]);

  useEffect(() => {
    axios
      .get(`${HOSTURL}/sales`)
      .then((resp) => {
        const { sales, drugs } = resp.data[0];
        setTotalSales(sales);
        setDailyDrugs(drugs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (showDaily) {
      const dailyDrugsArray = {
        sales: totalSales,
        id: "sales",
        drugs: dailyDrugs,
      };
      axios
        .put(`${HOSTURL}/sales/update`, dailyDrugsArray)
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showDaily, totalSales, dailyDrugs]);

  const addDrugHandlerToShelf = () => {
    showModal(false, "", "");
    const drug = dailyDrugs.find((eachDrug) => eachDrug.id === id);
    const price = drug.price;
    setTotalSales((prevSales) => prevSales - price);
    const newDailyDrugs = dailyDrugs.filter((eachDrug) => eachDrug.id !== id);
    setDailyDrugs(newDailyDrugs);
  };

  return (
    <div>
      <Modal addDrug={addDrugHandlerToShelf} />
      <NavigationBar />
      <Grid container>
        <Grid item md={7} className={classes.drugStockGrid}>
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
          {drugsArray && drugsArray.length !== 0 ? (
            <Card className={classes.card}>
              <TableContainer className={classes.container}>
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Drug</StyledTableCell>
                      <StyledTableCell align="center">
                        <span style={{ marginRight: 100 }}></span>Price
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {drugsArray &&
                      drugsArray.length !== 0 &&
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
                        .map((drug) => {
                          if (drug.left == 0) {
                            return (
                              <Drug
                                key={drug.id}
                                drugName={drug.name}
                                drugPrice={drug.price}
                              />
                            );
                          } else {
                            return (
                              <Drug
                                key={drug.id}
                                stocked
                                drugName={drug.name}
                                drugPrice={drug.price && drug.price.toFixed(2)}
                                drugInfo={() => addDrugHandler(drug)}
                              />
                            );
                          }
                        })}
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

        <Grid item md={5}>
          <div className={classes.cartItemGrid}>
            {" "}
            <Typography variant="h5" className={classes.cartItemTitle}>
              CART ITEMS
            </Typography>
            <hr className={classes.hrStyle} />
            <Reciept
              cartItems={cartDrugs}
              removeItem={removeItemHandler}
              addAmount={addAmountHandler}
            />
            <div className={classes.cartCostDiv}>
              <Typography variant="h5" className={classes.totalCost}>
                <span> Total Cost = &#8373; {totalCost.toFixed(2)}</span>
              </Typography>
              <div>
                <Button
                  type="submit"
                  color="primary"
                  size="large"
                  fullWidth
                  variant="contained"
                  onClick={paymentHandler}
                  disabled={cartDrugs.length !== amountArray.length}
                >
                  ACCEPT PAYMENT
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <hr className={classes.secondHr} />
      </Grid>
      <Grid container justifyContent="space-around">
        <Typography variant="h5">
          Total Sales = &#8373; {totalSales.toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          size="medium"
          onClick={showDailySalesHandler}
        >
          Detail Sales
        </Button>

        <Button variant="contained" size="medium" onClick={closeSalesHandler}>
          Close Sales
        </Button>
      </Grid>
      <Grid container justifyContent="center">
        {showDailyDrugs && (
          <SoldItems drugSold={dailyDrugs} showModal={showModalHandler} />
        )}
      </Grid>
    </div>
  );
};

export default Home;
