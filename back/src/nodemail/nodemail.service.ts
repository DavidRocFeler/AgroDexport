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
      html: htmlTemplate, 
    };


    try {
      const info = await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error enviando email: ', error);
    }
  }



  async sendIncompleteCertificationsEmail(
    userName: string,
    userLastName: string,
    email: string,
    companyName: string,
    productNames: string[]
): Promise<void> {

  const path = require('path');
  const fs = require('fs');

    const templatePath = path.join(process.cwd(), 'src', 'template','certifications-email.html');
    if (!fs.existsSync(templatePath)) {
      console.error(`El archivo de plantilla no existe en la ruta: ${templatePath}`);
    }
    
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Reemplazar las variables de plantilla
    htmlTemplate = htmlTemplate.replace('{{user_name}}', userName);
    htmlTemplate = htmlTemplate.replace('{{user_lastname}}', userLastName);
    htmlTemplate = htmlTemplate.replace('{{company_name}}', companyName);

    console.log(productNames);

 // Convertir el array de nombres de productos en una lista HTML
const productListHTML = productNames
  .map(name => `<li><span class="titleSee">${name}</span></li>`)
  .join('');

// Reemplazar el bloque completo de cada producto en el HTML con la lista generada
htmlTemplate = htmlTemplate.replace(
  /{{#each products_names}}[\s\S]*{{\/each}}/,
  productListHTML
);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Incomplete Product Certifications on AgroDexports',
        html: htmlTemplate,
    };

    try {
        const info = await this.transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
}
