from rest_framework.decorators import api_view
from rest_framework.response import Response
from blog.models import Publisher, Province
from blog.models import City


@api_view(["POST"])
def show(request):
    publishers = Publisher.objects.all()
    cities = City.objects.all()
    pb = []
    for publisher in publishers:
        pb.append(
            {'id': publisher.id, 'name': publisher.name, 'address': publisher.address, 'city': publisher.city.title,
             'phone': publisher.phone, 'mobile': publisher.mobile})
    content = {
        'error': False,
        'message': "",
        'data': {publishers: pb}
    }
    return Response(content)


