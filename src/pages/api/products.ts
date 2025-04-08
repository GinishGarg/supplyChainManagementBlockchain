import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import csv from 'csv-parser';

const filePath = path.join(process.cwd(), 'data', 'products.csv');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const results: any[] = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.status(200).json(results);
        });
}
