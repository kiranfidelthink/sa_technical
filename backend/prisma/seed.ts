import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    //Save project data in DB
    await prisma.project.createMany({
        data: [
            { name: 'Project A', state: 'Propose', date: new Date('2022-01-01').toISOString() },
            { name: 'Project B', state: 'Open', date: new Date('2022-02-09').toISOString() },
            { name: 'Project C', state: 'Open', date: new Date('2022-04-13').toISOString() },
        ]
    });

    //Save access data in DB
    await prisma.access.createMany({
        data: [
            { project_id: 1, user_id: 1, permit: 'Read' },
            { project_id: 1, user_id: 1, permit: 'Create' },
            { project_id: 1, user_id: 1, permit: 'Update' },
            { project_id: 1, user_id: 1, permit: 'Delete' },
            { project_id: 1, user_id: 2, permit: 'Read' },
            { project_id: 1, user_id: 2, permit: 'Create' },
            { project_id: 1, user_id: 3, permit: 'Read' },
            { project_id: 2, user_id: 1, permit: 'Read' },
            { project_id: 2, user_id: 1, permit: 'Create' },
            { project_id: 2, user_id: 1, permit: 'Update' },
            { project_id: 2, user_id: 1, permit: 'Delete' },
            { project_id: 2, user_id: 2, permit: 'Read' },
            { project_id: 2, user_id: 2, permit: 'Create' },
            { project_id: 2, user_id: 2, permit: 'Update' },
            { project_id: 3, user_id: 1, permit: 'Read' },
            { project_id: 3, user_id: 1, permit: 'Create' },
            { project_id: 3, user_id: 1, permit: 'Update' },
            { project_id: 3, user_id: 1, permit: 'Delete' },
            { project_id: 3, user_id: 2, permit: 'Read' },
            { project_id: 3, user_id: 3, permit: 'Read' },
            { project_id: 3, user_id: 3, permit: 'Create' },
            { project_id: 3, user_id: 3, permit: 'Update' },
            { project_id: 3, user_id: 3, permit: 'Delete' },
        ]
    });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });