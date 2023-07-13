// ------------------------------------
// imported packages
// ------------------------------------

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const crypt = require("bcrypt");
const saltrounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");

// ------------------------------------
// app config and middleware
// ------------------------------------

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 240 * 1000,
    },
  })
);

// ------------------------------------
// MySQL config
// ------------------------------------

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Qwertyader54321",
  database: "ExpressiveDB",
});

// ------------------------------------
// Verify JWT
// ------------------------------------

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send({
      auth: false,
      message: "Authentication token does not exist",
    });
  } else {
    jwt.verify(token, "jwtsecret", (err, decoded) => {
      if (err) {
        res.send({
          auth: false,
          message: "Incorrect authentication token",
        });
      } else {
        req.user_id = decoded.id;
        next();
      }
    });
  }
}

// ------------------------------------
// Endpoints
// ------------------------------------

// ...
// updateData
app.patch("/user/updateprofile", (req, res) => {
  const id = req.session.user[0].user_id;
  const username = req.body.username
  const status = req.body.status

  db.query(
    'UPDATE users SET username = ?, status = ? WHERE user_id = ?',
    [username, status, id],
    (err, result) => {
      if (err) {
        res.send({err}) 
      } else {
        res.send(result)
      }
    }
  )
})

// ...
// postComment post
app.post("/post/:id/submitcomment", (req, res) => {
  const id = req.params.id;
  const content = req.body.content;
  const creator_name = req.session.user[0].username;
  const display_time = req.body.display_time;

  db.query(
    "INSERT INTO comments (post_id, content, creator_name, display_date) VALUES (?, ?, ?, ?);",
    [id, content, creator_name, display_time],
    (err, result) => {
      if (err) {
        res.send({ err });
      } else {
        res.send(result);
      }
    }
  );
});

// ...
// getAllPostComments GET
app.get(`/post/:id/comments`, (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM comments WHERE post_id = ? ORDER BY display_date ASC;", id, (err, result) => {
    if (err) {
      res.send({
        err,
      });
    } else {
      res.send(result);
    }
  });
});

// ...
// getSinglePost GET
app.get(`/getPost/:id`, (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM posts WHERE post_id = ?;", id, (err, result) => {
    if (err) {
      res.send({ err });
    } else {
      res.send(result);
    }
  });
});

// ...
// deletepost DELETE
app.delete(`/delete/:id`, (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM posts WHERE post_id = ?;", id, (err, result) => {
    if (err) {
      res.send({
        err,
      });
    } else {
      res.send(result);
    }
  });
});

// ...
// updatepost PATCH
app.patch(`/updatepost/:id`, (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;

  db.query(
    "UPDATE posts SET title = ?, content = ? WHERE post_id = ?",
    [title, content, id],
    (err, result) => {
      if (err) {
        res.send({
          err,
        });
      } else {
        res.send(result);
      }
    }
  );
});

// ...
// likepost PATCH
app.patch("/likepost/:id", (req, res) => {
  const id = req.params.id;
  const likes = req.body.likes;

  db.query(
    "UPDATE posts SET likes = ? WHERE post_id = ?",
    [likes, id],
    (err, result) => {
      if (err) {
        res.send({
          err,
        });
      } else {
        res.send(result);
      }
    }
  );
});

// ...
// getposts GET
app.get("/userposts", (req, res) => {
  const id = req.session.user[0].user_id;

  db.query(
    "SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC;",
    id,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else {
        res.send(result);
      }
    }
  );
});

// ...
// logout DELETE
app.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send({
          message: "Unable to logout",
        });
      } else {
        res.send({
          message: "Successful logout",
        });
      }
    });
  }
});

// ...
// register POST
app.post("/register", (req, res) => {
  const nameReg = req.body.nameReg;
  const passwordReg = req.body.passwordReg;

  crypt.hash(passwordReg, saltrounds, (err, hash) => {
    if (err) {
      console.error(err);
    }
    db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [nameReg, hash],
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});

// ...
// addpost POST
app.post("/addpost", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const id = req.session.user[0].user_id;
  const creator_name = req.session.user[0].username;
  const displayTime = req.body.displayTime;
  const initLikes = 0;

  db.query(
    "INSERT INTO posts (user_id, title, display_time, content, likes, creator) VALUES (?, ?, ?, ?, ?, ?)",
    [id, title, displayTime, content, initLikes, creator_name],
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send(result);
      }
    }
  );
});

// ...
// getAllPosts GET
app.get("/allposts", (req, res) => {
  db.query("SELECT * FROM posts ORDER BY created_at DESC", (err, result) => {
    if (err) {
      res.send({
        err,
      });
    } else {
      res.send(result);
    }
  });
});

// ...
// login POST
app.post("/login", (req, res) => {
  const name = req.body.usernameLog;
  const password = req.body.passwordLog;

  db.query("SELECT * FROM users WHERE username = ?;", name, (err, result) => {
    if (err) {
      res.send({ err });
    }

    if (result.length > 0) {
      crypt.compare(password, result[0].password, (err, resp) => {
        if (resp) {
          req.session.user = result;
          res.send(result);
        } else {
          res.send({
            message: "Wrond password/username",
          });
        }
      });
    } else {
      res.send({
        message: "User does not exist",
      });
    }
  });
});

// ...
// userdata GET
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({
      auth: true,
      user: req.session.user,
    });
  } else {
    res.send({
      auth: false,
    });
  }
});

app.get("/user", (req, res) => {
  const id = req.session.user[0].user_id;

  db.query(
    'SELECT * FROM users WHERE user_id = ?',
    id,
    (err, result) => {
      if (err) {
        res.send({err})
      } else {
        res.send(result)
      }
    }
  )
})

app.get('/auser/:id', (req, res) => {
  const id = req.params.id

  db.query(
    'SELECT * FROM posts WHERE user_id = ?',
    id,
    (err, result) => {
      if (err) {
        res.send({err})
      } else {
        res.send(result)
      }
    }
  )
})

// ------------------------------------
// Listen
// ------------------------------------

app.listen("8005", () => {
  console.log("server is running on port 8005");
});
