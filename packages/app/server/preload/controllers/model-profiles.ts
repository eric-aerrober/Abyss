import { Prisma } from '@prisma/client';
import { notifyTableChanged, prisma } from '../database-connection';

export const ModelConnectionController = {
    create: async (Connection: Prisma.ModelConnectionsCreateInput) => {
        const result = await prisma.modelConnections.create({ data: Connection });
        await notifyTableChanged('ModelConnections', result.id);
        return result;
    },
    update: async (id: string, Connection: Prisma.ModelConnectionsUpdateInput) => {
        const result = await prisma.modelConnections.update({ where: { id }, data: Connection });
        await notifyTableChanged('ModelConnections', id);
        return result;
    },
    delete: async (id: string) => {
        await prisma.modelConnections.delete({ where: { id } });
        notifyTableChanged('ModelConnections', id);
    },
    findUnique: async (id: string) => {
        return await prisma.modelConnections.findUnique({ where: { id } });
    },
    findMany: async (where?: Prisma.ModelConnectionsWhereInput) => {
        return await prisma.modelConnections.findMany({ where });
    },
};
