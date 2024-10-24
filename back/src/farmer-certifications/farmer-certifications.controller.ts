import { Controller, Post, Body, Get, Param, UseGuards, HttpCode, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/RolesGuard';
import { Roles } from '../decorators/roles.decorator';
import { CreateFarmerCertificationDto } from './farmer-certifications.dto'; 
import { FarmerCertificationService } from './farmer-certifications.service';
import { UpdateFarmerCertificationDto } from './update-farmer-certifications.dto';

@ApiBearerAuth()
@ApiTags('farmer-certifications')
@Controller('farmer-certifications')
export class FarmerCertificationController {
    constructor(private readonly farmerCertificationService: FarmerCertificationService) {}

    @HttpCode(201)
    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('supplier', 'admin') 
    @ApiBody({
        description: 'Create a new farmer certification with associated product certifications.',
        required: true,
        type: CreateFarmerCertificationDto,
    })
    async createFarmerCertification(
        @Body() createFarmerCertificationDto: CreateFarmerCertificationDto,
    ) {
        return this.farmerCertificationService.createCertification(createFarmerCertificationDto);
    }

    @HttpCode(200)
    @Get(':farmerId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('supplier', 'admin') 
    @ApiParam({ name: 'farmerId', description: 'ID of the Farmer Certification' })
    async getCertificationsByFarmer(@Param('farmerId') farmerId: string) {
        return this.farmerCertificationService.getCertificationsByFarmer(farmerId);
    }

    @HttpCode(200)
    @Put(':farmerId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'supplier') 
    @ApiParam({ name: 'farmerId', description: 'ID of the Farmer Certification to update' })
    @ApiBody({
        description: 'Update an existing farmer certification.',
        required: true,
        type: CreateFarmerCertificationDto,
    })
    async updateFarmerCertification(
        @Param('farmerId') farmerId: string,
        @Body() updateFarmerCertificationDto: UpdateFarmerCertificationDto,
    ) {
        return this.farmerCertificationService.updateCertification(farmerId, updateFarmerCertificationDto);
    }


    @HttpCode(204)
    @Delete(':farmerId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'supplier') 
    @ApiParam({ name: 'farmerId', description: 'ID of the Farmer Certification to delete' })
    async deleteFarmerCertification(@Param('farmerId') farmerId: string) {
        return this.farmerCertificationService.deleteCertification(farmerId);
    }
}
