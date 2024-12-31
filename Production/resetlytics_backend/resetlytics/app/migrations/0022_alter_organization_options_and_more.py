# Generated by Django 5.0 on 2024-02-12 01:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0021_alter_respondent_options_indicator_count_q1_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="organization",
            options={"ordering": ["-country"]},
        ),
        migrations.RenameField(
            model_name="sentimentmarks",
            old_name="textblob_outcome",
            new_name="outcome",
        ),
        migrations.RenameField(
            model_name="sentimentmarks",
            old_name="textblob",
            new_name="value",
        ),
        migrations.RemoveField(
            model_name="sentimentmarks",
            name="vader",
        ),
        migrations.RemoveField(
            model_name="sentimentmarks",
            name="vader_outcome",
        ),
        migrations.AddField(
            model_name="allservicequality",
            name="year",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="allsustainability",
            name="year",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="servicequality",
            name="year",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="sustainability",
            name="year",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterUniqueTogether(
            name="organization",
            unique_together={("legal_name", "country")},
        ),
    ]
