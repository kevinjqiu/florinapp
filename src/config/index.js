let envConfig = null;

const DEFAULT_CONFIG = {
  basename: "/",
  dbname: "florin",
  dbdebug: false
};

const currentEnv = process.ENV;

const envConfigs = {
  "test": {
    dbname: "florin-test",
    dbadapter: "memory"
  },
  "local": {
    dbname: "florin-test"
  },
  "prod": {
    basename: "/demo",
  }
}

const config = Object.assign({}, DEFAULT_CONFIG, envConfigs[currentEnv] || {});

export default config;
