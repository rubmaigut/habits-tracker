import styled from "styled-components";

//mobile firts Iphone 5 320 *568
export const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.h1`
  font-weight: bold;
  margin-top: 10px;
  color: black;
`;
export const Subtitle = styled.h3`
  font-weight: bold;
  color: black;

`;

export const Paragraph = styled.p`
  color: #737373;
`;

export const BorderStyle = styled.div`
  width: 100%;
  height: 35px;
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
`;
export const FormWrapper = styled.form`
  width: 95%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  margin: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  border-radius: 5px;
`;
export const GoogleButton = styled.button`
  width: 100%;
  height: 50px;
  border-width: 0;
  background: white;
  color: #737373;
  border-radius: 5px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const EmailButton = styled.button`
  width: 100%;
  height: 50px;
  border-width: 0px;
  background: white;
  color: #737373;
  border-radius: 5px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const GoogleIcon = styled.img`
  width: 30px;
  height: 30px;
  padding: 10px;
`;
