const db = require('../connection/connection.js');
const moment = require('moment');

const comments = (req, res, next) => {
  const postId = req.params.id;
  console.log(postId, 'postid');
  const query = `
    SELECT c.*, u.id AS userId, u.username, u.img AS profile
    FROM comments AS c
    JOIN user AS u ON c.userId = u.id
    WHERE postId = ?
    ORDER BY c.createdAt DESC
  `;

  db.query(query, [postId], (err, data) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to retrieve comments' });
    }

    return res.status(200).send(data);
  });
};

const addCommments = (req, res, next) => {
  const q =
    'INSERT INTO comments (`desc`,`createdAT`,`userId`,`postId`)VALUES (?)';
  const values = [
    req.body.desc,
    moment().format('MMMM Do YYYY, h:mm:ss a'),
    req.id,
    req.body.postId,
  ];
  db.query(q, [values], (err, results) => {
    if (err)
      return res.status(400).send(`Couldn't insert comment ${err.message}`);
    return res.status(200).send('Commments added sucessfully');
  });
};

module.exports = { comments, addCommments };
