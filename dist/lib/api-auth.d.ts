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

export interface GoogleOAuth2LoginRequest {
  token?: string;
}
export interface FacebookOAuth2LoginRequest {
  token?: string;
}
export interface LoginRequest {
  id?: string;
  password?: string;
}
export interface Session {
  token?: string;
  accountId?: string;
  createdAt?: string;
  updatedAt?: string;
}
/**
 * @example {"response":true}
 */
export interface SuccessResponse {
  response?: boolean;
}
/**
 * @example {"response":true}
 */
export interface UnauthorizedError {
  response?: boolean;
}
export interface BadRequestResponse {
  id?: number;
  name?: string;
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
 * @title api-auth
 * @version 1.0.0
 * @baseUrl {server}/v1
 *
 * User authentication & session handling API
 */
export declare class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;
  constructor(http: HttpClient<SecurityDataType>);
  /**
   * @description Attempt to create a session id using the OAuth2 facebook support.
   *
   * @name Login
   * @summary Attempt to login using facebook oauth2
   * @request POST:/auth
   * @response `200` `Session` Session token
   * @response `400` `BadRequestResponse` Bad request
   */
  login: (data: LoginRequest, params?: RequestParams) => Promise<AxiosResponse<Session>>;
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
  logout: (params?: RequestParams) => Promise<AxiosResponse<SuccessResponse>>;
  google: {
    /**
     * @description Attempt to create a session id using the OAuth2 google support.
     *
     * @name GoogleOAuth2Login
     * @summary Attempt to login using google oauth2
     * @request POST:/auth/google
     * @response `200` `Session` Session token
     * @response `400` `BadRequestResponse` Bad request
     */
    googleOAuth2Login: (data: GoogleOAuth2LoginRequest, params?: RequestParams) => Promise<AxiosResponse<Session>>;
  };
  facebook: {
    /**
     * @description Attempt to create a session id using the OAuth2 facebook support.
     *
     * @name FacebookOAuth2Login
     * @summary Attempt to login using facebook oauth2
     * @request POST:/auth/facebook
     * @response `200` `Session` Session token
     * @response `400` `BadRequestResponse` Bad request
     */
    facebookOAuth2Login: (data: FacebookOAuth2LoginRequest, params?: RequestParams) => Promise<AxiosResponse<Session>>;
  };
}
