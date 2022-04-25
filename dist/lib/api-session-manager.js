/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import axios from "axios";
export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType || (ContentType = {}));
export class HttpClient {
  instance;
  securityData = null;
  securityWorker;
  secure;
  format;
  constructor({ securityWorker, secure, format, ...axiosConfig } = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "{server}/v1" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }
  setSecurityData = (data) => {
    this.securityData = data;
  };
  mergeRequestParams(params1, params2) {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }
  createFormData(input) {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }
  request = async ({ secure, path, type, query, format, body, ...params }) => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;
    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};
      body = this.createFormData(body);
    }
    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
          ...(requestParams.headers || {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}
/**
 * @title api-session-manager
 * @version 1.0.0
 * @baseUrl {server}/v1
 *
 * Client session manager
 */
export class Api {
  http;
  constructor(http) {
    this.http = http;
  }
  session = {
    /**
     * @description Retrieve complete information of the session identified by a API token.
     *
     * @name GetSession
     * @summary Get session information for a specific user
     * @request GET:/session/{token}
     */
    getSession: (token, params = {}) =>
      this.http.request({
        path: `/session/${token}`,
        method: "GET",
        ...params,
      }),
    /**
     * @description Delete session information from the resource pool.
     *
     * @name DeleteSession
     * @summary Delete client session
     * @request DELETE:/session/{token}
     * @secure
     */
    deleteSession: (token, params = {}) =>
      this.http.request({
        path: `/session/${token}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
    /**
     * @description Get catalog item recommendation
     *
     * @name CreateSession
     * @summary Retrieve item categories
     * @request POST:/session
     */
    createSession: (data, params = {}) =>
      this.http.request({
        path: `/session`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
