import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
export declare class UsersController {
    private readonly userServices;
    constructor(userServices: UsersService);
    updateUser(id: string, userData: CreateUserDto): Promise<void>;
}
