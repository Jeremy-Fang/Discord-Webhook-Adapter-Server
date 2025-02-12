import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../../package.json';

const options: swaggerJsdoc.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'REST API Documentation',
            version
        },
    },
    apis: ['./src/routes/*.ts', './src/routes/*/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Docs in JSON format
    app.get('/docs.json', (request: Request, response: Response) => {
        response.setHeader('Content-Type', 'application/json');
        response.send(swaggerSpec);
    });
}

export default swaggerDocs;