const db = require('../../data/db-config')

const getAll =  async () => {
  const rows = await db('accounts').select('id', 'name', 'budget')
  return rows
}

const getById = async (id) => {
  const account = await db('accounts').select('id', 'name', 'budget').where('id', id).first()
  return account
}

const create = async (account) => {
  // insert into accounts (name, budget) values ('foo', 1000);
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts').update(account).where('id', id)
  const updated = await getById(id)
  return updated
}

const deleteById = async (id) => {
  await db('accounts').delete().where('id', id)
  return `the account has been nuked`
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
