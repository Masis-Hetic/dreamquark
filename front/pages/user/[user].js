import React         from 'react';
import fetch         from 'isomorphic-unfetch';
import MainComponent from "../../components/main-component/main-component";
import StyledUser    from "../../components/pages/user/user.styles";

/**
 * @property { string } user_id
 * @property { string } user_name
 * @property { string } user_email
 * @property { string } organization_name
 * @property { array } team_name
 * @param user
 */
const User = ( { user }) => (
  <MainComponent>
    <StyledUser>
      <StyledUser.H1>User details</StyledUser.H1>
      <StyledUser.P><StyledUser.Span>User id : </StyledUser.Span> <span>{user[0].user_id}</span></StyledUser.P>
      <StyledUser.P><StyledUser.Span>User name : </StyledUser.Span> <span>{user[0].user_name}</span></StyledUser.P>
      <StyledUser.P><StyledUser.Span>User email : </StyledUser.Span> <span>{user[0].user_email}</span></StyledUser.P>
      <StyledUser.P><StyledUser.Span>Belongs to organization : </StyledUser.Span> <span>{user[0].organization_name}</span></StyledUser.P>
      <StyledUser.P>
        <StyledUser.Span>Belongs to {user[0].team_name.length > 1 ? 'teams' : 'team'} : </StyledUser.Span>
        <span>
          {user[0].team_name.map((team, i) => (i + 1) < user[0].team_name.length ? `${ team }, ` : team )}
        </span>
      </StyledUser.P>
    </StyledUser>
  </MainComponent>
);

User.getInitialProps = async ( { query, asPath }) => {
  const queryUrl = asPath.substring(6);

  const queryUser = await fetch(`http://localhost:8080/api/user/${ query.id ? query.id : queryUrl }`);
  const user = await queryUser.json();
  return {
    user
  };
};

export default User;
