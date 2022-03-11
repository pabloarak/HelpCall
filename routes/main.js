const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json({
    Title: 'Hello World',
  });
});

router.post('/topsecret', (req, res) => {
  const { body: satellites } = req;

  console.log(satellites);

  res.status(200).json({
    data: 'test',
    message: 'testeado',
  });
});

module.exports = router;
