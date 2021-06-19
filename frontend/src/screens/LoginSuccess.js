import React, { useEffect } from "react";

import {
    MainWrapper,
    Subtitle
  } from "../styled/StyledComponents";

const LoginSucess = () => {
    useEffect(()=>{
        setTimeout(()=>{
            window.close()
        }, 1000)
    },[])
    
    return(
        <MainWrapper>   
            <Subtitle> Thanks for Login in </Subtitle>
        </MainWrapper>
    )

}
export default LoginSucess;