'use strict';

var todoItems = [];
var todoName;
var todoList;

function pageInit() {
  document.getElementById('todoForm').onsubmit = addNewTodo;
  todoList = document.getElementById('todoList');
  todoName = document.getElementById('todoName');
}

function addNewTodo() {
  console.log('Adding a new item');
  todoItems.push(todoName.value);
  todoList.innerHTML = "";
  for (var i = 0; i < todoItems.length; ++i) {
    todoList.innerHTML += "<div><input type='checkbox'>" + todoItems[i] + "</input></div>";
  }
  todoName.value = "";

  return false;
}

if (window && document) {
  window.onload = pageInit;
}
