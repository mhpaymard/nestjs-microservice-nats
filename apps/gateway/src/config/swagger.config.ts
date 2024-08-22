import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function SwaggerConfigInit(app:INestApplication):void{
    const document = new DocumentBuilder()
    .setTitle("Nestjs-Microservices-Authentication")
    .setDescription("Nestjs-Microservices-Authentication-Nats-TypeOrm-Postgresql")
    .setVersion("v0.0.1")
    .addBearerAuth(
        {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'authorization',
            description: 'Enter JWT token',
            in: 'header',
        },
        'authorization',
    )
    .build();
    const swaggerDocument = SwaggerModule.createDocument(app,document);
    SwaggerModule.setup("/swagger",app,swaggerDocument);
}