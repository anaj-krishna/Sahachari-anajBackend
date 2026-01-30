import { Request } from 'express';
interface JwtUser {
    userId: string;
    email: string;
    role: string;
}
export declare class UsersController {
    getProfile(req: Request & {
        user: JwtUser;
    }): Express.User & JwtUser;
}
export {};
