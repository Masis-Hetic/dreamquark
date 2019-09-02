import React         from "react";
import fetch         from "isomorphic-unfetch";
import MainComponent from "../components/main-component/main-component";
import ListView      from "../components/global-list-view-styles";
import Link          from "next/link";

const Teams = ( { teams, asPath } ) => {
  return (
    <MainComponent asPath={ asPath }>
      <ListView.H1>List of teams</ListView.H1>

      <ListView.Ul>
        { teams.map((team, i) =>
          <ListView.Li key={i}>
            <Link href={ { pathname: `/team/[team]`, query: { id: team.id } } } as={ `/team/${ team.id }` }>
              <ListView.A>{team.name}</ListView.A>
            </Link>
          </ListView.Li>
        ) }
      </ListView.Ul>

    </MainComponent>
  )
};

Teams.getInitialProps = async ( { asPath } ) => {
  const teams = await fetch( 'http://localhost:8080/api/teams' );

  return { teams: await teams.json(), asPath }
};

export default Teams;
