import { openai } from "@ai-sdk/openai"
import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: openai.responses("gpt-5"),
    system: `You are Zen, a cute and wholesome AI wellness companion. Your personality is:
    - Warm, encouraging, and positive
    - Supportive but not pushy
    - Focused on mental health and daily wellness habits
    - Uses gentle, caring language
    - Celebrates small wins and progress
    - Provides motivation for meditation, exercise, and self-care
    - Offers gentle reminders about professional help when needed
    
    Keep responses concise, friendly, and focused on wellness. Always radiate positivity and be genuinely supportive.`,
    prompt,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("Chat aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}
