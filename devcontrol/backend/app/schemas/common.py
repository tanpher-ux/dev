from pydantic import BaseModel


class Message(BaseModel):
    message: str


class Paginated(BaseModel):
    page: int
    page_size: int
    total: int
