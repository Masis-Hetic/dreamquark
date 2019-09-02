import React         from "react";
import fetch         from "isomorphic-unfetch";
import MainComponent from "../components/main-component/main-component";
import ListView      from "../components/global-list-view-styles";
import Link          from "next/link";

const Organizations = ( { orgas, asPath } ) => {
  return (
    <MainComponent asPath={ asPath }>
      <ListView.H1>List of organizations</ListView.H1>

      <ListView.Ul>
        { orgas.map((orga, i) =>
          <ListView.Li key={i}>
            <Link href={{ pathname: `/organization/[organization]`, query: { id: orga.id } }} as={ `/organization/${ orga.id }` }>
              <ListView.A>{orga.name}</ListView.A>
            </Link>
          </ListView.Li>
        ) }
      </ListView.Ul>
      
    </MainComponent>
  )
};

Organizations.getInitialProps = async ( { asPath } ) => {
  const orgas = await fetch( 'http://localhost:8080/api/organizations' );
  return { orgas: await orgas.json(), asPath }
};

export default Organizations;
