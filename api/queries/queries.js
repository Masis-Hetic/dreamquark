require('dotenv').config();

const Pool = require( 'pg' ).Pool;
const pool = new Pool( {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
} );

/**
 * localhost:8080/api
 * @param request
 * @param response
 */
const getUsers = (request, response) => {
  const queryUsers = `
  SELECT
      users.id as user_id ,
      users.name as user_name,
      users.email as user_email,
      organizations.name as organization_name,
      array_agg(teams.name) as team_name
  FROM users
      JOIN organizations ON users.organization_id = organizations.id
      JOIN users_teams ON users.id = users_teams.users_id
      JOIN teams ON teams.id = users_teams.teams_id
  GROUP BY users.id, users.name, users.email, organizations.name ORDER BY users.id ASC`;

  pool.query(queryUsers, (err, results) => {
    if (err) throw err;
    response.status(200).json(results.rows);
  })
};

/**
 * localhost:8080/api/user/:id
 * @param request
 * @param response
 */
const getUser = (request, response) => {
  const queryUser = `
  SELECT
      users.id as user_id ,
      users.name as user_name,
      users.email as user_email,
      organizations.name as organization_name,
      array_agg(teams.name) as team_name
  FROM users
      JOIN organizations ON users.organization_id = organizations.id
      JOIN users_teams ON users.id = users_teams.users_id
      JOIN teams ON teams.id = users_teams.teams_id
  WHERE users.id = ${ request.params.id }
  GROUP BY users.id, users.name, users.email, organizations.name`;

  pool.query(queryUser, (err, result) => {
    if (err) throw err;
    if (result.rows.length === 0) {
      response.statusMessage = 'No result';
      response.status(204).end();
    } else {
      response.status(200).json(result.rows);
    }
  });
};

/**
 * localhost:8080/api/new-user
 * @property { string } name
 * @property { string } email
 * @property { number } organization_id
 * @property { array } teams_id
 * @param request
 * @param response
 */
const newUser = async ( request, response ) => {
  ( async () => {
    const client = await pool.connect();
    try {
      await client.query( 'BEGIN' );
      const inserUser = 'INSERT INTO users(name, email, organization_id) VALUES($1, $2, $3) RETURNING id';
      const { rows } = await client.query( inserUser, [ request.body.name, request.body.email, request.body.organization_id ] );

      let j = 0;
      const values = request.body.teams_id.map((id, i) => {
        const result = `($${ i + 1 + j }, $${ i + 2 + j })`;
        j += 1;
        return result;
      }).join(', ');

      const insertUsersTeams = request.body.teams_id.flatMap( ( id, i ) => [ rows[ 0 ].id, request.body.teams_id[ i ] ] );

      const queryInUsersTeam = `INSERT INTO users_teams(users_id, teams_id) VALUES ${ values }`;
      await client.query( queryInUsersTeam, insertUsersTeams );
      await client.query( 'COMMIT' );
    } catch (e) {
      await client.query( 'ROLLBACK' );
      throw e;
    } finally {
      response.status( 200 ).send( { message: 'User is created!' } );
      client.release();
    }
  } )().catch( e => console.error( e.stack ) );
};

/**
 * localhost:8080/api/users-team/:id
 * @property { string } name as user_name
 * @property { string } email as user_email
 * @property { number } id as user_id
 * @property { string } name as team_name
 * @param request
 * @param response
 */
const getUsersTeam = (request, response) => {
  const queryUser = `
  SELECT 
       users.id as user_id, 
       users.name as user_name, 
       users.email as user_email, 
       teams.name as team_name 
  FROM users
  JOIN users_teams 
      ON users.id = users_teams.users_id 
  JOIN teams 
      ON teams.id = users_teams.teams_id 
  WHERE teams.id = ${ request.params.id }`;

    pool.query(queryUser, (err, results) => {
    if (err) throw err;
    response.status(200).json(results.rows);
  });
};

/**
 * @property { string } name
 * @property { string } email
 * @param request
 * @param response
 */
const getOrganizationUsers = (request, response) => {
  const query = `
  SELECT 
      users.id as user_id,
      users.name as user_name,
      users.email as user_email,
      organizations.name as organization_name
  FROM users
  JOIN organizations
      ON users.organization_id = organizations.id
  WHERE organizations.id = ${ request.params.id }`;

  pool.query(query, (err, results) => {
    if (err) throw err;
    response.status(200).json(results.rows);
  });
};

/**
 * localhost:8080/api/teams
 * @property { string } name
 * @param request
 * @param response
 */
const getTeams = (request, response) => {
  pool.query(`SELECT id, name FROM teams`, (err, results) => {
    if (err) throw err;
    response.status(200).json(results.rows);
  });
};

/**
 * localhost:8080/api/new-team
 * @property { string } name
 * @param request
 * @param response
 */
const newTeam = (request, response) => {
  pool.query(`INSERT INTO teams (name) VALUES ($1)`,
    [ request.body.name ], err => {
    if (err) throw err;
    response.status( 200 ).send( { message: 'Team is created!' } )
  });
};

/**
 * @property { string } name
 * @param request
 * @param response
 */
const getOrgas = (request, response) => {
  pool.query(`SELECT id, name FROM organizations`, (err, results) => {
    if (err) throw err;
    response.status(200).json(results.rows);
  });
};

/**
 * localhost:8080/api/new-organization
 * @property { string } name
 * @param request
 * @param response
 */
const newOrga = (request, response) => {
  pool.query(`INSERT INTO organizations (name) VALUES ($1)`,
    [ request.body.name ], err => {
    if (err) throw err;
    response.status(200).send( { message: 'Organization is created!' } )
  });
};

/**
 * @property { string } name
 * @param request
 * @param response
 */
const getTeam = (request, response) => {
  pool.query( `SELECT id, name FROM teams WHERE teams.id = ${ request.params.id }`, (err, result) => {
    if (err) throw err;
    if (result.rows.length === 0) {
      response.statusMessage = 'No result';
      response.status(200).json([]);
      return;
    }
    response.status( 200 ).json( result.rows );
  } );
};

/**
 * localhost:8080/api/organization/:id
 * @property { string } name
 * @param request
 * @param response
 */
const getOrga = (request, response) => {
  const query = `
  SELECT 
      users.id as user_id,
      users.name as user_name,
      users.email as user_email,
      organizations.name as organization_name
  FROM users
  JOIN organizations
      ON users.organization_id = organizations.id
  WHERE organizations.id = ${ request.params.id }`;

  pool.query( query, (err, result) => {
    if (err) throw err;
    if (result.rows.length === 0) {
      response.statusMessage = 'No result';
      response.status(200).json([]);
      return;
    }

    response.status( 200 ).json( result.rows );
  });
};

module.exports = {
  getUsers,
  getUser,
  newUser,
  getUsersTeam,
  getTeams,
  newTeam,
  newOrga,
  getOrgas,
  getTeam,
  getOrga,
  getOrganizationUsers
};
