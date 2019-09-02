import styled from "styled-components";

const Orga = styled.div``;

Orga.H1 = styled.h1`
  margin: 100px 0 30px 0;
  text-align: center;
`;

Orga.Form = styled.form`
  display: block;
  width: 300px;
  margin: 0 auto;
`;

Orga.Wrapper = styled.div`
  
`;

Orga.Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

Orga.Input = styled.input`
  padding-left: 5px;
  display: block;
  line-height: 2;
  width: 100%;
`;

Orga.Submit = styled(Orga.Input)`
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

export default Orga;
