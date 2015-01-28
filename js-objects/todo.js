// Sample code from class todo
'use strict';

var todoItems = [];
var todoName;
var todoDesc;
var todoList;

function pageInit() {
  document.getElementById('todoForm').onsubmit = addNewTodo;
  todoList = document.getElementById('todoList');
  todoName = document.getElementById('todoName');
  todoDesc = document.getElementById('todoDesc');
}

function addNewTodo() {
  console.log('Adding a new item');
  var todo = {
    name: todoName.value,
    desc: todoDesc.value
  };
  todoItems.push(todo);

  todoList.innerHTML = "";
  for (var i = 0; i < todoItems.length; ++i) {
    todoList.innerHTML += "<div>" +
    "<input type='checkbox'>" + todoItems[i].name + "</input>" +
    "<span>" + todoItems[i].desc + "</span>"
    "</div>";
  }
  todoName.value = "";

  return false;
}

if (window && document) {
  window.onload = pageInit;
}
