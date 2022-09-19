import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { access_permit } from 'src/shared/enum/common.enum';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  /**
   * Purpose: Common function to create project
   * @param data
   * @returns
   */
  async create(data: CreateProjectDto, userId) {
    try {
      // Save project into DB
      const project = await this.prisma.project.create({
        data: {
          name: data.name,
          state: data.state,
        }
      });

      // Save access/permits in access table
      if (data.permit.length) {
        await Promise.all(data.permit.map(async (permit: access_permit) => {
          await this.prisma.access.create({
            data: {
              project_id: project.id,
              user_id: +userId,
              permit: permit
            }
          });
        })).catch((err) => {
          throw new Error(` Error while creating access ${err}`);
        });
      }
      return `Project created successfully`;
    } catch (error) {
      throw new Error(`Error while creating project: ${error}`);
    }
  }

  /**
  * Purpose: Common function to get all project and permission using user id
  * @param userId
  * @returns
  */
  async findAllProjectsWithPermission(userId) {
    try {
      return await this.prisma.access.findMany({
        where: {
          user_id: userId,
        },
        include: {
          project: true
        }
      });
    } catch (error) {
      throw new Error(`Error while fetching projects: ${error.message}`)
    }
  }

  /**
  * Purpose: Common function to get all project using user id
  * @param userId
  * @returns
  */
  async findAllProjects(userId) {
    try {
      let projects = await this.prisma.access.findMany({
        where: {
          user_id: userId,
        },
        select: {
          project: true
        }
      });
      // Format reponse (remove duplicate projects)
      let response = projects.map((pro) => pro.project);
      response = response.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.id === value.id
        ))
      );
      return response;
    } catch (error) {
      throw new Error(`Error while fetching projects: ${error.message}`)
    }
  }

  /**
  * Purpose: Common function to update project using project id
  * @param projectId
  * @param data
  * @returns
  */
  async update(projectId: number, data: UpdateProjectDto) {
    try {
      return this.prisma.project.update({
        where: {
          id: projectId
        },
        data: data,
      });
    } catch (error) {
      throw new Error(`Error while updating project: ${error}`);
    }
  }


  /**
  * Purpose: Common function to delete project using project id
  * @param projectId
  * @returns
  */
  async remove(projectId: number) {
    try {
      return this.prisma.project.delete({ where: { id: projectId } });
    } catch (error) {
      throw new Error(`Error while deleting project: ${error}`);
    }
  }
}
