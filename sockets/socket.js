const {
  getAll,
  create,
  remove,
  update,
 } = require('./utils/utils');

/* QUANDO UM USUÁIRO É CONECTADO */
module.exports = (io) => io.on('connection', async (socket) => {
  await getAll(socket);

  /* CRIAR TAREFA */
  socket.on('postTask', async obj => {
    create(obj);
    await getAll(socket);
  });

  /* ATUALIZA TAREFA */
  socket.on('putTask', async ({ id, obj }) => {
    console.log(id)
    update(id, obj)
    await getAll(socket);
  });

  /* EXCLUIR TAREFA */
  socket.on('deleteTask', async id => {
    remove(id.toString())
    await getAll(socket);
  });

});
