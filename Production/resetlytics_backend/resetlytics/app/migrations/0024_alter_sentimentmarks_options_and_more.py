# Generated by Django 5.0 on 2024-02-13 14:44

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0023_alter_organization_unique_together_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="sentimentmarks",
            options={"ordering": ["-date"]},
        ),
        migrations.RenameField(
            model_name="sentimentmarks",
            old_name="sentiment_at",
            new_name="date",
        ),
    ]