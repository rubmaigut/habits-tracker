import { makeStyles } from "@material-ui/core/styles";

export const tabUseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
  tabs:{
    position: "fixed",
    bottom: 0
  }

}));
