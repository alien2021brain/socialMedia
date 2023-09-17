const db = require('../connection/connection.js');

const getLikes = (req, res) => {
  const q = 'SELECT * FROM likes WHERE postId=?';
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(400).send(`error in fetchin data ${err}`);
    return res.status(200).send(data.map((item) => item.userId));
  });
};

const addLikes = (req, res) => {
  const q = 'INSERT INTO likes (`userId`,`postId`) VALUES (?)';
  const values = [req.id, req.body.postId];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send('likes added successfully');
  });
};
const deleteLikes = (req, res) => {
  console.log(req.params.id, 'delete');
  const q = 'DELETE FROM likes WHERE userId=? AND postId=?';

  db.query(q, [req.id, req.params.id], (err, result) => {
    if (err) return res.status(400).send(`cannot delete likes ${err}`);
    return res.status(200).send('deleted successfully');
  });
};

module.exports = { getLikes, addLikes, deleteLikes };
