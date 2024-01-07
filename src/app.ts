
import fastifyCookie from '@fastify/cookie';
import fastify, { FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';

export const app = fastify();

app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
  sign: {
    expiresIn: '10m'
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  }
});

//TODO: register routes here

app.setErrorHandler((error, _, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    //NOTE: here we can log to an external tool like NewRelic
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
