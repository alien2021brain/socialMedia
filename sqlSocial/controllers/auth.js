const db = require('../connection/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const q = 'SELECT * FROM user WHERE username = ?';
  console.log(req.body);
  db.query(q, [req.body.username], (err, data) => {
    console.log(data);
    if (err) return res.status(400).json(err);

    if (data.length) return res.status(400).json('user already exists');
    const hash = bcrypt.hashSync(req.body.password, 10);

    const q =
      'INSERT INTO user (`username`,`email`,`password`,`name`,`img`)VALUES(?)';

    const values = [
      req.body.username,
      req.body.email,
      hash,
      req.body.name,
      req.body.img,
    ];
    db.query(q, [values], (err, result) => {
      if (err) return res.status(400).json(err);
      return res.status(200).send('user has been created successfully');
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const q = 'SELECT * FROM user WHERE username = ?';
  try {
    db.query(q, [username], (err, result) => {
      if (err) return res.status(200).send(`Error: ${err.message}`);
      if (result.length == 0) return res.status(404).json('user not found');
      if (bcrypt.compareSync(password, result[0].password)) {
        const token = jwt.sign({ id: result[0].id }, process.env.JWT_KEY);
        const { password, ...rest } = result[0];
        return res
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .status(200)
          .send(rest);
      } else return res.status(400).send('password dont exist');
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { register, login };
