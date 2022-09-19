import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PermissionService } from 'src/shared/component/permission/permission.service';
import { access_permit } from 'src/shared/enum/common.enum';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private permissionService: PermissionService,
  ) { }

  /**
   * Purpose: API to fetch all projects with its permissions using user id
   * @param userId
   * @returns
   */
  @Get('project_access/:userId')
  async findAllProjectsWithPermission(@Param('userId') userId: string) {
    await this.permissionService.checkReadCreateAccess(+userId, access_permit.READ).catch((error) => {
      throw new Error(error);
    });
    return await this.projectService.findAllProjectsWithPermission(+userId).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * Purpose: API to fetch all projects using user id
   * @param userId
   * @returns
   */
  @Get('projects/:userId')
  async findAllProjects(@Param('userId') userId: string) {
    await this.permissionService.checkReadCreateAccess(+userId, access_permit.READ).catch((error) => {
      throw new Error(error);
    });
    return await this.projectService.findAllProjects(+userId).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * Purpose: API to create project.
   * @param userId
   * @param data
   * @returns
   */
  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() data: CreateProjectDto,
  ) {
    await this.permissionService.checkReadCreateAccess(+userId, access_permit.CREATE).catch((error) => {
      throw new Error(error);
    });
    return await this.projectService.create(data, userId).catch((error) => {
      throw new Error(error);
    })
  }

  /**
     * Purpose: API to update projects using project id
     * @param userId
     * @param projectId
     * @returns
  */
  @Patch(':userId/:projectId')
  async update(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
    @Body() data: UpdateProjectDto) {
    await this.permissionService.checkCommonAccess(+userId, +projectId, access_permit.UPDATE).catch((error) => {
      throw new Error(error);
    });
    return await this.projectService.update(+projectId, data).catch((error) => {
      throw new Error(error);
    });
  }

  /**
     * Purpose: API to delete project using project id
     * @param projectId
     * @param userId
     * @returns
  */
  @Delete(':userId/:projectId')
  async remove(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ) {
    await this.permissionService.checkCommonAccess(+userId, +projectId, access_permit.DELETE).catch((error) => {
      throw new Error(error);
    });
    return await this.projectService.remove(+projectId).catch((error) => {
      throw new Error(error);
    });
  }
}
