
export const userFormatter = (fieldName, state) => {
  let formatted
  const field = fieldName;
  switch (field) {
    case 'email':
      formatted = `<a href="mailto:${state[field]}">${state[field]}</a>`
      break;
    default:
      formatted = state[field]
  }
  return formatted;
};


export const todoFormatter = (fieldName, state) => {
  let formatted
  const field = fieldName;
  switch (field) {
    case 'done':
      formatted = 'no'
      if(state.done) formatted = 'yes';
      break;
    default:
      formatted = state[field]
  }
  return formatted;
};
