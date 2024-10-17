const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  const error = new Error('No autorizado');
  error.status = 403;
  next(error);
})

module.exports = router