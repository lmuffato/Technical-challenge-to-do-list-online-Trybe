const socket = window.io();

const dataTestId = 'data-testid';

socket.on('getTask', (arr) => getAllTaskList(arr));

const getEleById = (id) => document.getElementById(id);

const taskUlElement = getEleById('task-ul');
const form = getEleById('form-msg');
const inputTaskInfo = getEleById('input-task-info');
const inputTaskDeadLine = getEleById('input-task-deadLine');
const inputTaskStatus = getEleById('input-task-status');
const btnPost = getEleById('btn-post');
const btnPut = getEleById('btn-put');
const btnDelete = getEleById('btn-delete');

let selectedElement = '';

// Envia dados para o servidor do socket
const sendSocketCommunication = (field, obj) => {
  socket.emit(field, obj);
};

const emptyFieldVerify = (inputId) => {
  const input = inputId.value;
  if (!input || input === '') throw new Error('empty Field');
  return false;
};

const createDataObject = () => {
  try {
    const obj = {
      status: inputTaskStatus.value,
      description: inputTaskInfo.value,
      initialDate: new Date(),
      deadline: inputTaskDeadLine.value,
    }
    return obj;
  } catch(err) { return console.log(err)}
};

const createTask = () => {
  socket.emit('postTask', createDataObject());
};

const updateTask = () => {
  const obj = { id: selectedElement, obj: createDataObject() }
  socket.emit('putTask', obj);
};

const deleteTask = () => {
  socket.emit('deleteTask', selectedElement);
};

const callFunctionByClickBtnPost = (func) => {
  btnPost.addEventListener('click', (event) => {
    event.preventDefault();
    return func();
  });
};

const callFunctionByClickBtnPut = (func) => {
  btnPut.addEventListener('click', (event) => {
    event.preventDefault();
    return func();
  });
};

const callFunctionByClickBtnDelete = (func) => {
  btnDelete.addEventListener('click', (event) => {
    event.preventDefault();
    return func();
  });
};

callFunctionByClickBtnPost(createTask);
callFunctionByClickBtnPut(updateTask);
callFunctionByClickBtnDelete(deleteTask);

const removeElementByClassName = (id) => {
  const arr = document.querySelectorAll(`.${id}`);
  arr.forEach((ele) => ele.remove());
};

const addEventListenerTaskList = (ele) => {
  ele.addEventListener('click', (event) => {
    selectedElement = event.target.id;
    console.log(selectedElement);
  });
};

const createElementLi = (obj, id) => {
  const { _id, status, description, initialDate, deadline,  } = obj;
  const text = `${status}:${description}`;
  const li = document.createElement('li');
  addEventListenerTaskList(li);
  li.setAttribute(dataTestId, 'task-li');
  li.className = 'task-li';
  li.id = _id;
  li.innerText = text;
  taskUlElement.appendChild(li);
};

// Recurar o histórico de mensagens
const getAllTaskList = (arr) => {
  console.log(arr);
  removeElementByClassName('task-li');
  arr.forEach((ele) => {
    createElementLi(ele, 'task-li')
  });
};

window.onload = () => {
  // sendObjToServer();
};
