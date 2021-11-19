from django.urls import path

from blog.my_views import city, province, book
from blog.my_views import publisher

urlpatterns = [
    path('provinces/', province.show, name='provinces_all'),
    path('cities/', city.show, name='cities_all'),
    path('cities/create', city.create, name='cities_create'),
    path('cities/store', city.store, name='cities_store'),
    path('cities/edit', city.edit, name='cities_edit'),
    path('cities/update', city.update, name='cities_update'),
    path('cities/delete', city.delete, name='cities_delete'),
    path('cities/get/province/', city.get_cities, name='cities_get'),
    path('publishers/', publisher.show, name='publishers_all'),
    path('book/', book.show, name='book_create'),

]
