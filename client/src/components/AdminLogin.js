import React, { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Spinner from "./Spinner/Spinner";
import HOSTURL from "../config";

const useStyles = makeStyles({
  formStyle: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTypography-root": {
      marginBottom: 15,
    },
  },

  formDiv: {
    position: "absolute",
    top: "25%",
    left: "35%",
    padding: 25,
    width: 350,
  },

  salesButton: {
    color: "red",
    textDecoration: "underline",
    marginTop: 10,
    textTransform: "lowercase",
  },

  inputStyle: {
    width: "100%",
    marginBottom: 15,
  },
});

const LoginUser = (props) => {
  const [loginAdminError, setLoginAdminError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const loginRef = useRef();
  const [showSpinner, setShowSpinner] = useState(false);

  const switchToSalesLogin = () => {
    history.push("/");
  };

  const adminLoginHandler = (name, pass) => {
    setShowSpinner(true);
    setLoginAdminError(false);
    if (name === "" || pass === "") {
      setLoginAdminError(true);
      setShowSpinner(false);
      return;
    }
    const loginAdmin = { username: name, password: pass };
    //make an axios call to the database to fetch check user details
    axios
      .post(`${HOSTURL}/user/admin/login`, loginAdmin)
      .then((resp) => {
        setShowSpinner(false);
        const { verification } = resp.data;

        if (verification) {
          setLoginAdminError(false);
          history.push("/admin");
        } else {
          setLoginAdminError(true);
        }
      })
      .catch((error) => {
        setLoginAdminError(true);
      });
  };

  return (
    <Card className={classes.formDiv} raised>
      <form
        className={classes.formStyle}
        onSubmit={(event) => {
          event.preventDefault();
          adminLoginHandler(username, password);
        }}
      >
        <Typography variant="h4">ADMIN</Typography>
        {loginAdminError && (
          <Typography variant="body1" color="error">
            wrong username / password
          </Typography>
        )}
        {showSpinner && <Spinner />}
        <TextField
          className={classes.inputStyle}
          placeholder="username"
          variant="filled"
          ref={loginRef}
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <TextField
          placeholder="password"
          variant="filled"
          type="password"
          className={classes.inputStyle}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button variant="contained" color="primary" type="submit" size="large">
          LOGIN
        </Button>
        <Button
          variant="text"
          className={classes.salesButton}
          onClick={switchToSalesLogin}
        >
          login sales
        </Button>
      </form>
    </Card>
  );
};

export default LoginUser;
