const uploadSingle = (req, res) => {
  const { path } = req.file;
  const url = path.replace('public', '');
  url
    ? res.status(200).send(`http://localhost:8000${url}`)
    : res.status(404).send('something went wrong');
};

module.exports = { uploadSingle };
