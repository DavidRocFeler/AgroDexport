import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class MatchPassword implements ValidatorConstraintInterface {
    validate(password: any, args: ValidationArguments): Promise<boolean> | boolean;
    defaultMessage(args?: ValidationArguments): string;
}
