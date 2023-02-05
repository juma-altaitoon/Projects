from django.db import models
from django.urls import reverse
from datetime import date
from django.contrib.auth.models import User
from PIL import Image





class Profile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    roles = (
        ('Customer', 'Customer'),
        ('Merchant', 'Merchant'),
    )
    name= models.CharField(max_length=100, null=True)
    last_name= models.CharField(max_length=100, null=True)
    roles = models.CharField(max_length=50, choices = roles, null=True)
    date = models.DateField(auto_now_add=True)
    avatar = models.ImageField(default='default.jpg', upload_to='main_app/static/profile-images')
    bio = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)


    def __str__(self):
        return self.name.username
    
    def get_absolute_url(self):
        return reverse('detail', kwargs={'profile_id': self.id})
# Product Model 
class Category(models.Model):
    type = models.CharField(max_length=50)
    cat_image = models.ImageField(upload_to='main_app/static/category-images/', default="")
    
    def __str__(self):
        return self.type
    def get_absolute_url(self):
        return reverse('category')


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=3)
    description = models.TextField(max_length=255)
    quantity = models.IntegerField()
    image= models.ImageField(upload_to='main_app/static/product-images/', default="")
    sku = models.BigIntegerField()
    category = models.ForeignKey(Category, on_delete= models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('product')