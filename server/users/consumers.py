import json

from channels.generic.websocket import AsyncWebsocketConsumer


class SubmissionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("submissions_group", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("submissions_group", self.channel_name)

    async def submission_update(self, event):
        await self.send(text_data=json.dumps(event["message"]))
