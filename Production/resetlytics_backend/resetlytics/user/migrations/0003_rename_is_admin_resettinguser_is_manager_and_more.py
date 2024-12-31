# Generated by Django 5.0 on 2024-04-07 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0002_remove_resettinguser_last_login_at"),
    ]

    operations = [
        migrations.RenameField(
            model_name="resettinguser",
            old_name="is_admin",
            new_name="is_manager",
        ),
        migrations.AddField(
            model_name="resettinguser",
            name="is_staff",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="resettinguser",
            name="email",
            field=models.EmailField(
                max_length=255, unique=True, verbose_name="Professional email address"
            ),
        ),
    ]
