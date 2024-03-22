# BellBoost Al Companion
By CODE Atzen at START Hack 2024 in St. Gallen

## Introduction
An App that uses AI to speak to the Bell Food Group employees and motivates them to do their jobs. The app is available in every language and made for people without technical knowledge. 
Employees can ask questions about the company, get life and health advice, learn languages, and find coworkers and groups of the same interests. 
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
- Chatengine IO API

Frontend
- React-Native
- Expo

# Sample Video (Dev Stage Mar 22. 2024)
https://github.com/Hannes221/bellfood_start_2024/assets/113210660/276287c4-3b45-48e8-9c26-2d5b7f78ca76


## Installation
The app is containerized with Docker. To run the app, you must have Docker installed on your machine.

1. Clone the repository
2. Copy the .env.example file in the frontend and backend directories to .env `cp .env.example .env`
    - Fill in the credentials for Predictionguard LLM and Chatengine IO Api in the `.env` file of the backend directory
    - Fill in the Chatengine IO Project ID in the `.env` file of the frontend directory
3. Run `npx expo` in the frontend directory
4. Potentially run `yarn install` in the frontend directory
4. Run `poetry install` in the backend directory
5. Or simply run `docker-compose up` in the root directory

## Backend Endpoints
- `/message` - Chat with the AI via a POST request in [llm.py](backend/src/routers/llm.py)
- `/authenticate` - Chatengine IO access via POST request in [chat.py](backend/src/routers/chat.py)
- `/user` - Coworker Signup via POST request in [interest.py](backend/src/routers/interest.py)
- `/matching` - Coworker Matchmaking via POST request in [interest.py](backend/src/routers/matchmaking.py)

## Predictionguard LLM
The AI is provided by [Predictionguard LLM](https://docs.predictionguard.com/docs/getting-started/welcome).

Ask @Hannes221 for the credentials.

## Chatengine IO API
The Chat feature is provided by [Chatengine IO](https://chatengine.io/docs).
The project address is [here](https://chatengine.io/projects/8cbae9cf-b388-4448-801f-6855fd62a8ad#).

Ask @maxonary for the credentials.
