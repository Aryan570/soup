import { connectToDatabase } from '@/lib/mongodb';
import { MongoClient } from 'mongodb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req : Request) {
//   const { collections } = await req.json();
  let session = await getServerSession(authOptions);
  const collections = session.devices;
  if (!Array.isArray(collections) || collections.length === 0) {
    return new NextResponse('Invalid collections array', { status: 400 });
  }
  const {db} = await connectToDatabase();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const changeStreams = collections.map((collectionName) => {
          const collection = db.collection(collectionName);
          const changeStream = collection.watch();

          changeStream.on('change', (change : any) => {
            controller.enqueue(
              `data: ${JSON.stringify({ collection: collectionName, change })}\n\n`
            );
          });

          changeStream.on('error', (error : Error) => {
            console.error(`Error in change stream for ${collectionName}:`, error);
            changeStream.close();
            controller.error(error);
          });

          return changeStream;
        });

        req.signal.addEventListener('abort', () => {
          console.log('Client disconnected');
          changeStreams.forEach((changeStream) => changeStream.close());
          controller.close();
        });
      } catch (err) {
        console.error(err);
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
