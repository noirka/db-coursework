import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import Sensible from '@fastify/sensible';
import { join } from 'desm';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.decorate('prisma', prisma);

fastify.register(Sensible);

fastify.register(AutoLoad, {
  dir: join(import.meta.url, 'plugins'),
  dirNameRoutePrefix: false,
});

fastify.register(AutoLoad, {
  dir: join(import.meta.url, 'routes'),
  dirNameRoutePrefix: false,
});

fastify.listen(
  { port: process.env.PORT || 3000, host: '0.0.0.0' },
  (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`Server listening on ${address}`);
  }
);
