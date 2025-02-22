import { Prisma } from '@prisma/client';
import { notifyTableChanged, prisma } from '../database-connection';

export const ModelProfileController = {
    create: async (profile: Prisma.ModelProfilesCreateInput) => {
        const result = await prisma.modelProfiles.create({ data: profile });
        await notifyTableChanged('ModelProfiles', result.id);
        return result;
    },
    update: async (id: string, profile: Prisma.ModelProfilesUpdateInput) => {
        const result = await prisma.modelProfiles.update({ where: { id }, data: profile });
        await notifyTableChanged('ModelProfiles', id);
        return result;
    },
    delete: async (id: string) => {
        await prisma.modelProfiles.delete({ where: { id } });
        notifyTableChanged('ModelProfiles', id);
    },
    findUnique: async (id: string) => {
        return await prisma.modelProfiles.findUnique({ where: { id } });
    },
    findMany: async (where?: Prisma.ModelProfilesWhereInput) => {
        return await prisma.modelProfiles.findMany({ where });
    },
};
