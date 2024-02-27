# 42-transcendence

### Create the hosts entries
Edit /etc/hosts and add:

```sh
127.0.0.1 transcendence.42.fr
127.0.0.1 www.transcendence.42.fr
```

### Build the application

```sh
make
```

Or:

```sh
make up
```

### Tear application down

```sh
make down
```

### Fully clean the build pipeline

```sh
make fclean
```

### Open a browser at:

https://transcendence.42.fr/

### Considerations developing locally 

# Developing the application

Run the make task to build up the application in development mode.

```sh
make
```

## Developing the backend

# Working with Django

1. SH/BASH into your 'backend' container to run npm commands

```sh
docker run --rm -it --entrypoint sh container-id
```

2. Django CLI should be already installed. Test it with:

```sh
django-admin
```

https://docs.djangoproject.com/en/5.0/intro/tutorial01/

3. Add a model/entity. Add a new model for instance in the user module:

backend/app/transcendence/user/models.py

for instance:

```Python
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
```

4. To create a database table for the `User` model and add some initial data, you can use Django's migrations framework.

5. **Create a migration for the `User` model**: Django can automatically generate a migration file that creates a database table corresponding to your `User` model. Run the following command in your terminal:

```bash
python manage.py makemigrations user
```

This command tells Django to create a new migration for the `user` module. Django will generate a migration file in the `user/migrations/` directory.

6. **Apply the migration**: To create the `User` table in your database, you need to apply the migration. Run the following command in your terminal:

```bash
python manage.py migrate user
```

This command applies all unapplied migrations for the `user` module, which should include the migration you just created.

7. **Create a data migration to add initial users**: Data migrations allow you to run custom Python code as part of a migration. You can use a data migration to add some initial `User` instances to your database. First, create an empty data migration file by running the following command:

```bash
python manage.py makemigrations user --empty
```

This will create a new, empty migration file in the `user/migrations/` directory. Open this file in your text editor, and you'll see a class named `Migration` with a `dependencies` attribute and an empty `operations` list.

You can add a `RunPython` operation to the `operations` list to execute a function that creates `User` instances. Here's an example:

```python
from django.db import migrations

def create_users(apps, schema_editor):
    User = apps.get_model('user', 'User')
    User.objects.create(name='Alice')
    User.objects.create(name='Bob')

class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),  # replace with the name of the User model's creation migration
    ]

    operations = [
        migrations.RunPython(create_users),
    ]
```

In this code, `create_users` is a function that gets the `User` model and creates two users, Alice and Bob. The `RunPython` operation tells Django to run this function when applying the migration.

8. **Apply the data migration**: Finally, apply the data migration with the following command:

```bash
python manage.py migrate user
```

This will run the `create_users` function and add Alice and Bob to the `User` table in your database.

Remember to replace `'user'` and `'User'` with the actual names of your Django app and model. This is just an example based on the information you provided. 

9. Please note that it's generally a good practice to separate schema migrations (which change the database structure, like creating a table) and data migrations (which change the database content, like adding rows to a table). This makes your migrations more flexible and easier to manage. For example, you can roll back a data migration without affecting the database schema. 


10. Test it in development browsing this URL http://localhost:3000/api/users