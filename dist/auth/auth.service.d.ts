import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';
import { AccountStatus } from 'src/common/enums/account-status.enum';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        id: string;
        email: string;
        role: Role;
        status: AccountStatus;
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
