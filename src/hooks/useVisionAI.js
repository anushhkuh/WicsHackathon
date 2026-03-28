import { describeScene, answerQuestion } from '../services/openai'

export function useVisionAI() {

    async function analyzeFrame(base64, mode = 'navigate', question = '') {

        // Strip the data:image/jpeg;base64, prefix if present
        // Person B's service expects raw base64, not the full data URL
        const rawBase64 = base64.includes(',')
            ? base64.split(',')[1]
            : base64

        let text

        if (mode === 'ask') {
            text = await answerQuestion(rawBase64, question)
        } else {
            text = await describeScene(rawBase64)
        }

        return {
            text,
            isAlert: text.toLowerCase().startsWith('alert:'),
            isClear: text.toLowerCase().includes('path clear') || text === 'CLEAR'
        }
    }

    return { analyzeFrame }
}