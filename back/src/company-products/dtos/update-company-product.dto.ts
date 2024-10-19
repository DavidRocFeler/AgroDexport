
import { PartialType } from '@nestjs/swagger';
import { CreateCompanyProductDto } from './create-company-product.dto';

export class UpdateCompanyProductDto  extends PartialType(CreateCompanyProductDto) {

}
 
   