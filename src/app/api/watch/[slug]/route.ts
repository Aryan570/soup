import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    const collection = db.collection(slug);
    const changeStream = collection.watch([], { fullDocument: 'updateLookup' });
    const encoder = new TextEncoder();
    let controllerClosed = false;
    const stream = new ReadableStream({
        start(controller) {
            changeStream.on('change', (change : any) => {
                if (change.operationType === 'insert') {
                    const data = `data: ${JSON.stringify(change.fullDocument)}\n\n`;
                    controller.enqueue(encoder.encode(data));
                }
            });
            changeStream.on('error', (error : any) => {
                if (!controllerClosed) {
                    controller.error(error);
                    controllerClosed = true;
                }
            });
            req.signal.addEventListener('abort', () => {
                if (!controllerClosed) {
                    changeStream.close();
                    controller.close();
                    controllerClosed = true;
                }
            });
        },
        cancel() {
            if (!controllerClosed) {
                changeStream.close();
                controllerClosed = true;
            }
        }
    });
    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    });
}

