from pydantic import BaseModel
import uuid

class UserBase(BaseModel):
    email: str
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
    
class UserRead(UserBase):
    id: uuid.UUID

    class Config:
        orm_mode = True