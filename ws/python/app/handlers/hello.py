from pydantic import BaseModel
import fastapi
import typing


class HelloArgs(BaseModel):
    id: int
    name: str

async def hello(args: HelloArgs, res: fastapi.Response) -> fastapi.Response:
    return f"hello id: {args.id}, name: {args.name}"