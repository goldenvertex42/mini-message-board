#! /usr/bin/env node

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
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();