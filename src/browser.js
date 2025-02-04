import api from "./api";
import auth from "./auth";
import memo from "./auth/memo";
import broadcast from "./broadcast";
import config from "@taiyi-js/config";
import formatter from "./formatter";
import utils from "./utils";

const taiyi = {
  api,
  auth,
  memo,
  broadcast,
  config,
  formatter,
  utils
};

if (typeof window !== "undefined") {
  window.taiyi = taiyi;
}

if (typeof global !== "undefined") {
  global.taiyi = taiyi;
}

exports = module.exports = taiyi;
