# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-30 06:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20170429_2002'),
    ]

    operations = [
        migrations.AlterField(
            model_name='drawing',
            name='image',
            field=models.ImageField(blank=True, upload_to='drawings/'),
        ),
    ]