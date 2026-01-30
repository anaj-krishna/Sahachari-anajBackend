import { Role } from '../../common/enums/role.enum';
export declare class RegisterDto {
    name: string;
    email: string;
    shopAddress: string;
    serviceablePincodes: string[];
    password: string;
    role: Role;
}
