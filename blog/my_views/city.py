from rest_framework.decorators import api_view
from rest_framework.response import Response
from onesignal_sdk.client import Client

from blog.models import Province

from blog.models import City


@api_view(["POST"])
def show(request):
    cities = City.objects.all()
    provinces = Province.objects.all()
    cts = []
    prvcs = []
    for province in provinces:
        prvcs.append({'id': province.id, 'title': province.title})
    for city in cities:
        cts.append({'id': city.id, 'title': city.title, 'province': city.province.title})
    content = {
        'error': False,
        'message': "",
        'data': {'province': prvcs, 'cities': cts}
    }
    return Response(content)


@api_view(["POST"])
def create(request):
    provinces = Province.objects.all()
    prvcs = []
    for province in provinces:
        prvcs.append({'id': province.id, 'title': province.title})
    content = {
        'error': False,
        'message': "",
        'data': {'provinces': prvcs}
    }
    return Response(content)


@api_view(["POST"])
def store(request):
    title = request.data['title']
    province = request.data['province']
    new = City.objects.create(title=title, province=Province.objects.get(id=province))
    client = Client(app_id="f6cc14cd-b352-47a6-b352-23fcf3731f75",
                    rest_api_key="ZjBkODdlMTktYzhjMC00NDYzLWEzMmItNjJkYWZkMTc3NWQ5",
                    user_auth_key="MjgwNzUwOTItOGIxYi00MDZmLThlZDMtNDI5ZTlhOGZhYzAw")

    notification_body = {
        'contents': {'en': 'New City Has Been Added'},
        'included_segments': ['Subscribed Users']
        # 'data': {'id': new.id, 'title': title, 'province': province}
    }
    response = client.send_notification(notification_body)

    content = {
        'error': False,
        'message': "",
        'data': {},
        "push_res": response.body
    }
    return Response(content)


@api_view(["POST"])
def edit(request):
    id = request.data['id']
    city = City.objects.get(id=id)
    provinces = Province.objects.all()
    prvcs = []
    for province in provinces:
        prvcs.append({'id': province.id, 'title': province.title})
    c = {'id': city.id, 'title': city.title, 'province': city.province_id}
    content = {
        'error': False,
        'message': "",
        'data': {'city': c, 'provinces': prvcs}
    }
    return Response(content)


@api_view(["POST"])
def update(request):
    id = request.data['id']
    title = request.data['title']
    province = request.data['province']
    city = City.objects.get(id=id)
    city.id = id
    city.title = title
    city.province = Province.objects.get(id=province)
    city.save()
    content = {
        'error': False,
        'message': "",
        'data': {}
    }
    return Response(content)


@api_view(["POST"])
def delete(request):
    id = request.data['id']
    city = City.objects.get(id=id)
    city.delete()
    content = {
        'error': False,
        'message': "",
        'data': {}
    }
    return Response(content)


@api_view(["POST"])
def get_cities(request):
    province = request.data['province']
    # print(province)
    # print('===========================>')
    cities = City.objects.filter(province=Province.objects.get(id=province))
    # for i in cities:
    #     print(i.title)
    # print('++++++++++++++++++++++++++++>')
    cts = []
    for city in cities:
        cts.append({'id': city.id, 'title': city.title, 'province': city.province.title})
    content = {
        'error': False,
        'message': "",
        'data': {'cities': cts}
    }
    return Response(content)
