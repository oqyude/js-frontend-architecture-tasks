// BEGIN
export default (laptops) => {
  const form = document.querySelector('form');
  const result = document.querySelector('.result');

  const state = {
    processor_eq: '',
    memory_eq: '',
    frequency_gte: '',
    frequency_lte: '',
  };

  const checks = {
    processor_eq: (laptop, value) => laptop.processor === value,
    memory_eq: (laptop, value) => laptop.memory === Number(value),
    frequency_gte: (laptop, value) => laptop.frequency >= Number(value),
    frequency_lte: (laptop, value) => laptop.frequency <= Number(value),
  };

  const render = () => {
    result.innerHTML = '';

    const filtered = laptops.filter((laptop) => (
      Object.entries(state)
        .filter(([, value]) => value !== '')
        .every(([key, value]) => checks[key](laptop, value))
    ));

    if (filtered.length === 0) {
      return;
    }

    const ul = document.createElement('ul');
    filtered.forEach((laptop) => {
      const li = document.createElement('li');
      li.textContent = laptop.model;
      ul.append(li);
    });

    result.append(ul);
  };

  form.addEventListener('input', (event) => {
    state[event.target.name] = event.target.value;
    render();
  });

  form.addEventListener('change', (event) => {
    state[event.target.name] = event.target.value;
    render();
  });

  render();
};

// END
