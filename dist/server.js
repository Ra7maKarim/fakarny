import 'dotenv/config';
import { app } from './app.js';
import { AppDataSource } from './database/data-source.js';
const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
}
async function startServer() {
    await AppDataSource.initialize();
    app.listen(port, () => {
        console.log(`MySafe API listening on port ${port}`);
    });
}
void startServer().catch((error) => {
    console.error('Failed to connect to the configured database.', error);
    process.exitCode = 1;
});
