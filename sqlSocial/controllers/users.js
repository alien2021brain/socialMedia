const db = require('../connection/connection.js');

const users = (req, res) => {
  const q = 'SELECT * FROM user';
  db.query(q, (err, result) => {
    if (err) return res.status(400).send(`something went wrong ${err}`);
    return res.status(200).send(result);
  });
};
const updateUser = (req, res) => {
  const q =
    'UPDATE user JOIN userdetails ON user.id = userdetails.userId SET user.name = ?,user.email=?,user.img=?,userdetails.cover=?, userdetails.city = ? WHERE user.id = ?';

  db.query(
    q,
    [
      req.body.name,
      req.body.email,
      req.body.img,
      req.body.cover,
      req.body.city,
      req.id,
    ],
    (err, result) => {
      if (err) return res.status(400).send(`something went wrong ${err}`);

      return res.status(200).send('sucessfully updated');
    }
  );
};

const singleUsers = (req, res) => {
  const { id } = req.params;
  const q =
    'SELECT u.*,d.* FROM user as u JOIN userdetails as d ON (u.id = d.userId)  WHERE u.id=?';
  db.query(q, [id], (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(result);
  });
};

module.exports = { users, singleUsers, updateUser };
