const router = require('express').Router()
const Accounts = require('./accounts-model');
const { checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account)
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: 'Something went wrong'
})
})

module.exports = router;
