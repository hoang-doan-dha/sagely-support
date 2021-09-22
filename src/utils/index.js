function parseIdFromHref(href) {
  const parts = href.split('/');
  return parts[parts.length - 1];
}

export { parseIdFromHref };