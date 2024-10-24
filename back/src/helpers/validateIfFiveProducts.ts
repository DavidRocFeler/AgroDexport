import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'ValidateIfFiveProducts', async: false })
export class ValidateIfFiveProducts implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const dto = args.object as any;
        
        const products = [
            dto.product_one_id,
            dto.product_two_id,
            dto.product_three_id,
            dto.product_four_id,
            dto.product_five_id
        ];

        const productCount = products.filter(product => product !== undefined && product !== null).length;

       
        return productCount <= 5;
    }

    defaultMessage(args: ValidationArguments) {
        return 'No more than 5 products are allowed.';
    }
}
