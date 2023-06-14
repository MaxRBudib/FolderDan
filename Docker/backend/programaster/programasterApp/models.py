from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models import JSONField

import random, string

from django.http import JsonResponse
# Creación de opciones de dificultad
DIFICULTY_CHOICES = (
    ("1", "Fácil"),
    ("2", "Medio"),
    ("3", "Díficil")
)

STATUS_TAREA_EJERCICIO_CHOICES = (
    ("0", "Sin completar"),
    ("1", "Intentado"),
    ("2", "Completado")
)
# Creación tabla usuario

class UserManager(BaseUserManager):
    
    use_in_migration = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is Required')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff = True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')

        return self.create_user(email, password, **extra_fields)


class Usuario(AbstractUser):

    username = None
    matricula_nomina = models.CharField(max_length=9, unique=True, primary_key= True)
    nombre_usuario = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    rol = models.CharField(max_length=100)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre_usuario']

    def __str__(self):
        return self.nombre_usuario
    
    
    
   
# Creación tabla UF
class UF(models.Model):
    uf_id = models.CharField(max_length=6, primary_key=True, unique=True)
    nombre_uf = models.CharField(max_length = 50)
    descripcion = models.TextField()


# Creación Tabla Grupo

class Grupo(models.Model):
    grupo_id = models.CharField(max_length = 10, primary_key = True, unique= True)
    nombre_grupo = models.CharField(max_length = 100)
    codigo_acceso = models.CharField(max_length = 6)
    periodo_ini = models.IntegerField()
    periodo_fin = models.IntegerField()
    Semestre = models.CharField(max_length = 12)
    uf_id = models.ForeignKey(UF, on_delete = models.RESTRICT)
    profe_nomina = models.ForeignKey(Usuario, on_delete= models.RESTRICT)
    
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.nombre_grupo = self.uf_id.nombre_uf if self.uf_id else ''
        
    def generate_access_code(self):
        letters = random.choices(string.ascii_uppercase, k=3)
        numbers = random.choices(string.digits, k=3)
        return ''.join(letters + numbers)

    def generate_group_id(self):
        group_id = f"{self.uf_id.uf_id}.{random.randint(1, 999):03d}"
        return group_id

    def save(self, *args, **kwargs):
        if not self.grupo_id:
            self.grupo_id = self.generate_group_id()
        if not self.codigo_acceso:
            self.codigo_acceso = self.generate_access_code()
        super().save(*args, **kwargs)


# Cración tabla Teoria
class Anuncio(models.Model):
    anuncio_id = models.AutoField(primary_key=True, unique= True)
    titulo = models.CharField(max_length = 100)
    descripcion = models.TextField()
    publicado_el = models.DateField(auto_now_add=True)
    grupo_id = models.ForeignKey(Grupo, on_delete = models.RESTRICT)

    # Creación tabla Módulo
class Modulo(models.Model):
    modulo_id = models.AutoField(primary_key=True, unique=True)
    nombre_Modulo = models.CharField(max_length = 100)
    descripcion = models.TextField()
    grupo_id = models.ForeignKey(Grupo, on_delete = models.RESTRICT)


# Creación tabla Tarea
class Tarea(models.Model):
    tarea_id = models.AutoField(primary_key=True, unique=True)
    nombre_tarea = models.CharField(max_length = 50)
    num_intentos = models.IntegerField()
    num_reactivos= models.IntegerField()
    fecha_limite =  models.DateTimeField()
    status = models.BooleanField()
    modulo_id = models.ForeignKey(Modulo,on_delete = models.RESTRICT )
    
    def save(self, *args, **kwargs):
        self.status = True
        super().save(*args, **kwargs)
    
# Creación tabla ejercicio
class Ejercicio(models.Model):
    ejercicio_id = models.AutoField(primary_key = True, unique=True)
    matricula_nomina = models.ForeignKey(Usuario, max_length = 9, on_delete = models.RESTRICT)
    titulo = models.CharField(max_length = 50)
    tema = models.CharField(max_length = 50)
    descripcion = models.TextField()
    tipo = models.CharField(max_length = 20)
    # lista de opciones de dificultad (la lista se encuentra al inicio del codigo)
    dificultad = models.CharField(max_length = 20)

# Tabla Ej_multiple

class Opciones(models.Model):
    opcion_id = models.AutoField(primary_key = True, unique=True)
    ejercicio_id = models.ForeignKey(Ejercicio, on_delete = models.RESTRICT)
    respuesta = models.BooleanField()
    texto = models.TextField()
    

# Tabla Ej_codigo
class TestCases(models.Model):
    testCase_id = models.AutoField(primary_key = True, unique=True)
    ejercicio_id = models.ForeignKey(Ejercicio, on_delete = models.RESTRICT)
    input = models.TextField()
    output = models.TextField()

    
# Tabla muchos a muchos UsuarioEjercicios
class UsuarioTareaEjercicio(models.Model):
    id = models.AutoField(primary_key=True)
    matricula_nomina = models.ForeignKey(Usuario, on_delete = models.RESTRICT)
    ejercicio_id = models.ForeignKey(Ejercicio, on_delete = models.RESTRICT)
    tarea_id = models.ForeignKey(Tarea, on_delete = models.RESTRICT)
    status = models.CharField(max_length = 20,
        choices = STATUS_TAREA_EJERCICIO_CHOICES,
        default = '0')

class UsuarioGrupo(models.Model):
    matricula_nomina = models.ForeignKey(Usuario, on_delete = models.RESTRICT)
    grupo_id = models.ForeignKey(Grupo, on_delete = models.RESTRICT)

class EjercicioTarea(models.Model):
    ejercicio_id = models.ForeignKey(Ejercicio, on_delete = models.RESTRICT)
    tarea_id = models.ForeignKey(Tarea, on_delete = models.RESTRICT)