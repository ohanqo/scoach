import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./v1/app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({ origin: "http://localhost:8080" });
    app.setGlobalPrefix("/api/v1");
    await app.listen(3000);
}
bootstrap();
