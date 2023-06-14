from django.contrib import admin
from .models import Usuario, UF, Modulo, Anuncio, Grupo, Modulo, Tarea, Ejercicio, TestCases, Opciones, UsuarioTareaEjercicio
#rom .models import User


# auth
# admin.site.register(User), Tarea,Ejercicio, Opciones, TestCases
# Register your models here.

admin.site.register(Usuario)
admin.site.register(UF)
admin.site.register(Modulo)
admin.site.register(Tarea)
admin.site.register(Anuncio)
admin.site.register(Grupo)
admin.site.register(Ejercicio)
admin.site.register(TestCases)
admin.site.register(Opciones)
admin.site.register(UsuarioTareaEjercicio)
