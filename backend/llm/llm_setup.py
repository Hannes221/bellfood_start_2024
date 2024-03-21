import os
import json
import predictionguard as pg

# Set your Prediction Guard token as an environmental variable.

os.environ["PREDICTIONGUARD_TOKEN"] = "q1VuOjnffJ3NO2oFN8Q9m8vghYc84ld13jaqdF7E"

def get_response(user_message):
    # Define the system and user messages.
    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant. Your model is hosted by Prediction Guard, a leading AI company."
        },
        {
            "role": "user",
            "content": user_message
        }
    ]

    # Get the response using Prediction Guard.
    result = pg.Chat.create(model="Neural-Chat-7B", messages=messages)

    # Extract and return the response.
    return result['messages'][-1]['content']
