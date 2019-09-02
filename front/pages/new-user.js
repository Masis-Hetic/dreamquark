import React         from 'react';
import fetch         from 'isomorphic-unfetch';
import NewUser       from "../components/pages/add-user/add-user.styles";
import MainComponent from "../components/main-component/main-component";
import Router        from 'next/router';

class newUser extends React.Component {
  static async getInitialProps({ asPath }) {
    const getTeams = await fetch('http://localhost:8080/api/teams');
    const getOrgas = await fetch( 'http://localhost:8080/api/organizations' );

    return { getTeams: await getTeams.json(), getOrgas: await getOrgas.json(), asPath }
  }

  state = {
    teams: [],
    orga: '',
    user: {
      name: '',
      email: '',
      teams_id: [],
      organization_id: 1
    }
  };

  handleChangeTeams = e => {
    e.persist();

    if (this.state.teams.includes( e.target.value )) {
      const teamsArray = this.state.teams.filter( r => r !== e.target.value );
      this.setState( { teams: teamsArray.map( Number ) } );
    } else {
      this.setState( prevState => ( { teams: [ ...prevState.teams, e.target.value ] } ), () =>
        this.setState( prevState => ( { user: { ...prevState.user, teams_id: this.state.teams.map( Number ) } } ) )
      );
    }
  };

  handleChangeOrga = e => {
    this.setState( { orga: Number( e.target.value ) }, () =>
      this.setState( prevState => ( { user: { ...prevState.user, organization_id: Number( this.state.orga ) } } ) )
    );
  };

  handleName = e => {
    e.persist();

    this.setState( prevState => ( {
      user: {
        ...prevState.user,
        name: e.target && e.target.value
      }
    } ) );
  };

  handleEmail = e => {
    e.persist();

    this.setState( prevState => ( {
      user: {
        ...prevState.user,
        email: e.target && e.target.value
      }
    } ) );
  };

  handleForm = e => {
    e.preventDefault();
    const data = this.state.user;

    fetch( 'http://localhost:8080/api/new-user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( data ),
    } ).then( res => res.json() )
      .then( response => {response.message; Router.push('/')} )
      .catch( error => console.error( 'Error:', error ) );
  };

  render() {
    const { teams, user } = this.state;
    const { getTeams, getOrgas, asPath } = this.props;

    return (
      <MainComponent asPath={asPath}>
        <NewUser>

          <NewUser.H1>Add new user</NewUser.H1>

          <NewUser.Form onSubmit={ this.handleForm }>
            <NewUser.Wrapper>
              <NewUser.Label htmlFor="name">Name</NewUser.Label>
              <NewUser.Input
                id="name"
                type="text"
                name="name"
                placeholder="Nom de l'utilisateur"
                value={ user.name }
                onChange={ e => this.handleName( e ) }
              />
            </NewUser.Wrapper>

            <NewUser.Wrapper>
              <NewUser.Label htmlFor="email">E-mail</NewUser.Label>
              <NewUser.Input
                id="email"
                type="email"
                name="email"
                placeholder="Email de l'utilisateur"
                value={ user.email }
                onChange={ e => this.handleEmail( e ) }
              />
            </NewUser.Wrapper>

            <NewUser.Wrapper>
              <NewUser.Label htmlFor="teams">Choisir une ou plusieurs teams</NewUser.Label>

              <NewUser.Select
                name="teams"
                id="teams"
                multiple={ true }
                value={ teams }
                onChange={ this.handleChangeTeams }
              >
                { getTeams.map( ( team, i ) => <option key={ i } value={ team.id }>{ team.name }</option> ) }
              </NewUser.Select>
            </NewUser.Wrapper>

            <NewUser.Wrapper>
              <NewUser.Label htmlFor="organization">Organisation</NewUser.Label>

              <NewUser.Select name="organization" id="organization" onChange={ this.handleChangeOrga }>
                { getOrgas.map( ( orga, i ) => <option key={ i } value={ orga.id }>{ orga.name }</option> ) }
              </NewUser.Select>
            </NewUser.Wrapper>

            <NewUser.Submit type="submit" value="Add new user"/>

          </NewUser.Form>

        </NewUser>
      </MainComponent>
    )
  }
}

export default newUser;
