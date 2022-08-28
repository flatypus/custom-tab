const input = document.querySelector("textarea");
const handleChange = (e) => {
  chrome.storage.local.set({ todo: e.target.value });
};

const addBullets = (e) => {
  if (e.keyCode === 13) {
    const value = e.target.value;
    const newValue = value.replace(/\n(?!.*•).*/, "\n• ");
    e.target.value = newValue;
  }
};

chrome.storage.local.get("todo", (e) => {
  if (typeof(e.todo) == 'undefined' || e.todo == "") {
    input.value = "• ";
  } else {
    input.value = e.todo;
  }
});

input.addEventListener("keydown", handleChange);
input.addEventListener("keyup", addBullets);
