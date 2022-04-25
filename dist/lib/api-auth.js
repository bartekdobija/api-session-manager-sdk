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
 * @title api-auth
 * @version 1.0.0
 * @baseUrl {server}/v1
 *
 * User authentication & session handling API
 */
export class Api {
  http;
  constructor(http) {
    this.http = http;
  }
  /**
   * @description Attempt to create a session id using the OAuth2 facebook support.
   *
   * @name Login
   * @summary Attempt to login using facebook oauth2
   * @request POST:/auth
   * @response `200` `Session` Session token
   * @response `400` `BadRequestResponse` Bad request
   */
  login = (data, params = {}) =>
    this.http.request({
      path: `/auth`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Attempt to delete session (logout). User information is inferred from the API key data.
   *
   * @name Logout
   * @summary Logout
   * @request DELETE:/auth
   * @secure
   * @response `200` `SuccessResponse` Delete session
   * @response `401` `UnauthorizedError` Unauthorized
   */
  logout = (params = {}) =>
    this.http.request({
      path: `/auth`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  google = {
    /**
     * @description Attempt to create a session id using the OAuth2 google support.
     *
     * @name GoogleOAuth2Login
     * @summary Attempt to login using google oauth2
     * @request POST:/auth/google
     * @response `200` `Session` Session token
     * @response `400` `BadRequestResponse` Bad request
     */
    googleOAuth2Login: (data, params = {}) =>
      this.http.request({
        path: `/auth/google`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  facebook = {
    /**
     * @description Attempt to create a session id using the OAuth2 facebook support.
     *
     * @name FacebookOAuth2Login
     * @summary Attempt to login using facebook oauth2
     * @request POST:/auth/facebook
     * @response `200` `Session` Session token
     * @response `400` `BadRequestResponse` Bad request
     */
    facebookOAuth2Login: (data, params = {}) =>
      this.http.request({
        path: `/auth/facebook`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
