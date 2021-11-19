from rest_framework.decorators import api_view
from rest_framework.response import Response

from blog.models import Province


@api_view(["POST"])
def show(request):
    provinces = Province.objects.all()
    prv = []
    for province in provinces:
        prv.append({'id': province.id, 'title': province.title})
    content = {
        'error': False,
        'message': "",
        'data': {'provinces': prv}
    }
    return Response(content)
