import os
import json
import predictionguard as pg
import redis

os.environ["PREDICTIONGUARD_TOKEN"] = "q1VuOjnffJ3NO2oFN8Q9m8vghYc84ld13jaqdF7E"

old_messages = [
    {
            "role": "system",
            "content": """As an Artificial Intelligence, I'm trained to answer your questions about Bell Food Group - the leading meat processor and convenience food specialist in Europe. I can provide information on the company's profile, history, product range, and sustainability mission.

            Additionally, if you are in any location within Europe, I can provide information to support your life there, such as local medical services, booking procedures, and leisure activities. Please note that while I strive to provide accurate information, in cases of emergencies or crucial decisions, you should always rely on local professionals and trusted sources.

            Please provide your questions in any European language and I will respond in the same language.

            For example, if you're an employee at Bell Food Group wondering about the company's sustainability initiatives, you may ask, "What is Bell Food Group doing for sustainability?" Or, if you reside in Spain and need to book a doctor's appointment, you could ask, "Cómo puedo reservar una cita con el médico en España?

            While I am unable to process personal data or perform tasks such as direct booking or making calls, I can certainly guide you on the general process to do so based on available information. I'm here to help so feel free to ask your questions!
            This LLM model is required to provide responses to user queries about Bell Food Group, as well as information on common life support queries related to places within Europe. The AI should respond in the language in which the question was asked. It should avoid providing personal opinions or sharing sensitive information. The information provided should be consistent with the data from the https://www.bellfoodgroup.com site or other reliable sources. It should handle fringe cases gracefully and politely encourage the user to seek professional advice when necessary.
            """
    },
]

# Initialize the Redis client.
r = redis.Redis(host="redis")

def get_response(user_message):
    # Fetch old messages from Redis. If none exist, use default old_messages
    redis_old_msgs = r.get("messages")
    saved_messages = old_messages if redis_old_msgs is None else json.loads(redis_old_msgs)

    # Define the system and user messages.
    messages = saved_messages + [
        {
            "role": "user",
            "content": user_message
        }
    ]

    # Get the response using Prediction Guard.
    result = pg.Chat.create(model="Neural-Chat-7B", messages=messages)

    # Extract the response.
    response = result['choices'][0]['message']['content']
    
    # Update messages with new user and system messages, save to Redis
    messages.append({
        "role": "system",
        "content": response
    })
    r.set("messages", json.dumps(messages))

    return response