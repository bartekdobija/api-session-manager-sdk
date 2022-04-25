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

export interface MessageDTO {
  iid?: string;
  name?: string;
  body?: string;
  created_at?: string;
}
export interface SuccessResponse {
  response?: boolean;
}
export interface BadRequestResponse {
  /** @example bad request */
  response?: string;
}
export interface GetMessagesParams {
  /**
   * Request limit
   * @min 1
   * @max 50
   */
  l?: number;
  /**
   * Request offset
   * @min 0
   */
  o?: number;
  /** The keyword to search for */
  k: string;
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
 * @title api-messages
 * @version 1.0.0
 * @baseUrl {server}/v1
 *
 * Message service API
 */
export declare class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;
  constructor(http: HttpClient<SecurityDataType>);
  /**
   * @description Post message to the owner
   *
   * @name PostMessage
   * @summary Post message to an item owner
   * @request POST:/messages
   * @response `200` `SuccessResponse` List of keyword suggestions
   * @response `400` `BadRequestResponse`
   */
  postMessage: (data: MessageDTO, params?: RequestParams) => Promise<AxiosResponse<SuccessResponse>>;
  /**
   * @description Get a list of messages
   *
   * @name GetMessages
   * @summary Get a list of messages
   * @request GET:/messages
   * @response `200` `(MessageDTO)[]` List of keyword suggestions
   * @response `400` `BadRequestResponse`
   */
  getMessages: (query: GetMessagesParams, params?: RequestParams) => Promise<AxiosResponse<MessageDTO[]>>;
}
