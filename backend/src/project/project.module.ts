import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionModule } from 'src/shared/component/permission/permission.module';
import { PermissionService } from 'src/shared/component/permission/permission.service';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService, PermissionService]
})
export class ProjectModule {}
