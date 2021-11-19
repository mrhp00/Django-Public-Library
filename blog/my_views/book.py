from rest_framework.decorators import api_view
from rest_framework.response import Response

from blog.models import Author


@api_view(["POST"])
def create(request):
    authors = Author.objects.all()
    ath = []
    for author in authors:
        ath.append({'id': author.id, 'name': author.name, 'family': author.family})
    content = {
        'error': False,
        'message': "",
        'data': {'authors': ath}
    }
    return Response(content)


@api_view(["POST"])
def show(request):
    pass
