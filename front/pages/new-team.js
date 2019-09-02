import React, { Component } from 'react';
import fetch                from 'isomorphic-unfetch';
import MainComponent        from "../components/main-component/main-component";
import Team                 from "../components/pages/team/team.styles";
import Router               from 'next/router';

class NewTeam extends Component {
  state = {
    team: ''
  };

  handleChange = e => this.setState({ team: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.team
    };

    fetch( 'http://localhost:8080/api/new-team', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( data ),
    } ).then( res => res.json() )
      .then( response => {
        response.message;
        Router.push( '/' )
      } )
      .catch( error => console.error( 'Error:', error ) );
  };

  render() {
    return (
      <MainComponent>
        <Team>
          <Team.H1>Add new team</Team.H1>

          <Team.Form onSubmit={this.handleSubmit}>

            <Team.Wrapper>
              <Team.Label>Team name</Team.Label>
              <Team.Input
                type="text"
                placeholder="Team name"
                value={this.state.team}
                onChange={this.handleChange}
              />
            </Team.Wrapper>

            <Team.Wrapper>
              <Team.Submit
                type="submit"
                value="Add team"
              />
            </Team.Wrapper>

          </Team.Form>
        </Team>
      </MainComponent>
    );
  }
}

export default NewTeam;
