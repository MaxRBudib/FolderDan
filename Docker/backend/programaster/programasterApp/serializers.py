from rest_framework.serializers import ModelSerializer, ALL_FIELDS
from .models import  EjercicioTarea ,Usuario, UF, Modulo, Anuncio, Grupo, Tarea,Ejercicio, TestCases, Opciones, UsuarioTareaEjercicio, UsuarioGrupo
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ["matricula_nomina", "email", "nombre_usuario", "apellido", "password", "rol"]

    def create(self, validated_data):
        user = Usuario.objects.create(email=validated_data['email'],
                                       nombre_usuario=validated_data['nombre_usuario'],
                                       matricula_nomina=validated_data['matricula_nomina'],
                                       apellido=validated_data['apellido'],
                                       rol=validated_data['rol']                                       
                                         )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UFSerializer(ModelSerializer):
    class Meta: 
        model = UF
        fields = ALL_FIELDS

class ModuloPostSerializer(ModelSerializer):
    class Meta: 
        model = Modulo
        fields = ALL_FIELDS

class ModuloGetSerializer(ModelSerializer):
    class Meta: 
        model = Modulo
        fields = ["nombre_Modulo", "grupo_id", "modulo_id"]

class GrupoPostSerializer(ModelSerializer):
    class Meta: 
        model = Grupo  
        fields = ["uf_id", "periodo_ini", "periodo_fin", "Semestre","grupo_id", "nombre_grupo", "codigo_acceso", "profe_nomina"]
        read_only_fields=["grupo_id", "nombre_grupo", "codigo_acceso"]
        
        def create(self,validated_data):
            validated_data.pop('grupo_id', None)
            validated_data.pop('nombre_grupo', None)
            validated_data.pop('codigo_acceso', None) 
             
        
class GrupoGetSerializer(ModelSerializer):
    class Meta: 
        model = Grupo
        fields = ALL_FIELDS

class TareaGetSerializer(ModelSerializer):
    class Meta: 
        model = Tarea
        fields = ALL_FIELDS
        
class TareaPostSerializer(ModelSerializer):
    class Meta: 
        model = Tarea
        fields = ["modulo_id", "fecha_limite", "num_intentos", "num_reactivos", "nombre_tarea"]
        read_only_fields= ["tarea_id, status"]
        
        def create(self,validated_data):
            validated_data.pop('tarea_id', None)
            validated_data.pop('status', None)


class EjercicioPostSerializer(ModelSerializer):
    class Meta: 
        model = Ejercicio
        fields = ["ejercicio_id", "matricula_nomina", "titulo", "tema", "descripcion", "tipo", "dificultad"]
        read_only_fields= ["ejercicio_id"]
        
        def create(self,validated_data):
            validated_data.pop('ejercicio_id', None)
            
class EjercicioGetSerializer(ModelSerializer):
    class Meta: 
        model = Ejercicio
        fields = ALL_FIELDS

class OpcionesSerializer(ModelSerializer):
    class Meta: 
        model = Opciones
        fields = ALL_FIELDS

class TestCasesSerializer(ModelSerializer):
    class Meta: 
        model = TestCases
        fields = ALL_FIELDS

class UsuarioTareaEjercicioSerializer(ModelSerializer):
    class Meta: 
        model = UsuarioTareaEjercicio
        fields = ALL_FIELDS

class AnuncioSerializer(ModelSerializer):
    class Meta: 
        model = Anuncio
        fields = ALL_FIELDS

class UsuarioGrupoSerializer(ModelSerializer):
    class Meta: 
        model = UsuarioGrupo
        fields = ALL_FIELDS

class EjercicioTareaSerializer(ModelSerializer):
    class Meta: 
        model = EjercicioTarea
        fields = ALL_FIELDS