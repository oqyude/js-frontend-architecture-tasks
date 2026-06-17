import axios from 'axios';

const routes = {
  tasksPath: () => 'http://localhost/api/tasks',
};

// BEGIN
export default async () => {
  const form = document.querySelector('form');
  const input = form.elements.name;
  const tasksContainer = document.getElementById('tasks');

  const state = {
    tasks: [],
  };

  const render = () => {
    tasksContainer.innerHTML = '';

    state.tasks.forEach((task) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = task.name;
      tasksContainer.append(li);
    });
  };

  const response = await axios.get(routes.tasksPath());
  state.tasks = response.data.items;
  render();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const task = { name: input.value };
    await axios.post(routes.tasksPath(), task);
    state.tasks.unshift(task);
    form.reset();
    input.focus();
    render();
  });
};

// END
