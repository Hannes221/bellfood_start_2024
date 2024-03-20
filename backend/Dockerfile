FROM python:3.11

ENV POETRYVERSION=1.5.1

RUN pip install poetry==${POETRYVERSION}
RUN poetry config virtualenvs.create false

WORKDIR /app/backend

COPY ./backend/poetry.lock ./backend/pyproject.toml ./

RUN poetry install --no-interaction --no-ansi

COPY ./backend/src /backend/src

ENV PYTHONPATH=/app/backend
