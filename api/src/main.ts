import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { useContainer } from "class-validator";
import { AppModule } from "./v1/app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableCors({ origin: "http://localhost:8080" });
    app.setGlobalPrefix("/api/v1");
    app.useStaticAssets(`${__dirname}/../uploads/`);
    await app.listen(3000);
}

bootstrap();
