from pydantic import BaseModel

class UserBase(BaseModel):
    food: bool
    languages: bool
    travel: bool
    technology: bool
    music: bool
    art: bool
    sports: bool
    origin: bool
    health: bool
    freetime: bool
    culture: bool
    nature: bool