export default (url, token = null, options = {}) => fetch(url, {
    ...options,
    headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    },
});
