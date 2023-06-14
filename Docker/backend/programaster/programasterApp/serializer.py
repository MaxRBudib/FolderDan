from rest_framework import serializers, routers, viewsets
from rest_framework.serializers import ModelSerializer
from .models import Usuario



class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['matricula_nomina',
                  'rol',
                  'nombre_usuario', 
                  'apellido',
                  'correo',
                  'contraseña',
                  'status']
    