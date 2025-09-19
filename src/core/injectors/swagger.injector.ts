import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export default function InjectSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('API NestFund NGO')
        .setDescription('The NestFund NGO API is a backend system designed to streamline the management of NGOs, fundraising campaigns, donations, and user roles. Built with NestJS, it ensures a secure and scalable architecture powered by JWT authentication, role-based permissions, and Prisma ORM for database interactions. The API enables NGOs to register and manage campaigns, donors to contribute securely, and administrators to oversee operations with fine-grained access control. With integrated support for Swagger and Postman, NestFund offers an interactive and developer-friendly environment for testing and documentation, making it an all-in-one solution for digital NGO management and fundraising.')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter JWT token as: Bearer <accessToken>',
                in: 'header',
            },
            'authorization',
        )
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api-docs/v1', app, documentFactory, {
        swaggerOptions: {
            persistAuthorization: true, // keep token between page reloads
        },
    });
}