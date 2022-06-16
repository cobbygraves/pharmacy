import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    flexGrow: 1,
    marginBottom: 20,
    "& .MuiAppBar-root": {
      backgroundColor: "black",
    },

    "& .MuiSvgIcon-root": {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },

    "& img": {
      position: "relative",
      left: -10,
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  buttonActions: {
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "75%",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavigationBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const logoutSales = () => {
    history.push("/");
  };

  const loginAdmin = () => {
    history.push("/admin/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Typography variant="subtitle1" style={{ fontWeight: "bolder" }}>
              RUDIA CHEMICALS
            </Typography>
          </IconButton>
          <div style={{ flexGrow: 1 }}></div>
          <Button
            variant="outlined"
            className={classes.buttonActions}
            onClick={loginAdmin}
          >
            {" "}
            Admin
          </Button>

          {
            <Button
              className={classes.buttonActions}
              variant="outlined"
              onClick={logoutSales}
            >
              Logout
            </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
