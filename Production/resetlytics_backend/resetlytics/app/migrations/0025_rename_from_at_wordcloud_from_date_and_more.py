# Generated by Django 5.0 on 2024-02-13 14:57

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0024_alter_sentimentmarks_options_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="wordcloud",
            old_name="from_at",
            new_name="from_date",
        ),
        migrations.RenameField(
            model_name="wordcloud",
            old_name="till_at",
            new_name="till_date",
        ),
        migrations.AddField(
            model_name="wordcloud",
            name="tendency",
            field=models.CharField(
                choices=[
                    ("Positive", "Positive"),
                    ("Negative", "Negative"),
                    ("Neutral", "Neutral"),
                ],
                default="Neutral",
                max_length=50,
            ),
        ),
        migrations.AlterField(
            model_name="sentimentmarks",
            name="outcome",
            field=models.CharField(
                choices=[
                    ("Positive", "Positive"),
                    ("Negative", "Negative"),
                    ("Neutral", "Neutral"),
                ],
                default="Neutral",
                max_length=50,
            ),
        ),
        migrations.AlterField(
            model_name="sentimentmarks",
            name="value",
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name="wordcloud",
            name="count_words",
            field=models.IntegerField(default=0),
        ),
    ]