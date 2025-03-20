const handler = {
  get(target, prop) {
    return target[prop];
  }
};

const BackendApi = new Proxy(window.pywebview.api, handler);

export default BackendApi;
