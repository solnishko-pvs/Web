import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerDocumentOptions, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";




async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1/')

    const config = new DocumentBuilder()
        .setTitle('SWAGGER API')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('КупиДевайс')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/v1/', app, document);

    // app.useGlobalGuards(new JwtAuthGuard(new JwtService({})))
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => console.log(`Start on port ${PORT}`))
}

start()