var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "database.sqlite";

let db = new sqlite3.Database(DBSOURCE, err => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite database.");
    db.run(
      `CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            joinTime DATETIME DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      err => {
        if (err) {
          console.log("1:" + err);
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO users (name, email, password) VALUES (?,?,?)";
          db.run(insert, ["admin", "admin@example.com", "admin"]);
          db.run(insert, ["user", "user@example.com", "user"]);
        }
      }
    );
    db.run(
      `CREATE TABLE events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            start DATETIME, 
            end DATETIME, 
            details text,
            color text,
            onwer text,
            share text,
            location text,
            addTime DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,
      err => {
        if (err) {
          console.log("2:" + err);
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO events (name, start,end,details,color,onwer,share,location) VALUES (?,?,?,?,?,?,?,?)";
          db.run(insert, [
            "test event",
            "2019-12-20 2:00",
            "2019-12-20 3:00",
            "test for god 15:00",
            "deep-purple",
            "admin",
            "",
            "Taiwan"
          ]);
          db.run(insert, [
            "test event 2",
            "2019-12-15 15:00",
            "2019-12-15 16:00",
            "test for good",
            "primary",
            "admin",
            "",
            "Taiwan"
          ]);
          db.run(insert, [
            "test event 3",
            "2019-12-16 17:00",
            "2019-12-16 18:00",
            "test for good",
            "primary",
            "user",
            "",
            "Taiwan"
          ]);
          db.run(insert, [
            "test event 4",
            "2019-12-16 16:00",
            "2019-12-16 19:00",
            "test for good",
            "primary",
            "user",
            "",
            "Taiwan"
          ]);
        }
      }
    );
  }
});

module.exports = db;
