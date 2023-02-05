from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView, DetailView
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Product, Category
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.contrib import messages
from django.views import View
from .forms import RegisterForm, LoginForm
from django.contrib.auth.views import LoginView, PasswordResetView
from django.db.models import Q 
from django.urls import reverse_lazy
from django.contrib.messages.views import SuccessMessageMixin
from .forms import UpdateUserForm, UpdateProfileForm
from django.contrib.auth.views import PasswordChangeView

# Create your views here.

# @login_required
# def profile(request):
#     return render(request, 'users/profile.html')

def home(request):
    return render(request, 'home.html')

@login_required
def profile(request):
    return render(request, 'profile.html')

def about(request):
    return render(request,'about.html' )

def order(request):
    return render(request, 'order.html')

def chekout(request):
    return render(request, 'chekout.html')

def policy(request):
    return render(request, 'policy.html')





#  Product CRUD
class ProductList(ListView):
    model = Product

class ProductDetail(DetailView):
    model = Product


class ProductCreate(LoginRequiredMixin, CreateView):
    model = Product
    fields = '__all__' # ['name', 'price', 'description', 'quantity', 'image' ,'sku', 'category']

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

class ProductUpdate(LoginRequiredMixin, UpdateView):
    model = Product
    fields = ['name', 'price', 'description', 'quantity', ]

class ProductDelete(LoginRequiredMixin, DeleteView):
    model = Product
    success_url = '/product/'

# def signup(request):
#     error_message = ""
#     #error message is a must for project 3
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             login(request, user)
#             return redirect('home')
#         else:
#             error_message = "Invalid attempt - Try again."
    
#     form = UserCreationForm()
#     context = {'form': form, ' error_message': error_message}
#     return render(request, 'registration/signup.html', context)

# Category CRUD
class CategoryList(ListView):
    model = Category
    
class CategoryDetail(DetailView):
    model = Category


class CategoryCreate(LoginRequiredMixin, CreateView):
    model = Category
    fields = '__all__'

class CategoryUpdate(LoginRequiredMixin, UpdateView):
    model = Category
    fields = '__all__'

class CategoryDelete(LoginRequiredMixin, DeleteView):
    model = Category
    success_url = '/category/'

# class CategoryProductListView(ListView):
#     template_name = 'products_by_category'
#     model = Product
#     def get_queryset(self):   
#         query = self.request.GET.get("pk")
#         Product.objects.filter(Q(category__icontains = query))

class SearchResultView(ListView):
    model= Product
    template_name = 'search_result'

    def get_queryset(self):
        result = self.request.GET.get("search")
        object_list = Product.objects.filter(
            Q(name__icontains = result )
        )
        return object_list
# Category filtered by user
class CategoyByUserView(ListView):
    model= Category
    template_name = 'category_user'

def dispatch(self, request, *args, **kwargs):
        # will redirect to the home page if a user tries to access the register page while logged in
        if request.user.is_authenticated:
            return redirect(to='/')

        # else process dispatch as it otherwise normally would
        return super(RegisterView, self).dispatch(request, *args, **kwargs)
def get_queryset(self):
        object_list = Category.objects.filter(user= self.request.user)
        return object_list
# Products filtered by user
class ProductByUserView(ListView):
    model= Product
    template_name = 'product_user'
class RegisterView(View):
    form_class = RegisterForm
    initial = {'key': 'value'}
    template_name = 'register.html'

    def get(self, request, *args, **kwargs):
        form = self.form_class(initial=self.initial)
        return render(request, self.template_name , {'form': form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            form.save()

            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}')

            return redirect(to='login')

        return render(request, self.template_name, {'form': form})
# class CategoyByUserView(ListView):
#     model= Category
#     template_name = 'category_user'
    # def get_queryset(self):
    #     object_list =Product.objects.filter(user= self.request.user)
    #     return object_list
@login_required
def dashboard(request):
    return render(request, 'dashboard.html')

class CustomLoginView(LoginView):
    form_class = LoginForm

    def form_valid(self, form):
        remember_me = form.cleaned_data.get('remember_me')

        if not remember_me:
            # set session expiry to 0 seconds. So it will automatically close the session after the browser is closed.
            self.request.session.set_expiry(0)

            # Set session as modified to force data updates/cookie to be saved.
            self.request.session.modified = True

        # else browser session will be as long as the session cookie time "SESSION_COOKIE_AGE" defined in settings.py
        return super(CustomLoginView, self).form_valid(form)

class ResetPasswordView(SuccessMessageMixin, PasswordResetView):
    template_name = 'password_reset.html'
    email_template_name = 'password_reset_email.html'
    subject_template_name = 'password_reset_subject'
    success_message = "We've emailed you instructions for setting your password, " \
                      "if an account exists with the email you entered. You should receive them shortly." \
                      " If you don't receive an email, " \
                      "please make sure you've entered the address you registered with, and check your spam folder."
    success_url = reverse_lazy('home')

@login_required
def profile(request):
    if request.method == 'POST':
        user_form = UpdateUserForm(request.POST, instance=request.user)
        profile_form = UpdateProfileForm(request.POST, request.FILES, instance=request.user.profile)
        

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Your profile is updated successfully')
            return redirect(to='profile')
    else:
        user_form = UpdateUserForm(instance=request.user)
        profile_form = UpdateProfileForm(instance=request.user.profile)

    return render(request, 'profile.html', {'user_form': user_form, 'profile_form': profile_form})

class ChangePasswordView(SuccessMessageMixin, PasswordChangeView):
    template_name = 'change_password.html'
    success_message = "Successfully Changed Your Password"
    success_url = reverse_lazy('home')


# class MyCategoryDetail(DetailView):
#     model = Category
#     template_name='my_category_detail.html'