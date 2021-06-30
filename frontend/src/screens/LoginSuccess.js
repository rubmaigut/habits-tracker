import React, { useEffect } from "react";

import {
    MainWrapper,
    Title,
    SucessImage
  } from "../styled/StyledComponents";

  import key from "../assets/key.png"

const LoginSucess = () => {
    useEffect(()=>{
        setTimeout(()=>{
            window.close()
        }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return(
        <MainWrapper>   
            <SucessImage src={key}/>
            <Title> Thanks for Login in </Title>
        </MainWrapper>
    )

}
export default LoginSucess;