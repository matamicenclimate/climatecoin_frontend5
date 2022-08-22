const storagePrefix = 'climatecoin_';

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
  },
  getMagicToken: () => {
    return window.localStorage.getItem(`ACCESS_TOKEN`)
      ? (window.localStorage.getItem(`ACCESS_TOKEN`) as string)
      : '';
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  clear: () => {
    window.localStorage.clear();
  },
};

export default storage;
