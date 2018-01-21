const { ENV } = process.env;

const DEFAULT_CONFIG = {
  basename: "/"
};

const PROFILES = {
  test: {

  },

  local: {


  },
  prod: {
    basename: "/demo"
  }

};

const config = Object.assign({}, DEFAULT_CONFIG, PROFILES[ENV] || {});

export default config;
