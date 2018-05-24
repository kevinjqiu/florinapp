const DEFAULT_CONFIG = {
  basename: "/",
  dbname: "florin",
  dbdebug: false,
  appbranch: process.env.REACT_APP_BRANCH,
  appcommithash: process.env.REACT_APP_COMMIT_HASH
};

const currentEnv = process.env.NODE_ENV;

const envConfigs = {
  "test": {
    dbname: "florin-test",
    dbadapter: "memory"
  },
  "development": {
    dbname: "florin-test"
  },
  "demo": {
    basename: "/demo",
  },
  "production": {
  }
}

const config = Object.assign({}, DEFAULT_CONFIG, envConfigs[currentEnv] || {});

export default config;
