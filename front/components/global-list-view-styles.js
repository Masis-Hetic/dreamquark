import styled from "styled-components";

const ListView = styled.div``;

ListView.H1 = styled.h1`
  margin: 100px 0 50px;
  text-align: center;
`;

ListView.Ul = styled.ul`
  width: 300px;
  margin: 0 auto;
  box-shadow: 0 0 4px 0px #eceff1;
`;

ListView.Li = styled.li`
  line-height: 3;
  padding-left: 5px;
  border-bottom: 1px solid #000;
  cursor: pointer;
  transition: .2s ease-in-out; 
  background: #fff;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:nth-child(odd) {
    background: #eceff1;
  }
`;

ListView.A = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`;

export default ListView;
