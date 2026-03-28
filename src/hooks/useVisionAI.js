import { NAVIGATE_PROMPT, ASK_PROMPT } from '../utils/prompts'

export function useVisionAI() {

    async function analyzeFrame(base64, mode = 'navigate', question = '') {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY

        const isAsk = mode === 'ask'
        const model = isAsk
            ? import.meta.env.VITE_OPENAI_ASK_MODEL
            : import.meta.env.VITE_OPENAI_NAVIGATE_MODEL

        const promptText = isAsk
            ? `${ASK_PROMPT}\n\nUser's question: ${question}`
            : NAVIGATE_PROMPT

        const maxTokens = isAsk ? 150 : 100

        const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    max_tokens: maxTokens,
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: promptText
                                },
                                {
                                    type: 'image_url',
                                    image_url: {
                                        url: base64,
                                        detail: isAsk ? 'high' : 'low'
                                    }
                                }
                            ]
                        }
                    ]
                })
            }
        )

        const data = await response.json()
        const text = data.choices[0].message.content.trim()

        return {
            text,
            isAlert: text.startsWith('ALERT:'),
            isClear: text === 'CLEAR'
        }
    }

    return { analyzeFrame }
}