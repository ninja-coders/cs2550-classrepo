'use strict';

function addNumbers(Y) {
  var element1 = Y.one("#num1");
  var element2 = Y.one("#num2");

  var result = parseInt(element1.get("value")) + parseInt(element2.get("value"));
  Y.one("#calculatedValue").set("text", result);
}

YUI().use('node', function(Y) {
  Y.one("#add").on("click", function(e) {
    e.preventDefault();
    addNumbers(Y);
  });
});


YUI().use('node', 'transition', function(Y) {
  var hidden = false;
  Y.one("#testMe").on("click", function(e) {
    e.preventDefault();

    if (hidden) {
      Y.one("#mainTitle").transition({
        duration: 1,
        opacity: 1
      });
      Y.one("#mainTitle").show();
      hidden = false;
    } else {
      Y.one("#mainTitle").transition({
        duration: 1,
        opacity: 0
      }, function() {
        this.hide();
      });
      hidden = true;
    }
  });
});


var tags = ["#uvu", "#school", "#exciting"];
YUI({ skin: 'sam' }).use('node', 'event', 'autocomplete', function(Y) {
  var form = Y.one("#autoForm");
  Y.one("#autoTest").plug(Y.Plugin.AutoComplete, {
    resultHighlighter: 'phraseMatch',
    source: tags
  });

  Y.one("#autoForm").on("submit", function(e) {
    e.preventDefault();

    var testItem = Y.one("#autoTest");
    var newTag = testItem.get("value");

    var exists = false;
    tags.forEach(function(t) {
      if (t === newTag) {
        exists = true;
      }
    });

    if (!exists) {
      tags.push(newTag);
    }

    var result = Y.one("#autoResult");
    result.set("text", result.get("text") + " " + newTag);
    testItem.set("value", "");
  });
});


YUI({ skin: 'sam' }).use('node', 'calendar', function(Y) {
  var calendar = new Y.Calendar({
    contentBox: "#calendar",
    width: "250px",
    height: "220px",
    showPrevMonth: true,
    showNextMonth: true,
    date: new Date(2015, 4, 1)
  }).render();
});


YUI({ skin: 'sam' }).use('node', 'tabview', function(Y) {
  new Y.TabView({
    srcNode: "#tabDiv"
  }).render();
});
