import {
  updateProjectSchema,
  createProjectSchema,
} from '../schemas/projects.js';

export const autoPrefix = '/api';

export default async function (fastify) {
  const {
    getProjects,
    getProjectById,
    updateProject,
    createProject,
    deleteProject,
  } = fastify;

  // Створюємо маршрути API для проектів
  fastify.get(`${autoPrefix}/projects`, getProjects);
  fastify.get(`${autoPrefix}/projects/:id`, getProjectById);
  fastify.patch(
    `${autoPrefix}/projects/:id`,
    { schema: updateProjectSchema },
    updateProject
  );
  fastify.post(
    `${autoPrefix}/projects`,
    { schema: createProjectSchema },
    createProject
  );
  fastify.delete(`${autoPrefix}/projects/:id`, deleteProject);
}
