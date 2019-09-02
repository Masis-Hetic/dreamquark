import React         from 'react';
import fetch         from 'isomorphic-unfetch';
import Head          from '../components/head'
import Link          from 'next/link';
import MainComponent from "../components/main-component/main-component";
import Index         from "../components/pages/index/index.styles";

const Home = ( { users, asPath } ) => (
  <MainComponent asPath={asPath}>
    <Head title="Home"/>
    <Index>

      <Index.Wrapper>
        <Index.H1>List of users</Index.H1>
        <Index.Ul>
          <Index.FirstRow>
            <Index.FirstColumn>Id</Index.FirstColumn>
            <Index.SecondColumn>Name</Index.SecondColumn>
            <Index.ThirdColumn>Email</Index.ThirdColumn>
            <Index.ForthColumn>Organization</Index.ForthColumn>
            <Index.FifthColumn>Team(s)</Index.FifthColumn>
          </Index.FirstRow>

          { users.map( ( user, i ) =>
            <Index.Li key={ i }>
              <Link
                href={ { pathname: `/user/[user]`, query: { id: user.user_id } } }
                as={ `/user/${ user.user_id }` }
              >
                <Index.A>
                  <Index.FirstColumn>{ user.user_id }</Index.FirstColumn>
                  <Index.SecondColumn>{ user.user_name }</Index.SecondColumn>
                  <Index.ThirdColumn>{ user.user_email}</Index.ThirdColumn>
                  <Index.ForthColumn>{ user.organization_name}</Index.ForthColumn>
                  <Index.FifthColumn>{ user.team_name.map((t, i) => (i + 1) < user.team_name.length ? `${ t }, ` : `${ t }` )}</Index.FifthColumn>
                </Index.A>
              </Link>
            </Index.Li>
          ) }

        </Index.Ul>
      </Index.Wrapper>

    </Index>
  </MainComponent>
);

Home.getInitialProps = async ( {asPath} ) => {
  const res = await fetch( 'http://localhost:8080/api' );

  return {
    users: await res.json(),
    asPath
  };
};

export default Home
