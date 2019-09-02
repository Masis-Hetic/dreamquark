import styled from "styled-components";

const Home = styled.div`
  margin: 100px auto 0;
`;

Home.Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

Home.H1 = styled.h1`
  margin-bottom: 30px;
  text-align: center;
  padding-left: 10px;
`;

Home.Ul = styled.ul`
  box-shadow: 0 0 4px 0px lightgrey;
`;

Home.Li = styled.li`
  line-height: 3;
  border-bottom: 1px solid #000;
  padding-left: 10px;
  transition: .2s ease-in-out;
  overflow: hidden;
  background: #fff;
  
  &:nth-child(even) {
    background: #eceff1;
  }
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:nth-of-type(1) {
    transform: none;
  }
`;

Home.A = styled.a`
  display: flex;
  width: 100%;
  cursor: pointer;
`;

Home.FirstRow = styled(Home.Li)`
  display: flex;
  font-weight: bold;
`;

Home.Span = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

Home.FirstColumn = styled(Home.Span)`
  flex-basis: 10%;
`;

Home.SecondColumn = styled(Home.Span)`
  flex-basis: 25%;
`;

Home.ThirdColumn = styled(Home.Span)`
  flex-basis: 25%;
`;

Home.ForthColumn = styled(Home.Span)`
  flex-basis: 20%;
`;

Home.FifthColumn = styled(Home.Span)`
  flex-basis: 20%;
`;

export default Home;
