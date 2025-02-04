import defaultConfig from './config.json';

class Config {
  constructor(c) {
    Object.keys(c).forEach(key => {
      this[key] = c[key];
    });
  }

  get(k) {
    return this[k];
  }

  set(k, v) {
    this[k] = v;
  }
}

const config = new Config(defaultConfig);

export default config;
