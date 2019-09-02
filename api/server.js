const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
const port = 8080;
const db = require( './queries/queries' );

app.use( bodyParser.json() );
app.use(
  bodyParser.urlencoded( {
    extended: true,
  } )
);

app.use( ( req, res, next ) => {
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Headers", "*" );

  if (req.method === 'OPTIONS') {
    res.header( "Access-Control-Allow-Methods", "PUT, PATCH, PUT, DELETE, GET, POST" );
    return res.status( 200 ).json( {} );
  }

  next();
} );

app.get( '/api', db.getUsers );

app.get( '/api/user/:id', db.getUser );

app.post( '/api/new-user', db.newUser );

app.get( '/api/users-team/:id', db.getUsersTeam );

app.get( '/api/team/:id', db.getTeam );

app.get( '/api/teams', db.getTeams );

app.post( '/api/new-team', db.newTeam );

app.get( '/api/organization/:id', db.getOrga );

app.get( '/api/organizations', db.getOrgas );

app.post( '/api/new-organization', db.newOrga );

app.listen( port, () => {
  console.log( `App running on port ${ port }.` )
} );
