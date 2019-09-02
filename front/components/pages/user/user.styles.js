import styled from "styled-components";

const StyledUser = styled.div`
  position: absolute;
  top: 150px;
  left: 50%;
  width: 40%;
  transform: translateX(-50%);
  box-shadow: 0 0 4px 0px lightgrey;
`;

StyledUser.H1 = styled.h1`
  margin-bottom: 50px;
  text-align: center;
`;

StyledUser.P = styled.p`
  line-height: 3;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  background: #fff;
  
  &:nth-child(even) {
    background: #eceff1;
  }
`;

StyledUser.Span = styled.span`
  flex-basis: 40%;
`;

export default StyledUser;
