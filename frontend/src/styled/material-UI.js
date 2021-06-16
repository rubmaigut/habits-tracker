import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "95%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    height: "40px",
    margin: theme.spacing(3, 0, 2),
  },
}));
