import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AccountStatus } from '../../common/enums/account-status.enum';
import { Role } from '../../common/enums/role.enum';
interface JwtPayload {
    sub: string;
    email: string;
    role: Role;
    status: AccountStatus;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): {
        userId: string;
        email: string;
        role: Role;
        status: AccountStatus;
    };
}
export {};
