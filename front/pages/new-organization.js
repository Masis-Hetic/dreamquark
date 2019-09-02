import React, { Component } from 'react';
import fetch                from 'isomorphic-unfetch';
import MainComponent        from "../components/main-component/main-component";
import Orga                 from "../components/pages/organization/organization.styles";
import Router               from 'next/router';

class NewOrganization extends Component {
  static async getInitialProps({ asPath }) {

    return { asPath }
  };

  state = {
    orga: ''
  };

  handleChange = e => {
    this.setState( { orga: e.target.value } );
  };

  handleSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.orga
    };

    fetch( 'http://localhost:8080/api/new-organization', {
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
    const { asPath } = this.props;

    return (
      <MainComponent asPath={asPath}>

        <Orga>
          <Orga.H1>Add organization</Orga.H1>

          <Orga.Form onSubmit={this.handleSubmit}>

            <Orga.Wrapper>
              <Orga.Label>Organization name :</Orga.Label>
              <Orga.Input
                type="text"
                placeholder="Organization name"
                value={ this.state.orga }
                onChange={ this.handleChange }
              />
            </Orga.Wrapper>

            <Orga.Wrapper>
              <Orga.Submit
                type="submit"
                value="Add new organization"
              />
            </Orga.Wrapper>

          </Orga.Form>
        </Orga>
      </MainComponent>
    );
  }
}

export default NewOrganization;
