const router = require('express').Router()
const Accounts = require('./accounts-model');
const { checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware');
const { json } = require('express/lib/response');

router.get('/', async (req, res, next) => {
  try {
    const  accounts = await Accounts.getAll()
    res.json(accounts)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => { 
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAcc = await Accounts.create(req.body)
    res.status(201).json(newAcc)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const account = await Accounts.updateById(req.params.id, req.body)
    res.json(account)
  } catch(err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const destroy = await Accounts.deleteById(req.params.id)
    res.json(destroy)
  } catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
})
})

module.exports = router;
