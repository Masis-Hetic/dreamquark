import React         from "react";
import fetch         from "isomorphic-unfetch";
import MainComponent from "../../components/main-component/main-component";
import Link          from "next/link";
import ListView      from "../../components/global-list-view-styles";

/**
 * @param users
 * @property { string } user_name
 * @property { string } user_id
 */
const Team = ( { users } ) => {
  return (
    <MainComponent>
      <ListView>
        <ListView.H1>Hello team</ListView.H1>
        { users.length > 0 ?
          <ListView.Ul>
            { users.map( ( user, i ) =>
              <Link key={i} href={ `/user/[user]` } as={ `/user/${ user.user_id }` }>
                <ListView.A>
                  <ListView.Li>{user.user_name}</ListView.Li>
                </ListView.A>
              </Link>
            ) }
          </ListView.Ul>
          :
          <p style={{textAlign: 'center'}}>No result</p>
        }
      </ListView>
    </MainComponent>
  )
};

Team.getInitialProps = async ( { query, asPath } ) => {
  const queryUrl = asPath.substring( 6 );
  const queryUsers = await fetch( `http://localhost:8080/api/users-team/${ query.id ? query.id : queryUrl }` );

  return { users: await queryUsers.json() }
};

export default Team;
