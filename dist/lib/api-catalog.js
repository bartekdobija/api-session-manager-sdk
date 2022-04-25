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
 * @title api-catalog
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
   * @description Fetch an array of items from the catalog repository based on latitude and longitude.
   *
   * @name ListItems
   * @summary Get a list of location based items
   * @request GET:/item
   * @response `200` `CatalogEntriesResponse` Array of catalog items
   * @response `default` `BadRequestResponse`
   */
  listItems = (query, params = {}) =>
    this.http.request({
      path: `/item`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new catalog item
   *
   * @name NewItem
   * @summary Create new catalog item
   * @request POST:/item
   * @response `200` `ItemCreationResponse` Create an item ad and return ID of the newly returned ad.
   * @response `default` `BadRequestResponse`
   */
  newItem = (data, params = {}) =>
    this.http.request({
      path: `/item`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description When the key query parameter is not available the request returns all categories that item can be assigned to. When the key is given then the request returns a
   *
   * @name GetCategories
   * @summary Retrieve item categories
   * @request GET:/categories
   * @response `200` `CategoriesResponse` List of keyword suggestions
   * @response `default` `BadRequestResponse`
   */
  getCategories = (query, params = {}) =>
    this.http.request({
      path: `/categories`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  itemId = {
    /**
     * @description Get catalog item recommendation
     *
     * @name GetItem
     * @summary Retrieve item categories
     * @request GET:/item/{itemId}
     * @response `200` `CatalogEntryResponse` List of keyword suggestions
     * @response `default` `BadRequestResponse`
     */
    getItem: (itemId, params = {}) =>
      this.http.request({
        path: `/item/${itemId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description Updates item details with new information.
     *
     * @name UpdateItem
     * @summary Update catalog item ad
     * @request PUT:/item/{itemId}
     * @secure
     * @response `200` `BooleanResponse` Item update status
     * @response `401` `UnauthorizedError`
     * @response `default` `BadRequestResponse`
     */
    updateItem: (itemId, data, params = {}) =>
      this.http.request({
        path: `/item/${itemId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description Delete item information from the catalog.
     *
     * @name DeleteItem
     * @summary Delete item information
     * @request DELETE:/item/{itemId}
     * @secure
     * @response `200` `BooleanResponse` Deletes item by its identifier
     * @response `401` `UnauthorizedError`
     * @response `default` `BadRequestResponse`
     */
    deleteItem: (itemId, params = {}) =>
      this.http.request({
        path: `/item/${itemId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * @description Get catalog item recommendation
     *
     * @name UploadMedia
     * @summary Retrieve item categories
     * @request POST:/item/{itemId}/media
     * @response `200` `UUIDResponse` ID of the newly created media resource.
     * @response `default` `BadRequestResponse`
     */
    uploadMedia: (itemId, params = {}) =>
      this.http.request({
        path: `/item/${itemId}/media`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
}
