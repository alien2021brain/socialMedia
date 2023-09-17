const db = require('../connection/connection.js');

const getFollower = (req, res) => {
  const q = 'SELECT followerUserId from follow WHERE followingUserId=?';
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(400).send(`something went wrong ${err}`);

      return res.status(200).send(data.map((item) => item.followerUserId));
    });
  } catch (error) {
    return res.status(404).send(`something went wrong ${error}`);
  }
};
const addFollower = (req, res) => {
  console.log('addFollower', req.params.id);
  const q =
    'INSERT INTO follow (`followerUserId`,`followingUserId`) VALUES (?)';
  const values = [req.id, req.params.id];

  db.query(q, [values], (err, result) => {
    if (err) return res.status(400).send(`something went wrong ${err}`);
    return res.status(200).send('success follwed');
  });
};

const deleteFollower = (req, res) => {
  console.log('deleteFollower', req.params.id);
  const q = 'DELETE FROM follow WHERE followerUserId = ? AND followingUserId=?';
  db.query(q, [req.id, req.params.id], (err, result) => {
    if (err) return res.status(400).send(`Failed to delete ${err}`);
    return res.status(200).send(`Successfully deleted`);
  });
};

module.exports = { getFollower, addFollower, deleteFollower };
