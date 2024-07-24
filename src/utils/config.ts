import { Config } from '../types/config';
import fs from 'fs';
import path from 'path';

const configPath = path.join(__dirname, '../../config.json');

const loadConfig = (): Config => {
    if (!fs.existsSync(configPath)) {
        throw new Error(`Config file not found at ${configPath}`);
    }

    const rawData = fs.readFileSync(configPath, 'utf-8');
    const parsedData = JSON.parse(rawData);
    return parsedData as Config;
};

const config = loadConfig();
export default config;