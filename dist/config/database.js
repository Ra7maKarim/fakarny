import { z } from 'zod';
const databaseEnvironmentSchema = z.object({
    DB_HOST: z.string().min(1).default('localhost'),
    DB_PORT: z.coerce.number().int().min(1).max(65_535).default(5432),
    DB_USERNAME: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),
});
export function parseDatabaseConfig(environment) {
    const result = databaseEnvironmentSchema.safeParse(environment);
    if (!result.success) {
        const details = result.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join('; ');
        throw new Error(`Invalid database configuration: ${details}`);
    }
    return result.data;
}
