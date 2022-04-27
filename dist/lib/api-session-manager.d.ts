export interface Session {
    token?: string;
    account?: string;
    createdAt?: string;
}
export interface SessionCreationDto {
    account: string;
}
export interface BadRequest {
    statusCode: number;
    message: string;
}
export interface NotFound {
    statusCode: number;
    message: string;
}
export interface InternalServerError {
    statusCode: number;
    message: string;
}
export interface UnauthorizedError {
    statusCode: number;
    message: string;
}
import { AxiosInstance, AxiosRequestConfig, ResponseType } from "axios";
export declare type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    secure?: boolean;
    path: string;
    type?: ContentType;
    query?: QueryParamsType;
    format?: ResponseType;
    body?: unknown;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
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
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    v1: {
        getSession: (token: string, params?: RequestParams) => Promise<Session>;
        deleteSession: (token: string, params?: RequestParams) => Promise<void>;
        createSession: (data: SessionCreationDto, params?: RequestParams) => Promise<Session>;
    };
}
