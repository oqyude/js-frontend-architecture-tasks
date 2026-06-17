import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
  const listsContainer = document.querySelector('[data-container="lists"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');
  const listForm = document.querySelector('[data-container="new-list-form"]');
  const taskForm = document.querySelector('[data-container="new-task-form"]');

  const generalId = uniqueId();
  const state = {
    currentListId: generalId,
    lists: [{ id: generalId, name: 'General' }],
    tasks: [],
  };

  const renderLists = () => {
    listsContainer.innerHTML = '';
    const ul = document.createElement('ul');

    state.lists.forEach((list) => {
      const li = document.createElement('li');

      if (list.id === state.currentListId) {
        const b = document.createElement('b');
        b.textContent = list.name;
        li.append(b);
      } else {
        const a = document.createElement('a');
        a.href = `#${list.name.toLowerCase()}`;
        a.textContent = list.name;
        a.addEventListener('click', (event) => {
          event.preventDefault();
          state.currentListId = list.id;
          render();
        });
        li.append(a);
      }

      ul.append(li);
    });

    listsContainer.append(ul);
  };

  const renderTasks = () => {
    tasksContainer.innerHTML = '';
    const tasks = state.tasks.filter((task) => task.listId === state.currentListId);

    if (tasks.length === 0) {
      return;
    }

    const ul = document.createElement('ul');
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.name;
      ul.append(li);
    });

    tasksContainer.append(ul);
  };

  const render = () => {
    renderLists();
    renderTasks();
  };

  listForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = listForm.elements.name.value;
    const exists = state.lists.some((list) => list.name === name);

    if (!exists) {
      state.lists.push({ id: uniqueId(), name });
    }

    listForm.reset();
    render();
  });

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    state.tasks.push({
      id: uniqueId(),
      listId: state.currentListId,
      name: taskForm.elements.name.value,
    });

    taskForm.reset();
    render();
  });

  render();
};

// END
