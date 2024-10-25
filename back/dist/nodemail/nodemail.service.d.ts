export declare class EmailService {
    private transporter;
    constructor();
    sendResetPasswordEmail(to: string, subject: string, text: string): Promise<void>;
    sendRegistrationEmail(to: string, subject: string, name: string, role_name: string): Promise<void>;
}
