let _history;

const setupHistory = (history) => {
  _history = history;
}

const navigate = (routeName) => {
  _history.push(`/${routeName}`);
}

const replace = (routeName) => {
  _history.replace({ pathname: `/${routeName}` });
}

export { setupHistory, navigate, replace };