from sqlalchemy.orm import Mapped, mapped_column
import uuid
from backend.src.database.database import Base, engine


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, index=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column()
    food: Mapped[bool] = mapped_column()
    languages: Mapped[bool] = mapped_column()
    travel: Mapped[bool] = mapped_column()
    technology: Mapped[bool] = mapped_column()
    music: Mapped[bool] = mapped_column()
    art: Mapped[bool] = mapped_column()
    sports: Mapped[bool] = mapped_column()
    origin: Mapped[bool] = mapped_column()
    health: Mapped[bool] = mapped_column()
    freetime: Mapped[bool] = mapped_column()
    culture: Mapped[bool] = mapped_column()
    nature: Mapped[bool] = mapped_column()
    
    
Base.metadata.create_all(bind=engine)