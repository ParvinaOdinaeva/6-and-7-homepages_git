{
  const tasks = [];

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });
    render();
  };

  const removeEvents = () => {
    const removeButtons = document.querySelectorAll(".js-listItemRemoveButton");
    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const doneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-listItemDone");
    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskElement = document.querySelector(".js-input").value.trim();
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }
    newTaskElement.focus();
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="tasks__item js-list">
      <button class="tasks__button tasks__button--done js-listItemDone">${task.done ? "✔" : ""}</button>
      <span class="tasks__content ${ task.done ? " tasks__content--done" : "" }>${task.content}</span>
      <button class="tasks__button tasks__button--remove js-listItemRemoveButton">🗑️</button>
      </li>`;
    }
    document.querySelector(".js-list").innerHTML = htmlString;
    removeEvents();
    doneEvents();
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
