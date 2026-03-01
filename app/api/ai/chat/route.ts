import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'OPENAI_API_KEY is not configured' }), { status: 500 });
    }

    const systemInstruction = `You are an elite AI assistant for the admin of a Web3 e-commerce store called Nexus. 
You have access to store data, analytics, and fraud detection systems. Help the admin manage their store, analyze transactions, and make business decisions. Be concise, data-driven, and actionable. Do not hallucinate fake data unless asked for an example.

CURRENT STORE CONTEXT (REAL-TIME DATABASE DATA):
${context || 'No live data available. Database might be disconnected.'}`;

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [
        { role: 'system', content: systemInstruction },
        ...messages.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.text || m.content,
        })),
      ],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate response' }), { status: 500 });
  }
}
