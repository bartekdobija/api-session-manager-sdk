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
 * @title api-accounts
 * @version 1.0.0
 * @baseUrl {server}/v1
 *
 * User accounts API
 */
export class Api {
  http;
  constructor(http) {
    this.http = http;
  }
  /**
   * @description Receive data about your own account (when logged-in). The information about the account details id determined, based on the bearer token.
   *
   * @name GetOwnAccount
   * @summary Get own account data
   * @request GET:/account
   * @secure
   * @response `200` `AccountResponse` Account creation status
   * @response `400` `BadRequestResponse`
   */
  getOwnAccount = (params = {}) =>
    this.http.request({
      path: `/account`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Create new customer account
   *
   * @name CreateAccount
   * @summary Create user account
   * @request POST:/account
   * @response `200` `SuccessResponse` Account creation status
   * @response `400` `BadRequestResponse`
   */
  createAccount = (data, params = {}) =>
    this.http.request({
      path: `/account`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Update user account
   *
   * @name UpdateAccount
   * @summary Update user account
   * @request PUT:/account
   * @secure
   * @response `200` `SuccessResponse` Account creation status
   * @response `400` `BadRequestResponse`
   */
  updateAccount = (data, params = {}) =>
    this.http.request({
      path: `/account`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Operation deletes own user account which is inferred from the session token details.
   *
   * @name DeleteAccount
   * @summary Delete own user account
   * @request DELETE:/account
   * @secure
   * @response `200` `SuccessResponse` Account creation status
   * @response `400` `BadRequestResponse`
   */
  deleteAccount = (params = {}) =>
    this.http.request({
      path: `/account`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  v1 = {
    /**
     * @description Receive data of an account
     *
     * @name GetAccount
     * @summary Get selected account data
     * @request GET:/api/v1/account/{accountId}
     * @response `200` `AccountResponse` Account creation status
     * @response `400` `BadRequestResponse`
     */
    getAccount: (accountId, params = {}) =>
      this.http.request({
        path: `/api/v1/account/${accountId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
