# BellBoost Al Companion
By CODE Atzen at START Hack 2024 in St. Gallen

## Introduction
An App that uses AI to speak to the Bell Food Group employees and motivates them to do their jobs. The app is available in every language and made for people without technical knowledge. 
Employees can ask questions about the company, life advice, and health advice, learn languages, and find coworkers and groups of the same interests. 
The app uses AI to match people and make their lives in a new country more accessible and fun. 

## Features
- Chatbot
- Multi-language
- Chat with coworkers
- Match people
- Learn languages
- Health advice
- Life advice
- Company information

## Technologies
Backend
- Python
- Poetry
- FastAPI
- Predictionguard LLM
- Chatengine IO Api

Frontend
- React-Native
- Expo

## Installation
The app is containerized with Docker. To run the app, you need to have Docker installed on your machine.

1. Clone the repository
2. Fill in the credentials for Predictionguard LLM and Chatengine IO Api in the `.env` file in the backend directory
3. Run `docker-compose up` in the backend directory
4. Run `npx expo` in the frontend directory

## Backend Endpoints
- `/message` - Chat with the AI via a POST request in [llm.py](backend/src/routers/llm.py)
- `/authenticate` - Chatengine IO access via POST request in [chat.py](backend/src/routers/chat.py)
- `/user` - Coworker Matchmaking via POST request in [interest.py](backend/src/routers/interest.py)

## Predictionguard LLM
The AI is provided by [Predictionguard LLM](https://docs.predictionguard.com/docs/getting-started/welcome).

Ask @Hannes221 for the credentials.

## Chatengine IO Api
The Chat feature is provided by [Chatengine IO](https://chatengine.io/docs).
The project adress is [here](https://chatengine.io/projects/8cbae9cf-b388-4448-801f-6855fd62a8ad#).

Ask @maxonary for the credentials.