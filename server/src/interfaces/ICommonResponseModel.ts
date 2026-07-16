export interface IApiResponse<T = null> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
    statusCode: number;
}