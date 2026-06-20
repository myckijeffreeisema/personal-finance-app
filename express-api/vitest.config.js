import { defineConfig } from "vitest/config";
import "dotenv/config";

export default defineConfig({
    test: {
        env: {
            APP_ENV: "test",
            DATABASE_URL: process.env.DATABASE_URL_TEST,
            SECRET_KEY: process.env.SECRET_KEY_TEST
        },
        fileParallelism: false,
        isolate: true
    },
});