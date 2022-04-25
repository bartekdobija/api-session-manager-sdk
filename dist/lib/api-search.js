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
 * @title api-search
 * @version 1.0.0
 * @baseUrl {server}/v1
 *
 * Catalog search API
 */
export class Api {
  http;
  constructor(http) {
    this.http = http;
  }
  /**
   * @description Get catalog item recommendation
   *
   * @name Recommendation
   * @summary Item recommendation
   * @request GET:/rec
   * @response `200` `RecommendationResponse` List of keyword suggestions
   * @response `400` `BadRequestResponse` Bad request
   */
  recommendation = (query, params = {}) =>
    this.http.request({
      path: `/rec`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description Get a list of location based items
   *
   * @name Search
   * @summary Search items
   * @request GET:/search
   * @response `200` `RecommendationResponse` List of keyword suggestions
   * @response `400` `BadRequestResponse` Bad request
   */
  search = (query, params = {}) =>
    this.http.request({
      path: `/search`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description Add new item to the search inventory
   *
   * @name AddItem
   * @summary Add searched item
   * @request POST:/search
   * @response `200` `RecommendationResponse` List of keyword suggestions
   * @response `400` `BadRequestResponse` Bad request
   */
  addItem = (data, params = {}) =>
    this.http.request({
      path: `/search`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete searched item
   *
   * @name DeleteItem
   * @summary Delete searched item
   * @request DELETE:/search
   * @response `200` `RecommendationResponse` List of keyword suggestions
   * @response `400` `BadRequestResponse` Bad request
   */
  deleteItem = (data, params = {}) =>
    this.http.request({
      path: `/search`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  category = {
    /**
     * @description Get a list of items in categories
     *
     * @name SearchCategory
     * @summary Search items by category
     * @request GET:/search/category
     * @response `200` `RecommendationResponse` List of keyword suggestions
     * @response `400` `BadRequestResponse` Bad request
     */
    searchCategory: (query, params = {}) =>
      this.http.request({
        path: `/search/category`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
