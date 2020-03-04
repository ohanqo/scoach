import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { useContainer } from "class-validator";
import { AppModule } from "./v1/app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableCors({ origin: "http://localhost:8080" });
    app.setGlobalPrefix("/api/v1");
    app.useStaticAssets(`${__dirname}/../uploads/`);

    const options = new DocumentBuilder()
        .setTitle("Scoach Documentation")
        .setDescription("Documentation of Socach API v1")
        .setVersion("1.0.0")
        .addTag("Auth")
        .addTag("User")
        .addTag("Report")
        .addTag("Assignment")
        .addTag("Course")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`/api/v1/documentation`, app, document);

    await app.listen(3000);
}

bootstrap();
