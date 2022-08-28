// hide quote box if there are no quotes
if (
  config.showquote == false ||
  config.quote == undefined ||
  config.quote.length == 0
) {
  document.getElementById("quotecontainer").style.display = "none";
}

if (config.todolist == false) {
  document.getElementById("todocontainer").style.display = "none";
} else {
  document.getElementById("todocontainer").style.height = config.todoboxsize;
}
