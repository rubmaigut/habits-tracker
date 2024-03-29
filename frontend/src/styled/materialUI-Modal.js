import { makeStyles, withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';


export const useStyles = makeStyles((theme) => ({
  form: {
    width: "95%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submit: {
    height: "40px",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));

export const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#000000",
      },
    },
    
  },
});

export const PurpleSwitch = withStyles({
  switchBase: {
    color:  "linear-gradient(45deg, #f36e8b 30%, #f1bda2 90%)",
    '&$checked': {
      color:  "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
    '&$checked + $track': {
      backgroundColor:  "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
  },
  checked: {},
  track: {},
})(Switch);
