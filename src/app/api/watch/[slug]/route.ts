import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { db } = await connectToDatabase();
    const collection = db.collection(req.query.slug as string);
    const changeStream = collection.watch([], { fullDocument: 'updateLookup' });
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    changeStream.on('change', (change : any) => {
        if (change.operationType === 'insert') {
            res.write(`data: ${JSON.stringify(change.fullDocument)}\n\n`);
        }
    });

    req.on('close', () => {
        changeStream.close();
        res.end();
    });
}
