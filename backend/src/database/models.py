from sqlalchemy.orm import Mapped, mapped_column
from database.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)
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