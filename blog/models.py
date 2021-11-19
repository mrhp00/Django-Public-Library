from django.db import models


class Province(models.Model):
    title = models.CharField(max_length=100)

    class Meta:
        db_table = 'provinces'


class City(models.Model):
    title = models.CharField(max_length=150)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)

    class Meta:
        db_table = 'cities'


class Publisher(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    phone = models.CharField(max_length=13)
    mobile = models.CharField(max_length=13)

    class Meta:
        db_table = 'publishers'


class Author(models.Model):
    name = models.CharField(max_length=30)
    family = models.CharField(max_length=50)

    class Meta:
        db_table = 'authors'


class Book(models.Model):
    title = models.CharField(max_length=100)
    isbn = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author, db_table='author_book')

    class Meta:
        db_table = 'books'
