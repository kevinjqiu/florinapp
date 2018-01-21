const { ENV } = process.env;

const DEFAULT_CONFIG = {
  basename: "/",
  dbname: "florin",
  dbadapter: "idb",
  dbdebug: false
};

const PROFILES = {
  test: {
    dbname: "florin-test",
    dbadapter: "memory",
    dbdebug: false
  },

  local: {
    dbname: "florin-test",
    dbdebug: false
  },

  prod: {
    basename: "/demo",
    dbname: "florin",
    dbdebug: false
  }

};

const config = Object.assign({}, DEFAULT_CONFIG, PROFILES[ENV] || {});

console.log(config);

export default config;
