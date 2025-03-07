export const formatDate = (dateInput, options = {}) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  return date.toLocaleDateString("en-IN", {
    ...options,
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const isFutureDate = (dateInput) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  return date > new Date();
};

export const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
