import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
export default () => {
  const container = document.querySelector('[data-container="sign-up"]');
  const form = document.querySelector('[data-form="sign-up"]');
  const submit = form.querySelector('[type="submit"]');
  const fields = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const state = {
    fields,
    errors: {},
    valid: false,
    processState: 'filling',
  };

  const render = () => {
    Object.keys(state.fields).forEach((name) => {
      const input = form.elements[name];
      const error = state.errors[name];
      const oldFeedback = input.nextElementSibling;

      input.classList.remove('is-invalid');
      if (oldFeedback && oldFeedback.classList.contains('invalid-feedback')) {
        oldFeedback.remove();
      }

      if (error) {
        input.classList.add('is-invalid');
        const feedback = document.createElement('div');
        feedback.classList.add('invalid-feedback');
        feedback.textContent = error.message;
        input.after(feedback);
      }
    });

    submit.disabled = !state.valid || state.processState === 'sending';
  };

  form.addEventListener('input', (event) => {
    state.fields[event.target.name] = event.target.value;
    state.errors = validate(state.fields);
    state.valid = isEmpty(state.errors);
    render();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    state.processState = 'sending';
    render();

    await axios.post('http://localhost/users', state.fields);
    container.textContent = 'User Created!';
  });

  render();
};

// END
