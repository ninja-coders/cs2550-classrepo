'use strict';

var TodoModel = (function() {
  var TASK_KEY = 'todoTasks';
  var ID_KEY = 'todoNextId';

  function TodoModel() {
    this.$$storage = window.localStorage;
    this.$$tasks = [];
    this.$$nextTaskId = 0;
    this.$$init();
  }

  TodoModel.prototype.$$init = function() {
    var taskData = this.$$storage.getItem(TASK_KEY);
    this.$$tasks = taskData === null ? [] : JSON.parse(taskData);

    var nextTaskId = this.$$storage.getItem(ID_KEY);
    this.$$nextTaskId = nextTaskId === null ? 1 : parseInt(nextTaskId);
  };

  TodoModel.prototype.$$saveTasks = function() {
    this.$$storage.setItem(TASK_KEY, JSON.stringify(this.$$tasks));
    this.$$storage.setItem(ID_KEY, this.$$nextTaskId);
  };

  TodoModel.prototype.$addTask = function(task) {
    task.id = this.$$nextTaskId++;
    this.$$tasks.push(task);
    this.$$saveTasks();
  };

  TodoModel.prototype.$removeTask = function(taskId) {
    var indexOfTask = -1;
    for (var i = 0; i < this.$$tasks.length; ++i) {
      if (this.$$tasks[i].id === taskId) {
        indexOfTask = i;
        break;
      }
    }

    if (indexOfTask >= 0) {
      this.$$tasks.splice(indexOfTask, 1);
      this.$$saveTasks();
    }
  };

  TodoModel.prototype.$getTasks = function() {
    return this.$$tasks;
  };

  return TodoModel;
})();


var TodoController = (function() {
  function TodoCtrl(view, model) {
    this.$$view = view;
    this.$$model = model;
    this.$$init();
  }

  TodoCtrl.prototype.$$init = function() {
    var self = this;
    this.$$view.$registerTaskCompletedEvent(function(taskId) {
      self.$$taskComplete(taskId);
    });
    this.$$view.$registerNewTaskEvent(function(task) {
      self.$$newTask(task);
    });

    this.$$update();
  };

  TodoCtrl.prototype.$$update = function() {
    this.$$view.$renderTasks(this.$$model.$getTasks());
  };

  TodoCtrl.prototype.$$taskComplete = function(taskId) {
    this.$$model.$removeTask(taskId);
    this.$$update();
  };

  TodoCtrl.prototype.$$newTask = function(task) {
    this.$$model.$addTask(task);
    this.$$update();
  };

  return TodoCtrl;
})();

var TodoView = (function() {
  function TodoView() {
    this.$$divList = document.getElementById('list');
    this.$$addTaskForm = document.getElementById('taskform');
    this.$$addButton = document.getElementById('createnew');
    this.$$updateButton = document.getElementById('updatebutton');
    this.$$listForm = document.getElementById('listform');
    this.$$titleText = document.getElementById('newtask');
    this.$$descText = document.getElementById('newtaskdesc');
    this.$$newTaskEvents = [];
    this.$$taskCompletedEvents = [];
    this.$$init();
  }

  TodoView.prototype.$$init = function() {
    this.$$divList.innerHTML = '';
    this.$$listForm.addEventListener('submit', function(e) { e.preventDefault(); });
    this.$$updateButton.style.display = 'none';

    var self = this;
    this.$$addTaskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      self.$$addClicked();
    });
  };

  TodoView.prototype.$$addClicked = function() {
    var title = this.$$titleText.value;
    var desc = this.$$descText.value;

    this.$$fireNewTaskEvent(title, desc);

    this.$$titleText.value = '';
    this.$$descText.value = '';
    this.$$titleText.focus();
  };

  TodoView.prototype.$$fireNewTaskEvent = function(title, desc) {
    var self = this;
    this.$$newTaskEvents.forEach(function(f) {
      f({ title: title, desc: desc });
    });
  };

  TodoView.prototype.$registerNewTaskEvent = function(func) {
    this.$$newTaskEvents.push(func);
  };

  TodoView.prototype.$registerTaskCompletedEvent = function(func) {
    this.$$taskCompletedEvents.push(func);
  };

  TodoView.prototype.$$fireTaskCompletedEvent = function(taskId) {
    this.$$taskCompletedEvents.forEach(function(f) {
      f(taskId);
    });
  };

  TodoView.prototype.$renderTasks = function(tasks) {
    var self = this;
    this.$$divList.innerHTML = '';
    tasks.forEach(function(t) {
      var div = document.createElement('div');
      div.className = 'todoitem';

      var check = document.createElement('input');
      check.type = 'checkbox';
      check.value = t.id;
      check.addEventListener('change', function() {
        self.$$fireTaskCompletedEvent(t.id);
      });
      div.appendChild(check);

      var title = document.createElement('span');
      title.innerText = t.title;
      title.className = 'title';
      div.appendChild(title);

      var desc = document.createElement('span');
      desc.innerText = t.desc;
      desc.className = 'description';
      div.appendChild(desc);

      self.$$divList.appendChild(div);
    });
  };

  return TodoView;
})();

if (window.addEventListener) {
  window.addEventListener('load', function() {
    if (window.localStorage) {
      var view = new TodoView();
      var model = new TodoModel();
      new TodoController(view, model);
    }
  });
}
