const db = require('../connection/connection.js');
const moment = require('moment');

const getPosts = (req, res) => {
  const { userId } = req.query;

  const q =
    userId != 'undefined'
      ? 'SELECT p.*, u.id AS userId, name, u.img AS profile FROM posts AS p JOIN user AS u ON (u.id = p.userId ) WHERE p.userId =?'
      : 'SELECT p.*, u.id AS userId, name, u.img AS profile FROM posts AS p JOIN user AS u ON (u.id = p.userId ) LEFT JOIN follow AS f ON (p.userId = f.followingUserId) WHERE f.followerUserId = ? OR p.userId = ?';

  db.query(
    q,
    [userId != 'undefined' ? userId : req.id, req.id],
    (err, data) => {
      if (err) return res.status(403).send('Error: ' + err.message);

      return res.status(200).send(data);
    }
  );
};

const addPosts = (req, res) => {
  console.log(req.body, req.id, 'addPosts');
  const q = 'INSERT INTO posts (`desc`,`img`,`userID`,`createdAT`) VALUES (?)';

  db.query(
    q,
    [
      [
        req.body.desc,
        req.body.image,
        req.id,
        moment().format('MMMM Do YYYY, h:mm:ss a'),
      ],
    ],
    (err, data) => {
      if (err)
        return res.status(400).send(`something went wrong while adding ${err}`);
      return res.status(200).send('post added succesfully');
    }
  );
};

module.exports = { getPosts, addPosts };
