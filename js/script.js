{
  const tasks = [];

  const removeTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done;
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({ 
      content: newTaskContent,
     });
    render();
  };

  const removeEvents = () => {
    const removeButtons = document.querySelectorAll(".js-listItemRemoveButton");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const doneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-listItemDone");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  
  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="tasks__item js-task">
      <button class="tasks__button tasks__button--done js-listItemDone">${task.done ? "✔" : ""}</button>
      <span class="tasks__content${task.done ? " tasks__content--done" : ""}">${task.content}</span>
      <button class="tasks__button tasks__button--remove js-listItemRemoveButton">🗑️</button>
      </li>`;
    }
    document.querySelector(".js-list").innerHTML = htmlString;
    removeEvents();
    doneEvents();
  };


  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskElement = document.querySelector(".js-input");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }
    newTaskElement.focus();
  };



  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
