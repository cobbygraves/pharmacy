import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2.9),
      width: "30ch",
    },
  },

  formDiv: {
    position: "relative",
  },
  stockButton: {
    position: "relative",
    top: 30,
    left: 75,
  },
}));

const DrugDetails = (props) => {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={props.submitStock}
    >
      <div className={classes.formDiv}>
        <TextField
          id="outlined-full-width"
          label="Drug Name"
          style={{ margin: 8, width: "100%" }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={props.name}
          onChange={props.changeName}
        />
        <TextField
          id="outlined-required"
          label="Price"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={props.price}
          onChange={props.changePrice}
        />
        <TextField
          id="outlined-disabled"
          label="Expiry Date"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={props.expiry}
          onChange={props.changeExpiry}
        />
        <TextField
          id="outlined-password-input"
          label="Quantity Stocked"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={props.stocked}
          onChange={props.changeStocked}
        />
        <TextField
          id="outlined-password-input"
          label="Quantity Sold"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={props.sold}
          onChange={props.changeSold}
        />
        <TextField
          id="outlined-password-input"
          label="Quantity Left"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={props.left}
          onChange={props.changeLeft}
        />
        {props.newStock ? (
          <Button
            variant="contained"
            size="large"
            className={classes.stockButton}
            color="primary"
            type="submit"
          >
            ADD NEW STOCK
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            type="submit"
            className={classes.stockButton}
          >
            UPDATE STOCK
          </Button>
        )}
      </div>
    </form>
  );
};

export default DrugDetails;
