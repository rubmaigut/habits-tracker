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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return(
        <MainWrapper>   
            <Subtitle> Thanks for Login in </Subtitle>
        </MainWrapper>
    )

}
export default LoginSucess;