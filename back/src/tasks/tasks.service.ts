import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersRepository } from '../users/users.repository';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './task.dto';
import { CompanyProductsRepository } from '../company-products/company-products.repository';
import { EmailService } from '../nodemail/nodemail.service';

@Injectable()
export class TasksService {
    constructor (
        private readonly usersRepository: UsersRepository,
        private readonly notificationsService:  NotificationsService,
        private readonly tasksRepository: TasksRepository,
        private readonly companyProductsRepository: CompanyProductsRepository,
        private readonly emailService: EmailService
    ) {}


    @Cron(CronExpression.EVERY_MINUTE)
    async remindIncompleteProfiles() {
        const taskData: CreateTaskDto = {
            task_name: 'Reminder for Incomplete Profiles',
            task_status: 'pending',
            task_message: 'Send reminders to users with incomplete profiles.',
            nextRun_date: new Date(Date.now() + 7200000) 
        };
    
        const savedTask = await this.tasksRepository.createTask(taskData);

        const incompleteUsers = await this.usersRepository.findUsersWithIncompleteProfiles();
    
        if (incompleteUsers.length === 0) {
            console.log('No se encontraron usuarios con perfil incompleto');
            return;
        }
    
        console.log(`Usuarios con perfil incompleto encontrados: ${incompleteUsers.length}`);
    
        for (const user of incompleteUsers) {
            await this.notificationsService.createAndNotifyUser(
                user.user_id,
                'Please complete your profile on the platform.',
                'reminder',
                savedTask.task_id
            );
        }
    }  



    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async remindIncompleteCertifications() {
        const taskData: CreateTaskDto = {
            task_name: 'Reminder for Incomplete Product Certifications',
            task_status: 'pending',
            task_message: 'Send reminders to companies with products missing certifications.',
            nextRun_date: new Date(Date.now() + 86400000) 
        };

        const savedTask = await this.tasksRepository.createTask(taskData);

        // Productos sin farmer_id
        const productsWithoutFarmer = await this.companyProductsRepository.findProductsWithoutFarmer();

        if (productsWithoutFarmer.length > 0) {
            console.log(`Productos sin farmer_id encontrados: ${productsWithoutFarmer.length}`);

            // Agrupar productos por usuario y compañía
            const groupedProducts = this.groupProductsByUser(productsWithoutFarmer);
            
            for (const [userId, products] of Object.entries(groupedProducts)) {
                const user = products[0].company.user; // Datos del usuario del primer producto
                const companyName = products[0].company.company_name;
                const productNames = products.map(product => product.company_product_name);

                await this.notificationsService.createAndNotifyUser(
                    user.user_id,
                    'Please complete the certifications for your products.',
                    'certifications',
                    savedTask.task_id
                  );

                // Enviar correo
                await this.emailService.sendIncompleteCertificationsEmail(
                    user.user_name,
                    user.user_lastname,
                    user.credential.email,
                    companyName,
                    productNames
                );
            }
        } else {
            console.log('No se encontraron productos sin farmer_id');
        }

        // Productos con certificaciones incompletas
        const productsWithIncompleteCertifications = await this.companyProductsRepository.findProductsWithIncompleteCertifications();


        if (productsWithIncompleteCertifications.length > 0) {
            console.log(`Productos con certificaciones incompletas encontrados: ${productsWithIncompleteCertifications.length}`);

            // Agrupar productos por usuario y compañía
            const groupedProducts = this.groupProductsByUser(productsWithIncompleteCertifications);
            for (const [userId, products] of Object.entries(groupedProducts)) {
                const user = products[0].company.user;
                const companyName = products[0].company.company_name;
                const productNames = products.map(product => product.company_product_name);

                // Enviar correo
                await this.emailService.sendIncompleteCertificationsEmail(
                    user.user_name,
                    user.user_lastname,
                    user.credential.email,
                    companyName,
                    productNames
                );
            }
        } else {
            console.log('No se encontraron productos con certificaciones incompletas');
        }
    }

    // Método para agrupar productos por usuario
    private groupProductsByUser(products: any[]): Record<string, any[]> {
        return products.reduce((acc, product) => {
            const userId = product.company.user.user_id;
            if (!acc[userId]) {
                acc[userId] = [];
            }
            acc[userId].push(product);
            return acc;
        }, {});
    }

}
