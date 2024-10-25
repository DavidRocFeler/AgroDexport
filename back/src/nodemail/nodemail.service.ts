import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from "dotenv";
import * as fs from 'fs';
import * as path from 'path';

dotenvConfig({ path: ".env" });

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendResetPasswordEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado: ', info.response);
    } catch (error) {
      console.error('Error enviando email: ', error);
    }
  }

 

  async sendRegistrationEmail(to: string, subject: string, name: string, role_name: string): Promise<void> {
    
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
      html: htmlTemplate, // Asigna la plantilla HTML al correo
    };
    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to,
    //   subject,
    //   text,
    // };


    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado: ', info.response);
    } catch (error) {
      console.error('Error enviando email: ', error);
    }
  }
}
