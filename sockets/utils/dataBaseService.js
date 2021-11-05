const { dateConvertBrasilAMPM } = require('./dateService.js');
const Model = require('../../layers/taskList/taskListModels.js');

const create = async (obj) => {
  try {
    await Model.create(obj);
  } catch (err) { return console.log(err); }
};

const getAll = async (socket) => {
  try {
  const taskList = await Model.getAll();
  socket.emit('getTask', taskList);
  return taskList;
  } catch (err) { return console.log(err); }
};

const remove = async (id) => {
  try {
    await Model.remove(id);
  } catch (err) { return console.log(err); }
};

const update = async (id, obj) => {
  try {
    await Model.update(id, obj);
  } catch (err) { return console.log(err); }
};

module.exports = { create, getAll, remove, update };
