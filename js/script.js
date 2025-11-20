{
  let tasks = []; 
  let hideDoneTasks = false; 

  const removeTask = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      { ...tasks[index], done: !tasks[index].done, },
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
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
  
  const renderTasks = () => {
    const htmlString = task =>
      `<li class="tasks__item${
        task.done && hideDoneTasks ? " tasks__item--hidden" : ""} js-task">
    <button class="tasks__button tasks__button--done js-listItemDone">
    ${task.done ? "✔" : ""}</button>
    <span class="tasks__content${task.done ? " tasks__content--done" : ""}"> 
    ${task.content}</span>
    <button class="tasks__button tasks__button--remove js-listItemRemoveButton">🗑️</button>
    </li>`;

    const tasksElement = document.querySelector(".js-list");
    tasksElement.innerHTML = tasks.map(htmlString).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
        <button class="buttons__button js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Show" : "Hide"} completed</button>
        <button class="buttons__button js-markAllTasksDone"
        ${tasks.every(({ done }) => done) ? " disabled" : ""}> 
        Complete all</button>`;
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllTasksDone");
    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
    }
    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );
    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    removeEvents();
    doneEvents();

    renderButtons();
    bindButtonsEvents();
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