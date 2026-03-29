# VoiceGuide

AI-powered navigation companion for blind and low-vision users.

Point your camera at your surroundings, and VoiceGuide will 
describe what it sees in real time. Tap Ask to ask any question 
about what you see or hold up to the camera.

## Features

- Navigate mode: automatic scene descriptions every 3 seconds
- Ask mode: tap to ask any question about what the camera sees
- Works on iPhone and desktop browsers
- Powered by GPT-4o Vision + OpenAI TTS

## Setup

1. Clone the repo
   git clone https://github.com/mmehta29/WicsHackathon.git
   cd WicsHackathon

2. Install dependencies
   npm install

3. Create .env.local with your API key
   VITE_OPENAI_API_KEY=your-key-here
   VITE_OPENAI_NAVIGATE_MODEL=gpt-4o-mini
   VITE_OPENAI_ASK_MODEL=gpt-4o
   VITE_OPENAI_TTS_VOICE=nova

4. Run locally
   npm run dev

5. Deployed link: https://wics-hackathon-kappa.vercel.app/

## Tech Stack

- React + Vite
- Tailwind CSS
- OpenAI GPT-4o Vision
- OpenAI TTS (Nova voice)
- OpenAI Whisper
- MediaStream API
- Web Audio API

## Team

Built at WiCS x Opportunity Hack 2026
