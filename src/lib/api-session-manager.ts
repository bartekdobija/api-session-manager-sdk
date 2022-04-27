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

import axios, { AxiosInstance, AxiosRequestConfig, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8087" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
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

  private createFormData(input: Record<string, unknown>): FormData {
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

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
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

      body = this.createFormData(body as Record<string, unknown>);
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
 * @title api-session-manager
 * @version 1.0.0
 * @baseUrl http://localhost:8087
 *
 * Client session management API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
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
    getSession: (token: string, params: RequestParams = {}) =>
      this.request<Session, NotFound | InternalServerError>({
        path: `/v1/session/${token}`,
        method: "GET",
        ...params,
      }),

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
    deleteSession: (token: string, params: RequestParams = {}) =>
      this.request<void, UnauthorizedError | InternalServerError | BadRequest>({
        path: `/v1/session/${token}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

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
    createSession: (data: SessionCreationDto, params: RequestParams = {}) =>
      this.request<Session, UnauthorizedError | InternalServerError | BadRequest>({
        path: `/v1/session`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
