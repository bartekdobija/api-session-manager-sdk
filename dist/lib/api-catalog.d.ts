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

export interface BooleanResponse {
  /** @example true */
  response?: boolean;
}
export interface UUIDResponse {
  /**
   * @format uuid
   * @example d0b081a5-5a4c-4939-881a-6d9dedf91a80
   */
  response?: string;
}
export interface ItemCreationResponse {
  /** @example 1836402 */
  response?: number;
}
export interface CategoriesResponse {
  response?: Category[];
}
export interface CatalogEntryResponse {
  response?: CatalogEntry;
}
export interface CatalogEntriesResponse {
  response?: CatalogEntry[];
}
export interface ItemCreationRequest {
  name: string;
  details: string;
  /** @format int64 */
  cid: number;
  /** @format double */
  lat: number;
  /** @format double */
  lng: number;
  addr: string;
  city: string;
  country: string;
  media?: string[];
  contact?: string;
  anon?: boolean;
  /** @format int64 */
  id?: number;
  size?: string;
  color?: string;
  broken?: string;
  male_female_uni?: string;
  is_new?: string;
}
export declare type ItemUpdateRequest = ItemCreationRequest;
export interface Category {
  cid?: number;
  name?: string;
  keywords?: string;
  img?: string;
  spec?: string[];
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}
export interface CatalogEntry {
  id?: string;
  name?: string;
  details?: string;
  contact?: string;
  addr?: string;
  anon?: boolean;
  city?: string;
  country?: string;
  /** @format int64 */
  cid?: number;
  /** @format double */
  lat?: number;
  /** @format double */
  lng?: number;
  is_collected?: boolean;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
  media?: Media[];
  spec?: CatalogSpec[];
  exp?: number;
}
export interface Media {
  mid?: string;
  item_id?: string;
  type?: 1 | 2;
  filename?: string;
  dominant?: string;
}
export interface CatalogSpec {
  /** @format int64 */
  id?: number;
  item_id?: string;
  key?: string;
  value?: string;
}
export interface BadRequestResponse {
  /** @example bad request */
  response?: string;
}
export interface UnauthorizedError {
  /** @example unauthorized */
  response?: boolean;
}
export interface ListItemsParams {
  /**
   * Offset
   * @min 0
   */
  o?: number;
  /**
   * Limit of item numbers to return
   * @min 1
   * @max 100
   */
  l?: number;
  /** Item category */
  c?: string;
  /**
   * Latitude
   * @format double
   */
  lat: number;
  /**
   * Longitude
   * @format double
   */
  lng: number;
  /** Full item description */
  full?: boolean;
}
export interface GetCategoriesParams {
  /**
   * Offset
   * @min 0
   */
  o?: number;
  /**
   * Limit of item numbers to return
   * @min 1
   * @max 100
   */
  l?: number;
  /** Keyword */
  k?: string;
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
 * @title api-catalog
 * @version 1.0.0
 * @baseUrl {server}/v1
 *
 * Catalog search API
 */
export declare class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;
  constructor(http: HttpClient<SecurityDataType>);
  /**
   * @description Fetch an array of items from the catalog repository based on latitude and longitude.
   *
   * @name ListItems
   * @summary Get a list of location based items
   * @request GET:/item
   * @response `200` `CatalogEntriesResponse` Array of catalog items
   * @response `default` `BadRequestResponse`
   */
  listItems: (query: ListItemsParams, params?: RequestParams) => Promise<AxiosResponse<CatalogEntriesResponse>>;
  /**
   * @description Create a new catalog item
   *
   * @name NewItem
   * @summary Create new catalog item
   * @request POST:/item
   * @response `200` `ItemCreationResponse` Create an item ad and return ID of the newly returned ad.
   * @response `default` `BadRequestResponse`
   */
  newItem: (data: ItemCreationRequest, params?: RequestParams) => Promise<AxiosResponse<ItemCreationResponse>>;
  /**
   * @description When the key query parameter is not available the request returns all categories that item can be assigned to. When the key is given then the request returns a
   *
   * @name GetCategories
   * @summary Retrieve item categories
   * @request GET:/categories
   * @response `200` `CategoriesResponse` List of keyword suggestions
   * @response `default` `BadRequestResponse`
   */
  getCategories: (query: GetCategoriesParams, params?: RequestParams) => Promise<AxiosResponse<CategoriesResponse>>;
  itemId: {
    /**
     * @description Get catalog item recommendation
     *
     * @name GetItem
     * @summary Retrieve item categories
     * @request GET:/item/{itemId}
     * @response `200` `CatalogEntryResponse` List of keyword suggestions
     * @response `default` `BadRequestResponse`
     */
    getItem: (itemId: number, params?: RequestParams) => Promise<AxiosResponse<CatalogEntryResponse>>;
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
    updateItem: (
      itemId: number,
      data: ItemUpdateRequest,
      params?: RequestParams,
    ) => Promise<AxiosResponse<BooleanResponse>>;
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
    deleteItem: (itemId: number, params?: RequestParams) => Promise<AxiosResponse<BooleanResponse>>;
    /**
     * @description Get catalog item recommendation
     *
     * @name UploadMedia
     * @summary Retrieve item categories
     * @request POST:/item/{itemId}/media
     * @response `200` `UUIDResponse` ID of the newly created media resource.
     * @response `default` `BadRequestResponse`
     */
    uploadMedia: (itemId: number, params?: RequestParams) => Promise<AxiosResponse<UUIDResponse>>;
  };
}
