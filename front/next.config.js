const fetch = require('isomorphic-unfetch');

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    return config
  },
  async exportPathMap() {
    // Dynamic routes for /user/:id
    const users = await fetch('http://localhost:8080/api');
    const usersResponse = await users.json();

    const userURL = usersResponse.reduce(
      (base, current) => (Object.assign({}, base, {
        [ `/user/${current.id}` ]: {
          page: '/user/[user]',
          query: { id: current.id },
        }
      })), {}
    );

    // Dynamic routes for /team/:id
    const teams = await fetch('http://localhost:8080/api/teams');
    const teamsResponse = await teams.json();
    
    const teamURL = teamsResponse.reduce(
      (base, current) => (Object.assign({}, base, {
        [ `/team/${current.id}` ]: {
          page: `/team/[team]`,
          query: { id: current.id },
        }
      })), {}
    );

    // Dynamic routes for /organization/:id
    const organizations = await fetch('http://localhost:8080/api/organizations');
    const organizationsResponse = await organizations.json();

    const organizationsURL = organizationsResponse.reduce(
      (base, current) => (Object.assign({}, base, {
        [ `/organization/${current.id}` ]: {
          page: '/organization/[organization]',
          query: { id: current.id },
        }
      })), {}
    );

    return Object.assign( {}, userURL, teamURL, organizationsURL, {
      '/': { page: '/' },
      '/teams': { page: '/teams' },
      '/organizations': { page: '/organizations' }
    } );
  }
};
