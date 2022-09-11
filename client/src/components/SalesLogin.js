import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Spinner from "./Spinner/Spinner";

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

  inputStyle: {
    width: "100%",
    marginBottom: 15,
  },

  administratorButton: {
    color: "red",
    textDecoration: "underline",
    marginTop: 10,
    textTransform: "lowercase",
  },
});

const LoginUser = (props) => {
  const classes = useStyles();
  const loginRef = useRef();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const switchToAdminLogin = () => {
    history.push("/admin/login");
  };

  const salesLoginHandler = (event) => {
    event.preventDefault();
    props.loginDetails(username, password);
  };

  return (
    <Card className={classes.formDiv} raised>
      <form className={classes.formStyle} onSubmit={salesLoginHandler}>
        <Typography variant="h4">SALES</Typography>
        {props.loginError && (
          <Typography variant="body1" color="error">
            wrong username / password
          </Typography>
        )}
        {props.showSpinner && <Spinner />}
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
          className={classes.administratorButton}
          onClick={switchToAdminLogin}
        >
          login administrator
        </Button>
      </form>
    </Card>
  );
};

export default LoginUser;
