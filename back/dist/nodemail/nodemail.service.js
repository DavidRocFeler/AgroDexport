"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer = require("nodemailer");
const common_1 = require("@nestjs/common");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env" });
let EmailService = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    async sendResetPasswordEmail(to, subject, text) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email enviado: ', info.response);
        }
        catch (error) {
            console.error('Error enviando email: ', error);
        }
    }
    async sendRegistrationEmail(to, subject, name, role_name) {
        const path = require('path');
        const fs = require('fs');
        const templatePath = path.join(process.cwd(), 'src', 'template', 'welcome-email.html');
        if (!fs.existsSync(templatePath)) {
            console.error(`El archivo de plantilla no existe en la ruta: ${templatePath}`);
        }
        let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
        htmlTemplate = htmlTemplate.replace('{{name}}', name);
        htmlTemplate = htmlTemplate.replace('{{role}}', role_name);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlTemplate,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email enviado: ', info.response);
        }
        catch (error) {
            console.error('Error enviando email: ', error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=nodemail.service.js.map