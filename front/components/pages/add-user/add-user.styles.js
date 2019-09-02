import styled from "styled-components";

const NewUser = styled.div`
  margin-top: 100px;
`;

NewUser.H1 = styled.h1`
  text-align: center;
`;

NewUser.Form = styled.form`
  display: table;
  margin: 0 auto;
`;

NewUser.Wrapper = styled.div`
  margin: 30px 0;
`;

NewUser.Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

NewUser.Select = styled.select`
  padding-left: 5px;
  width: 300px;
`;

NewUser.Input = styled.input`
  display: block;
  line-height: 2;
  width: 300px;
  padding-left: 5px;
`;

NewUser.Submit = styled(NewUser.Input)`
  display: table;
  width: unset;
  padding: 3px 10px;
  margin: 30px auto 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: .2s ease-in-out;
  
  &:hover {
    background: #eceff1;
  }
`;

export default NewUser;
