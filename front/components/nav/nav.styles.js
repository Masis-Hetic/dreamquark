import styled from "styled-components";

const Nav = styled.nav`
  width: 50vw;
  margin: 0 auto;
`;

Nav.Ul = styled.ul`
  display: flex;
  justify-content: center;
`;

/**
 * @property { boolean } isOver
 */
Nav.Li = styled.li`
  margin-right: 20px;
  line-height: 3;
  cursor: pointer;
  transition: .3s ease-in-out;
  border-bottom: ${ props => props.path ? '1px solid #000' : 'none' };
  
  &:hover {
    transition: .3s ease-in-out;
    border-bottom: 1px solid #000;
  }
  
  &:last-of-type {
    margin-right: 0;
  }
`;

Nav.A = styled.a`
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
`;

export default Nav;
