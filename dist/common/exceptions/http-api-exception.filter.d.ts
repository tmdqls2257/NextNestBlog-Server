import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class HttpApiExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: HttpException, host: ArgumentsHost): void;
}
