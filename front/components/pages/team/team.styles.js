import styled from "styled-components";

const Team = styled.div``;

Team.H1 = styled.h1`
  margin: 100px 0 30px 0;
  text-align: center;
`;

Team.Form = styled.form`
  display: block;
  width: 300px;
  margin: 0 auto;
`;

Team.Wrapper = styled.div`
  
`;

Team.Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

Team.Input = styled.input`
  padding-left: 5px;
  padding-left: 5px;
  display: block;
  line-height: 2;
  width: 100%;
`;

Team.Submit = styled(Team.Input)`
  margin: 30px auto 0;
  display: table;
  width: unset;
  padding: 3px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: .2s ease-in-out;
  
  &:hover {
    background: #eceff1;
  }
`;

export default Team;
