import React         from "react";
import fetch         from "isomorphic-unfetch";
import MainComponent from "../../components/main-component/main-component";
import ListView      from "../../components/global-list-view-styles";
import Link          from "next/link";

/**
 * @param organization
 * @property { string } user_name
 * @property { string } user_id
 */
const Organization = ( { organization } ) => {
  return (
    <MainComponent>
      <ListView>
        <ListView.H1>Organization Users</ListView.H1>
        { organization.length > 0 ?
        <ListView.Ul>
          { organization.map( ( orga, i ) =>
              <ListView.Li>
                <Link key={ i } href={{ pathname: `/user/[user]` }} as={ `/user/${ orga.user_id }` }>
                  <ListView.A>{ orga.user_name }</ListView.A>
                </Link>
              </ListView.Li>
          ) }
        </ListView.Ul>
          :
          <p style={{textAlign: 'center'}}>No result</p>
        }
      </ListView>
    </MainComponent>
  )
};

Organization.getInitialProps = async ( { query, asPath } ) => {
  const queryUrl = asPath.substring( 15 );
  const getOrganization = await fetch( `http://localhost:8080/api/organization/${ query.id ? query.id : queryUrl }` );

  return {
    organization: await getOrganization.json()
  }
};

export default Organization;
