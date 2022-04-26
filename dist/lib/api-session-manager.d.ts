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

export interface Session {
  /** @format uuid */
  token?: string;
  /** @format uuid */
  account?: string;
  /** @format date-time */
  createdAt?: string;
}
export interface SessionCreationDto {
  /** @format uuid */
  account: string;
}
export interface BadRequest {
  /** @example 400 */
  statusCode: number;
  /** @example Bad Request */
  message: string;
}
export interface NotFound {
  /** @example 404 */
  statusCode: number;
  /** @example Not Found */
  message: string;
}
export interface InternalServerError {
  /** @example 500 */
  statusCode: number;
  /** @example Internal Server Error */
  message: string;
}
export interface UnauthorizedError {
  /** @example 500 */
  statusCode: number;
  /** @example Internal Server Error */
  message: string;
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
 * @title api-session-manager
 * @version 1.0.0
 * @baseUrl http://localhost:8087
 *
 * Client session management API
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1: {
    /**
     * @description Retrieve complete information of the session identified by a API token.
     *
     * @name GetSession
     * @summary Get session information for a specific user
     * @request GET:/v1/session/{token}
     * @response `200` `Session`
     * @response `404` `NotFound`
     * @response `500` `InternalServerError`
     */
    getSession: (token: string, params?: RequestParams) => Promise<AxiosResponse<Session>>;
    /**
     * @description Delete session information from the resource pool.
     *
     * @name DeleteSession
     * @summary Delete client session
     * @request DELETE:/v1/session/{token}
     * @secure
     * @response `200` `void` Deletes item by its identifier
     * @response `401` `UnauthorizedError`
     * @response `500` `InternalServerError`
     * @response `default` `BadRequest`
     */
    deleteSession: (token: string, params?: RequestParams) => Promise<AxiosResponse<void>>;
    /**
     * @description Get catalog item recommendation
     *
     * @name CreateSession
     * @summary Retrieve item categories
     * @request POST:/v1/session
     * @response `200` `Session`
     * @response `401` `UnauthorizedError`
     * @response `500` `InternalServerError`
     * @response `default` `BadRequest`
     */
    createSession: (data: SessionCreationDto, params?: RequestParams) => Promise<AxiosResponse<Session>>;
  };
}
