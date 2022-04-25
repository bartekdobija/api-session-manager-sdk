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

export interface BadRequestResponse {
  /** @example bad request */
  response?: string;
}
export interface UnauthorizedError {
  /** @example unauthorized */
  response?: boolean;
}
export interface RecommendationResponse {
  e?: string[];
  i?: ItemRecommendation[];
}
export interface ItemRecommendation {
  id?: number;
  name?: string;
}
export interface AddItemRequest {
  id?: number;
  cid?: number;
  name?: string;
  details?: string;
  city?: string;
  country?: string;
  /** @format double */
  lat?: number;
  /** @format double */
  lng?: number;
  thumb?: string;
}
export interface DeleteItemRequest {
  id?: number;
}
export interface RecommendationParams {
  /** Limit of items in the response */
  l?: number;
  /** Limit of items in the response */
  il?: number;
  /** The keyword to search for */
  k: string;
}
export interface SearchParams {
  /**
   * The numbers of items to return
   * @min 1
   * @max 50
   */
  limit?: number;
  /** The keyword to search for */
  k: string;
}
export interface SearchCategoryParams {
  /**
   * The numbers of items to return
   * @min 1
   * @max 50
   */
  l?: number;
  /**
   * The numbers of items to return
   * @min 0
   */
  o?: number;
  /** The category to search for */
  c?: string;
  /**
   * Latitude
   * @format double
   */
  lat?: number;
  /**
   * Longitude
   * @format double
   */
  lng?: number;
}
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export declare type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}
export declare enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}
export declare class HttpClient<SecurityDataType = unknown> {
  instance: AxiosInstance;
  private securityData;
  private securityWorker?;
  private secure?;
  private format?;
  constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
  setSecurityData: (data: SecurityDataType | null) => void;
  private mergeRequestParams;
  private createFormData;
  request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<T>;
}
/**
 * @title api-search
 * @version 1.0.0
 * @baseUrl {server}/v1
 *
 * Catalog search API
 */
export declare class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;
  constructor(http: HttpClient<SecurityDataType>);
  /**
   * @description Get catalog item recommendation
   *
   * @name Recommendation
   * @summary Item recommendation
   * @request GET:/rec
   * @response `200` `RecommendationResponse` List of keyword suggestions
   * @response `400` `BadRequestResponse` Bad request
   */
  recommendation: (
    query: RecommendationParams,
    params?: RequestParams,
  ) => Promise<AxiosResponse<RecommendationResponse>>;
  /**
   * @description Get a list of location based items
   *
   * @name Search
   * @summary Search items
   * @request GET:/search
   * @response `200` `RecommendationResponse` List of keyword suggestions
   * @response `400` `BadRequestResponse` Bad request
   */
  search: (query: SearchParams, params?: RequestParams) => Promise<AxiosResponse<RecommendationResponse>>;
  /**
   * @description Add new item to the search inventory
   *
   * @name AddItem
   * @summary Add searched item
   * @request POST:/search
   * @response `200` `RecommendationResponse` List of keyword suggestions
   * @response `400` `BadRequestResponse` Bad request
   */
  addItem: (data: AddItemRequest, params?: RequestParams) => Promise<AxiosResponse<RecommendationResponse>>;
  /**
   * @description Delete searched item
   *
   * @name DeleteItem
   * @summary Delete searched item
   * @request DELETE:/search
   * @response `200` `RecommendationResponse` List of keyword suggestions
   * @response `400` `BadRequestResponse` Bad request
   */
  deleteItem: (data: DeleteItemRequest, params?: RequestParams) => Promise<AxiosResponse<RecommendationResponse>>;
  category: {
    /**
     * @description Get a list of items in categories
     *
     * @name SearchCategory
     * @summary Search items by category
     * @request GET:/search/category
     * @response `200` `RecommendationResponse` List of keyword suggestions
     * @response `400` `BadRequestResponse` Bad request
     */
    searchCategory: (
      query: SearchCategoryParams,
      params?: RequestParams,
    ) => Promise<AxiosResponse<RecommendationResponse>>;
  };
}
