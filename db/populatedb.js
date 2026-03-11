#! /usr/bin/env node

// At the top of populatedb.js
const userArgs = process.argv.slice(2);

// Check if a URL was provided as an argument, otherwise look for an environment variable
const connectionString = userArgs[0] || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Error: Please provide a database connection string as an argument or set DATABASE_URL.");
  process.exit(1);
}

const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  text VARCHAR ( 500 ) NOT NULL,
  username VARCHAR ( 100 ) NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username) 
VALUES
  ('Hello World!', 'Denver'),
  ('I love you!', 'Emily'),
  ('Give it your best shot!', 'Gary');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();