import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import {IconWrapper} from "../styled/StyledComponents"
import { useStyles } from "../styled/materialUI-Modal";

const TransitionsModal = ({ handleClose, open, height, children}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{alignItems:"flex-end", display:"flex"}}
    >
      <Fade in={open} >
        <IconWrapper style={{backgroundColor:"#fff", height: height || "70%"}}>
            {children}
        </IconWrapper>
      </Fade>
    </Modal>
  );
};
export default TransitionsModal;
