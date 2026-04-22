interface TrackPayload {
  newsId: number
  variant: 'A' | 'B'
  sessionId: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<TrackPayload>(event)

  if (!body?.newsId || !body?.variant || !body?.sessionId) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  // In production this would write to a database.
  // For the prototype we just acknowledge the event.
  return { ok: true, timestamp: new Date().toISOString() }
})
