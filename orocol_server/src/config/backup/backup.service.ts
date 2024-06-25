import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class BackupService {
    private readonly logger = new Logger(BackupService.name);

    constructor(private readonly configService: ConfigService) {}

    @Cron(CronExpression.EVERY_DAY_AT_NOON) // Se actualiza a diario a las 00:00:00 horas, EVERY_DAY_AT_MIDNIGHT
    handleCron() {
        const dbName = this.configService.get<string>('DB_DATABASE');
        const dbUser = this.configService.get<string>('DB_USER');
        const dbPassword = this.configService.get<string>('DB_PASSWORD');
        const dbHost = this.configService.get<string>('DB_HOST');
        const dbPort = this.configService.get<number>('DB_PORT'); // Localiza la base de datos

        const backupPath = path.resolve(__dirname, '../../../backups');
        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath);
        } // Crear carpeta 'backups' si no existe

        const fileName = `backup_${new Date().toISOString().replace(/[:.]/g, '-')}.sql`;
        const filePath = path.join(backupPath, fileName);

        process.env.PGPASSWORD = dbPassword;
        // 'PG' es para PostgreSQL
        const pgDumpPath = `"C:\\Program Files\\PostgreSQL\\15\\bin\\pg_dump.exe"`; // De manera local en Windows
        const command = `${pgDumpPath} -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} > "${filePath}"`; // Advertencia: solo funciona en Windows
        exec(command, (error, stdout, stderr) => {
            if (error) {
                this.logger.error(`Error al crear el backup: ${error.message}`);
                return;
            }
            this.logger.log(`Backup creado satisfactoriamente: ${filePath}`);
        });
    }
}
