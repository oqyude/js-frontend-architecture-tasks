// BEGIN
export default () => {
  const form = document.forms.calculator;
  const input = form.elements.number;
  const result = document.getElementById('result');
  const reset = form.querySelector('button');

  const state = {
    sum: 0,
  };

  const render = () => {
    result.textContent = state.sum;
    form.reset();
    input.focus();
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    state.sum += Number(input.value);
    render();
  });

  reset.addEventListener('click', () => {
    state.sum = 0;
    render();
  });

  render();
};

// END
