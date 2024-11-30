from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.shortcuts import get_object_or_404
from ninja import Router

from users.models import Submission
from users.schemas import SubmissionSchema, SubmissionResponseSchema

router = Router()


@router.post("/submissions/", response=SubmissionResponseSchema)
def create_submission(request, payload: SubmissionSchema):
    submission = Submission.objects.create(**payload.dict())

    submission_data = {
        "id": submission.id,
        "name": submission.name,
        "email": submission.email,
        "date_of_birth": submission.date_of_birth.isoformat(),
        "department": submission.department,
        "comments": submission.comments,
        "created_at": submission.created_at.isoformat(),
    }

    # Send data to WebSocket group
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "submissions_group",
        {
            "type": "submission.update",
            "message": submission_data
        }
    )

    return submission_data


@router.get("/submissions/", response=list[SubmissionResponseSchema])
def list_submissions(request):
    submissions = Submission.objects.all()
    return [
        {
            "id": submission.id,
            "name": submission.name,
            "email": submission.email,
            "date_of_birth": submission.date_of_birth,
            "department": submission.department,
            "comments": submission.comments,
            "created_at": submission.created_at.date(),
        }
        for submission in submissions
    ]


@router.get("/submissions/{submission_id}/", response=SubmissionResponseSchema)
def get_submission(request, submission_id: int):
    submission = get_object_or_404(Submission, id=submission_id)
    return submission
