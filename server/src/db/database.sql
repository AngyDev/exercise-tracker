CREATE TABLE exercises
(
  _id         VARCHAR NOT NULL,
  userId      VARCHAR NOT NULL,
  duration    INTEGER NOT NULL,
  description VARCHAR NOT NULL    ,
  date        DATE    NOT NULL    ,
  PRIMARY KEY (_id)
  FOREIGN KEY (userId) REFERENCES users(_id)
);

CREATE TABLE users
(
  _id      VARCHAR NOT NULL,
  username VARCHAR NOT NULL,
  PRIMARY KEY (_id)
);

INSERT INTO users (_id, username) VALUES ("41b3ab60-73bc-45ba-926d-b253e1cea8b4", "test");