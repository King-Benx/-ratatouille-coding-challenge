import React, { FC, useState, useEffect } from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import Loader from "react-loader";
import Moment from "react-moment";
import Navbar from "./navbar";
import firebase from "../data/firebase";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  buttonSection: {
    display: "flex",
    height: "15vh",
    backgroundImage: "linear-gradient(rgb(190,190,190),rgb(96,96,96))",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 60,
    width: 300,
  },
  plusIcon: {
    color: "#49796b",
  },
  tableContainer: {
    border: "1px solid gray",
    margin: 30,
    padding: 20,
    minHeight: "30vh",
  },
  table: {
    minWidth: 700,
  },
  formControl: {
    minWidth: 500,
  },
  inputControl: {
    marginBottom: 10,
  },
  submitButton: {
    minWidth: 500,
    marginTop: 10,
    marginBottom: 10,
  },
}));

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundImage: "linear-gradient(#8B668B, #754C78)",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

interface Order{
    id:string;
    dishName: string;
    price:number;
    waiter:string;
    date:any;
    ingredients:Array<string>
}

interface Dishes{
    dishName: string;
    ingredients:Array<string>;
    id:string

}

const Orders: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dishes, setDishes] = useState<Array<any>>([]);
  const [waiterName, setWaiterName] = useState("");
  const [dateEntered, setDateEntered] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  //Firebase references
  const dishRef = firebase.firestore().collection("dishes");
  const ordersRef = firebase.firestore().collection("orders");

  // Get orders from firebase.
  const getOrders = () => {
    setLoading(true);
    ordersRef.onSnapshot((querySnapShot) => {
      const items: any = [];
      querySnapShot.forEach((doc) => {
        items.push(doc.data());
      });
      setOrders(items);
      setLoading(false);
    });
  };

  const getDishes = () => {
    dishRef.onSnapshot((querySnapShot) => {
      const items: any = [];
      querySnapShot.forEach((doc) => {
        items.push(doc.data());
      });
      setDishes(items);
    });
  };

  useEffect(()=>{
    getOrders();
    getDishes();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDishChange = (e: React.ChangeEvent<any>) =>
    setDishes(e.target.value);

  const handleWaiterChange = (e: React.ChangeEvent<any>) =>
    setWaiterName(e.target.value);

  const handleDateChange = (e: React.ChangeEvent<any>) =>
    setDateEntered(e.target.value);

  return (
    <div className={classes.root}>
      <Grid container>
        <Navbar title="Ratatouille" />
        <Grid item xs={12} className={classes.buttonSection}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            onClick={handleOpen}
            startIcon={
              <AddCircle fontSize="large" className={classes.plusIcon} />
            }
          >
            New Order
          </Button>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} className={classes.tableContainer}>
          <Loader loaded={!loading}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Dish Name</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Waiter</StyledTableCell>
                    <StyledTableCell align="center">
                      Date Entered
                    </StyledTableCell>
                    <StyledTableCell>Ingredients</StyledTableCell>
                  </TableRow>
                </TableHead>      
                <TableBody>
                    {orders.map(
                      ( {id, dishName, price, waiter, date, ingredients}:Order) => (
                        <StyledTableRow key={id}>
                          <StyledTableCell>{dishName}</StyledTableCell>
                          <StyledTableCell align="center">
                            ${price}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {waiter}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                              <Moment format="MMMM DD">
                                {date.toDate()}
                             </Moment>
                          </StyledTableCell>
                          <StyledTableCell>
                            {ingredients.toString()}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}     
                </TableBody>
              </Table>
            </TableContainer>
            </Loader>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Order</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.inputControl}>
              <TextField
                id="outlined-basic"
                label="Waiter"
                variant="outlined"
                fullWidth
                value={waiterName}
                onChange={handleWaiterChange}
              />
            </div>
            <div className={classes.inputControl}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Dish
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={dishes}
                  onChange={handleDishChange}
                  label="Dish Name"
                >
                 {dishes.map(({dishName, ingredients, id}: Dishes)=>(
                     <option value={id}>{dishName}</option>
                 ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.inputControl}>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2021-03-11"
                value={dateEntered}
                onChange={handleDateChange}
                className={classes.formControl}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <Button
              variant="contained"
              color="default"
              className={classes.submitButton}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
