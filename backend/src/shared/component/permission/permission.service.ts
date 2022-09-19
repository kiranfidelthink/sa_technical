import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { access_permit } from 'src/shared/enum/common.enum';

@Injectable()
export class PermissionService {
    constructor(private prisma: PrismaService) { }

    /**
     * Purpose: Common function to check read or create access of user by condition
     * @param userId
     * @returns
    */
    async checkReadCreateAccess(userId: number, access: access_permit) {
        try {
            let readAccess: boolean = false;
            let createAccess: boolean = false;
            let userAccess = await this.prisma.access.findMany({
                where: {
                    user_id: userId,
                },
                include: {
                    project: true
                }
            });
            if (!userAccess.length) {
                throw new Error(`User doest not exist`);
            }
            userAccess.map((Uaccess) => {
                if (Uaccess.permit === access_permit.READ) {
                    readAccess = true;
                }
                if (Uaccess.permit === access_permit.CREATE) {
                    createAccess = true;
                }
            });

            if (access === access_permit.READ) {
                if (!readAccess) {
                    throw new Error(`User does not have read access`);
                }
            }
            if (access === access_permit.CREATE) {
                if (!createAccess) {
                    throw new Error(`User does not have create access`);
                }
            }
        } catch (error) {
            throw new Error(`Error while creating project: ${error}`);
        }
    }

    /**
     * Purpose: Common function to check access of user
     * @param userId
     * @param projectId
     * @param access
     * @returns
    */
    async checkCommonAccess(userId: number, projectId: number, access: access_permit) {
        try {
            let userAccess = await this.prisma.access.findMany({
                where: {
                    user_id: userId,
                    project_id: projectId,
                    permit: access,
                }
            });
            if (!userAccess.length) {
                throw new Error(`User doest not have ${access} access`);
            }
        } catch (error) {
            throw new Error(`Error while creating project: ${error}`);
        }
    }
}
