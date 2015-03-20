'use strict';

var DataModel = (function() {
  function DataModel(type) {
    this.$$useXml = type === "xml";
    this.$$dataEndpoint = this.$$useXml ? "data/buildings.xml" : "data/buildings.json";
    this.$$data = {};
  }

  DataModel.prototype.init = function(container, latHtml, longHtml) {
    this.$$container = container;
    this.$$latitude = latHtml;
    this.$$longitude = longHtml;

    var request = new XMLHttpRequest();
    var self = this;
    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status >= 200 && request.status < 300) {
        self.$$handleData(request);
      } else {
        console.warn(request.responseText);
      }
    };
    request.open("GET", this.$$dataEndpoint);
    request.send();
  };

  DataModel.prototype.$$handleData = function(request) {
    if (this.$$useXml) {
      var xmlDoc = request.responseXML;
      this.$$handleXml(xmlDoc);
    } else {
      var jsonDoc = JSON.parse(request.responseText);
      this.$$handleJson(jsonDoc);
    }

    var self = this;
    this.$$container.addEventListener('change', function() {
      self.$$selectionChange();
    });
  };

  DataModel.prototype.$$handleJson = function(jsonData) {
    var self = this;
    jsonData.forEach(function(d) {
      var value = d.id;
      var text = d.name;
      self.$$data[d.id] = d;
      self.$$addOption(value, text);
    });
  };

  DataModel.prototype.$$handleXml = function(xmlDoc) {
    var buildings = xmlDoc.firstElementChild;
    for (var i = 0; i < buildings.children.length; ++i) {
      var child = buildings.children[i];
      if (child.nodeName !== "item") {
        continue;
      }

      var id = this.$$findChild(child, 'id').textContent; //child.children[1].textContent;
      var name = this.$$findChild(child, 'name').textContent; //child.children[2].textContent;
      var root = this.$$findChild(child, 'root').textContent;
      var latitude = this.$$findChild(child, 'lat').textContent;
      var longitude = this.$$findChild(child, 'lng').textContent;

      this.$$data[id] = {
        name: name,
        id: id,
        root: root,
        lat: latitude,
        lng: longitude
      };

      this.$$addOption(id, name);
    }
  };

  DataModel.prototype.$$selectionChange = function() {
    var selectedId = this.$$container.value;
    var selection = this.$$data[selectedId];

    this.$$latitude.innerHTML = selection.lat;
    this.$$longitude.innerHTML = selection.lng;
  };

  DataModel.prototype.$$findChild = function(xml, name) {
    for(var i = 0; i < xml.children.length; ++i) {
      var child = xml.children[i];
      if (child.nodeName === name) {
        return child;
      }
    }

    return null;
  };

  DataModel.prototype.$$addOption = function(value, text) {
    var newOption = document.createElement('option');
    newOption.value = value;
    newOption.innerHTML = text;
    this.$$container.appendChild(newOption);
  };

  return DataModel;
})();

$().ready(function() {
  var x = new DataModel('json`');
  //var x = new DataModel('xml');
  x.init($('building'), $('latitude'), $('longitude'));
});
