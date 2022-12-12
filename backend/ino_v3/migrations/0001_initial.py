# Generated by Django 3.1.12 on 2022-12-12 17:38

from django.db import migrations, models
import django.db.models.deletion
import djongo.models.fields
import ino_v3.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Login',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.TextField()),
                ('Username', models.TextField()),
                ('Avatar', models.TextField()),
                ('Email', models.TextField()),
                ('Description', models.TextField()),
                ('Phone_no', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Signup',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.TextField()),
                ('Username', models.TextField()),
                ('Avatar', models.TextField()),
                ('Email', models.TextField()),
                ('Password', models.TextField()),
                ('Description', models.TextField()),
                ('Phone_no', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Social',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Instagram', models.URLField(max_length=100)),
                ('Twitter', models.URLField(max_length=100)),
                ('Github', models.URLField(max_length=100)),
                ('LinkedIn', models.URLField(max_length=100)),
                ('Portfolio', models.URLField(max_length=100)),
                ('Other', models.URLField(max_length=100)),
                ('Username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ino_v3.signup')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Title', models.TextField()),
                ('ProjectImage', models.TextField()),
                ('Url', models.TextField()),
                ('Technology', djongo.models.fields.ArrayField(model_container=ino_v3.models.Tech, model_form_class=ino_v3.models.TechForm)),
                ('Description', models.TextField()),
                ('Username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ino_v3.signup')),
            ],
        ),
        migrations.CreateModel(
            name='Followed',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Followed', djongo.models.fields.ArrayField(model_container=ino_v3.models.Follow, model_form_class=ino_v3.models.FollowForm)),
                ('Username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ino_v3.signup')),
            ],
        ),
    ]
