CREATE DATABASE ExpressiveDB;

CREATE TABLE users {
  user_id INT NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  status VARCHAR(255),
  PRIMARY KEY(user_id)
}

CREATE TABLE posts {
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  TIMESTAMP NOT NULL,
  display_date TEXT NOT NULL,
  PRIMARY KEY(post_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
}

CREATE TABLE comments {
  comment_id INT NOT NULL,
  post_id INT NOT NULL,
  creator VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  TIMESTAMP NOT NULL,
  display_date TEXT NOT NULL,
  PRIMARY KEY(comment_id),
  FOREIGN KEY(post_id) REFERENCES posts(post_id)
}
