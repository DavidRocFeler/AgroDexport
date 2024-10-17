import { UpdateCommissionDto } from './updateComission.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    preloadCategories(categoryData: UpdateCommissionDto): Promise<any>;
}
