import { CreateUserDto } from './dtos/createUser.dto';
import { UsersRepository } from './users.repository';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UsersRepository);
    updateUser(id: string, userData: CreateUserDto): Promise<void>;
}
