from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, 
    AbstractUser, 
    PermissionsMixin
)

# See file user -> admin.py

# From the Django documentation
# admin-compliant custom user app. This user model uses an email address as the 
# username, and has a required "whatever""; it provides no permission checking 
# beyond an admin flag on the user account. This model would be compatible with 
# all the built-in auth forms and views, except for the user creation forms. 
# This example illustrates how most of the components work together, but is not 
# intended to be copied directly into projects for production use.

class ResettingUserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError("Users must have an email address")
        
        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email=email,
            **kwargs
        )
        user.username = user.email
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **kwargs):
        email = self.normalize_email(email)
        email = email.lower()

        user = self.create_user(
            email,
            password = password,
            **kwargs
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        
        return user

class ResettingUser(AbstractUser, PermissionsMixin):
    # the id field. 

    # TODO: VALIDATE KIND OF EMAIL
   
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(
        verbose_name="Professional email address",
        max_length=255,
        unique=True,
        blank=False
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False) # can deal with Django's admin
    is_superuser = models.BooleanField(default=False)
    
    is_manager = models.BooleanField(default=False) # the supervisor
    
    objects = ResettingUserManager()

    USERNAME_FIELD = 'email' # Change this if you want to change what the authentication parameter is
    REQUIRED_FIELDS = ['first_name', 'last_name']

    # other fields to be included
   
    # links 1 to * Organization
    # Many? No.
    email_verified_at = models.DateTimeField(null=True)    
    remember_token = models.CharField(null=True, max_length=50)
    updated_at = models.DateTimeField(null=True)
    date_joined = models.DateField(null=True)
    
    def __str__(self):
        return self.email
    
