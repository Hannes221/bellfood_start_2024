import pytest
from unittest.mock import MagicMock
from sqlalchemy.orm import Session
from backend.src.database.models import User
from backend.src.matching import calculate_match, get_best_matches  # Adjust import paths as necessary

def test_calculate_match():
    user1 = MagicMock(spec=User)
    user1.configure_mock(**{"name": "Alice", "age": 30, "interests": "reading", "id": 1, "email": "alice@example.com"})
    criteria = MagicMock(spec=User)
    criteria.configure_mock(**{"name": "Alice", "age": 30, "interests": "sports"})

    assert calculate_match(user1, criteria) == 2, "Should match on 2 attributes (name, age)"

def test_get_best_matches():
    session = MagicMock(spec=Session)
    user1 = MagicMock(spec=User)
    user1.configure_mock(**{"id": 1, "name": "Alice", "age": 30, "interests": "reading", "email": "alice@example.com"})
    user2 = MagicMock(spec=User)
    user2.configure_mock(**{"id": 2, "name": "Bob", "age": 25, "interests": "reading", "email": "bob@example.com"})
    criteria = MagicMock(spec=User)
    criteria.configure_mock(**{"name": "Alice", "age": 30, "interests": "reading"})
    session.query.return_value.all.return_value = [user1, user2]

    matches = get_best_matches(session, criteria, limit=2)
    assert len(matches) == 1, "Should return 1 best match"
    assert matches[0].id == 1, "The best match should be user1"
