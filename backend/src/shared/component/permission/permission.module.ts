import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionService } from './permission.service';

@Module({
    imports: [PrismaModule],
    providers: [PermissionService]
})
export class PermissionModule { }
