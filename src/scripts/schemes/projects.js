// Схема для оновлення проекту
export const updateProjectSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 },
      description: { type: 'string', minLength: 1 },
      ownerId: { type: 'number' },
      teamId: { type: 'number' },
    },
    required: [],
    additionalProperties: false,
  },
};

// Схема для створення проекту
export const createProjectSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 },
      description: { type: 'string', minLength: 1 },
      ownerId: { type: 'number' },
      teamId: { type: 'number' },
    },
    required: ['name', 'ownerId', 'teamId'], // Обов'язкові поля для створення проекту
    additionalProperties: false,
  },
};
