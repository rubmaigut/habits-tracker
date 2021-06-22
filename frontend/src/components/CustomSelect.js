import React,{ useEffect, useState } from "react";
import { MainWrapper } from "../styled/StyledComponents";
import { useStyles } from "../styled/materialUI-UserForm";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


const CustomSelect = ({items=[], selectedValue, onChangeValue, tableName}) => {
    const classes = useStyles();
    const [value, setValue] = useState("");
  
    const handleChange = (event) => {
        onChangeValue(event.target.value)
        setValue(event.target.value);
    };

  useEffect(()=>{
    setValue(selectedValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedValue])

  return (
    <MainWrapper>
      <FormControl required className={classes.form}>
        <InputLabel id="select">{tableName}</InputLabel>
        <Select
          labelId="select-"
          id="select-required"
          value={value}
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            { items.length && items.map((item)=>(
            <MenuItem key={item._id} value={item.value}>{item.name}</MenuItem>
            ))}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </MainWrapper>
  );
};
export default CustomSelect;
