import fp from 'fastify-plugin';

const projects = async (fastify) => {
  const { prisma, httpErrors } = fastify;

  // Handler for retrieving all projects
  async function getProjects(req, res) {
    const projects = await prisma.project.findMany();
    res.send(projects);
  }

  // Handler for retrieving a project by ID
  async function getProjectById(req, res) {
    const { id } = req.params;
    const intId = parseInt(id, 10);
    if (isNaN(intId)) {
      throw httpErrors.badRequest('Project ID must be an integer');
    }
    const project = await prisma.project.findUnique({
      where: { id: intId },
    });
    if (!project) {
      throw httpErrors.notFound('Project not found');
    }
    res.send(project);
  }

  // Handler for updating a project
  async function updateProject(req, res) {
    const { id } = req.params;
    const intId = parseInt(id, 10);
    if (isNaN(intId)) {
      throw httpErrors.badRequest('Project ID must be an integer');
    }
    try {
      const updatedProject = await prisma.project.update({
        where: { id: intId },
        data: req.body,
      });
      res.send(updatedProject);
    } catch (error) {
      throw httpErrors.badRequest('Invalid request data');
    }
  }

  // Handler for creating a new project
  async function createProject(req, res) {
    try {
      const newProject = await prisma.project.create({
        data: req.body,
      });
      res.send(newProject);
    } catch (error) {
      throw httpErrors.badRequest('Invalid request data');
    }
  }

  // Handler for deleting a project
  async function deleteProject(req, res) {
    const { id } = req.params;
    const intId = parseInt(id, 10);
    if (isNaN(intId)) {
      throw httpErrors.badRequest('Project ID must be an integer');
    }
    try {
      await prisma.project.delete({
        where: { id: intId },
      });
      res.status(200).send({
        message: 'Project successfully deleted',
      });
    } catch (error) {
      throw httpErrors.badRequest('Failed to delete project');
    }
  }

  // Decorate Fastify instance with CRUD operations
  fastify.decorate('getProjects', getProjects);
  fastify.decorate('getProjectById', getProjectById);
  fastify.decorate('updateProject', updateProject);
  fastify.decorate('createProject', createProject);
  fastify.decorate('deleteProject', deleteProject);
};

export default fp(projects, {
  name: 'projects',
});
