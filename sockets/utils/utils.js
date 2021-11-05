const { dateConvertBrasilAMPM } = require('./dateService.js');
const { create, getAll, remove, update } = require('./dataBaseService.js');


// Cria um objeto de usuário contendo o id do socket.id e o nome;
// const createObjUser = (socketId) => {
//   const obj = { id: socketId, name: nickGenerator(socketId) };
//   return obj;
// };


module.exports = {
  getAll,
  create,
  remove,
  update,
 };
