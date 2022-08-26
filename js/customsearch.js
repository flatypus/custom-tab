var form = document.getElementById("searchForm");

function addForm() {
  form.method = "GET";
  form.autocomplete = "off";
  var input = document.createElement("input");
  input.className = "input";
  input.placeholder = "Search";
  input.autofocus = true;
  input.name = "q";
  form.appendChild(input);
}

function setUpDropdown() {
  var dropdown = document.getElementsByClassName("dropbtn")[0];
  var dropdowncontent = document.getElementsByClassName("dropdown-content")[0];
  dropdown.innerHTML = `Search ${Object.keys(config.customsearch)[0]}:`;
  form.action = config.customsearch[Object.keys(config.customsearch)[0]];
  for (var element in config.customsearch) {
    var link = document.createElement("a");
    link.onclick = function () {
      dropdown.innerHTML = `Search ${this.innerText}:`;
      form.action = config.customsearch[this.innerText];
    };
    link.innerText = element;
    dropdowncontent.appendChild(link);
  }
}

addForm();
setUpDropdown();
