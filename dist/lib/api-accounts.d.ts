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

/**
 * Account DTO used in the account creation and information retrieval.
 * @example {"id":"123-123-123","email":"a@b.com","mobile":4802023123,"premium":true,"enabled":true}
 */
export interface Account {
  id?: string;
  /** @format email */
  email?: string;
  /** @format password */
  password?: string;
  mobile?: string;
  premium?: boolean;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface AccountCreationRequest {
  id?: string;
  password?: string;
}
/**
 * @example {"response":true}
 */
export interface SuccessResponse {
  response?: boolean;
}
export interface AccountResponse {
  /**
   * Account DTO used in the account creation and information retrieval.
   *
   */
  response?: Account;
}
/**
 * @example {"response":false}
 */
export interface BadRequestResponse {
  response?: boolean;
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
 * @title api-accounts
 * @version 1.0.0
 * @baseUrl {server}/v1
 *
 * User accounts API
 */
export declare class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;
  constructor(http: HttpClient<SecurityDataType>);
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
  getOwnAccount: (params?: RequestParams) => Promise<AxiosResponse<AccountResponse>>;
  /**
   * @description Create new customer account
   *
   * @name CreateAccount
   * @summary Create user account
   * @request POST:/account
   * @response `200` `SuccessResponse` Account creation status
   * @response `400` `BadRequestResponse`
   */
  createAccount: (data: AccountCreationRequest, params?: RequestParams) => Promise<AxiosResponse<SuccessResponse>>;
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
  updateAccount: (data: Account, params?: RequestParams) => Promise<AxiosResponse<SuccessResponse>>;
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
  deleteAccount: (params?: RequestParams) => Promise<AxiosResponse<SuccessResponse>>;
  v1: {
    /**
     * @description Receive data of an account
     *
     * @name GetAccount
     * @summary Get selected account data
     * @request GET:/api/v1/account/{accountId}
     * @response `200` `AccountResponse` Account creation status
     * @response `400` `BadRequestResponse`
     */
    getAccount: (accountId: string, params?: RequestParams) => Promise<AxiosResponse<AccountResponse>>;
  };
}
