import axios from "axios";
import crypto from "crypto-js";
import { API_URL } from "./apiUrl";
import { toCamelCaseFormat, toSnakeCaseFormat } from "./case-style";
import toast from "react-hot-toast";

export const key =
  "JDJhJDEwJFR1VEN6cGlBVlAwdllocTJVSVVlSWVqQXBJOVo1Yzl3ejBBdkhCYW9MdUZjVm9QTUVBbWI2";

export const cleanEmtpyFields = (obj) => {
  if (obj.data !== undefined) {
    if (obj?.method === "post" || obj?.method === "put") {
      Object.keys(obj?.data).forEach((key) => {
        if (obj?.data[key] == null || obj?.data[key] === "") {
          delete obj?.data[key];
        }
      });
    }
  }

  return obj;
};

export const removeEmptyBodyFields = (obj) => {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v ? ((a[k] = v), a) : a),
    {}
  );
};

const getNewToken = () =>
  new Promise((resolve, reject) => {
    axios
      .post("user/auth/refresh", {
        refresh_token: localStorage.getItem("refreshToken"),
      })
      .then((response) => {
        if (response.data.meta.error) {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          // history.push("/#/");
          throw new Error(response.data.meta);
        }
        localStorage.setItem("accessToken", response.data.response.accessToken);
        resolve(response.data.response.accessToken);
      })
      .catch((error) => {
        reject(error);
      });
  });

// Parse error response

function parseError(messages) {
  if (messages) {
    if (messages instanceof Array) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ messages });
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ messages: [messages] });
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ messages: ["Error rejected"] });
}

const removeEmptyParams = (params) => {
  for (const key of Object.keys(params)) {
    if (params[key] === "") {
      delete params[key];
    }
  }
};

axios.interceptors.request.use(
  (config) => {
    if (config.params) {
      removeEmptyParams(config.params);
    }

    const searchParams = new URLSearchParams(toSnakeCaseFormat(config.params));

    const accessToken = localStorage.getItem("accessToken");

    let removeEmptyFieds;

    if (config && config.data) {
      removeEmptyFieds = removeEmptyBodyFields(config.data);
    }
    const getUrl = "/api/admin" + config?.url;

    const hasFilters = searchParams.toString().length > 0;

    const getUrlData = config.params
      ? getUrl + (hasFilters ? "?" : "") + searchParams
      : getUrl;

    const request = config.data
      ? JSON.stringify(toSnakeCaseFormat(removeEmptyFieds))
      : getUrlData;

    console.log("request: ", request);

    const encryptedData = crypto.HmacSHA256(request, key);

    const headers = {
      "X-RequestDigest": encryptedData,
      "Content-Type": config.headers["Content-Type"] || "application/json",
      Accept: config.headers["Accept"] || "application/json",
      Authorization: accessToken && `Bearer ${accessToken}`,
    };

    const updatedConfig = {
      ...config,
      url: API_URL + config.url,
      data: toSnakeCaseFormat(config.data),
      params: toSnakeCaseFormat(config.params),
      headers: cleanEmtpyFields(headers),
    };

    return cleanEmtpyFields(updatedConfig);
  },
  (error) => {
    toast.error(
      JSON.stringify(error.error) ?? "Произошла ошибка при выполнении запроса"
    );
    return Promise.reject(error);
  }
);

// if (response?.data?.meta?.statusCode === 401) {
// getSession();
// }

// Reponse interceptor. Return defined data schema or error.
axios.interceptors.response.use(
  (response) => toCamelCaseFormat(response),
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        history.push("/#/");
        window.location.reload();
      }
      return parseError(error.response.data);
    }

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    if (response.data?.meta?.statusCode === 401) {
      const token = await getNewToken();

      const { config } = response;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return axios(config);
    }
    return Promise.resolve(toCamelCaseFormat(response));
  },
  (error) => {
    if (error.response) {
      return parseError(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axios;
