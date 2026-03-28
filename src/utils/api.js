const getKey = () => import.meta.env.VITE_OPENAI_API_KEY
const BASE = 'https://api.openai.com/v1'

export async function transcribeAudio(audioBlob) {
  const formData = new FormData()
  formData.append('file', audioBlob, 'recording.webm')
  formData.append('model', 'whisper-1')
  formData.append('language', 'en')

  const response = await fetch(`${BASE}/audio/transcriptions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getKey()}` },
    body: formData,
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || 'Whisper API error')
  }

  const data = await response.json()
  return data.text
}

export async function speakText(text) {
  const response = await fetch(`${BASE}/audio/speech`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice: 'nova',
      response_format: 'mp3',
    }),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || 'TTS API error')
  }

  const audioBuffer = await response.arrayBuffer()
  return new Blob([audioBuffer], { type: 'audio/mpeg' })
}

export async function analyzeFrame(base64Image) {
  const response = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${base64Image}`, detail: 'low' },
          },
          {
            type: 'text',
            text: 'You are a navigation assistant for a blind person. Describe what is directly ahead in 1-2 short sentences. Focus on obstacles, paths, hazards. If the scene is safe and clear, respond with only the word CLEAR.',
          },
        ],
      }],
    }),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || 'Vision API error')
  }

  const data = await response.json()
  return data.choices[0].message.content.trim()
}

export async function askAboutFrame(base64Image, question) {
  const response = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${base64Image}`, detail: 'high' },
          },
          {
            type: 'text',
            text: `You are a helpful assistant for a blind person. Answer this question about what you see: "${question}". Be clear and concise, under 3 sentences.`,
          },
        ],
      }],
    }),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || 'Vision Ask API error')
  }

  const data = await response.json()
  return data.choices[0].message.content.trim()
}
