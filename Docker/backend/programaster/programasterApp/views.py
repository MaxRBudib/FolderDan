from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .models import EjercicioTarea, Usuario, UF, Modulo, Anuncio, Grupo, Tarea,Ejercicio, Opciones, TestCases, UsuarioTareaEjercicio, UsuarioGrupo
from .serializers import  EjercicioTareaSerializer ,UsuarioSerializer, UsuarioTareaEjercicioSerializer,  UFSerializer, ModuloGetSerializer, ModuloPostSerializer, AnuncioSerializer, TareaGetSerializer, TareaPostSerializer,EjercicioGetSerializer, EjercicioPostSerializer, GrupoGetSerializer, GrupoPostSerializer , OpcionesSerializer, TestCasesSerializer, UsuarioGrupoSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json, os, subprocess, re, tempfile, random, string
from io import StringIO
#from rest_framework.viewsets import ModelViewSet
#from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


def generate_random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for _ in range(length))

class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def get_queryset(self):
        email = self.request.query_params.get('email')
        matricula_nomina = self.request.query_params.get('matricula_nomina')
        if email:
            queryset = Usuario.objects.filter(email=email)
        elif matricula_nomina:
            queryset = Usuario.objects.filter(matricula_nomina=matricula_nomina)
        else:
            queryset = Usuario.objects.all()
        return queryset


class UsuarioTareaEjercicioViewSet(ModelViewSet):
    queryset = UsuarioTareaEjercicio.objects.all()
    serializer_class = UsuarioTareaEjercicioSerializer

class UFViewSet(ModelViewSet):
    queryset = UF.objects.all()
    serializer_class = UFSerializer

class ModuloViewSet(ModelViewSet):
    queryset = Modulo.objects.all()
   

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ModuloGetSerializer
        elif self.request.method == "POST":
            return ModuloPostSerializer
    
    def get_queryset(self):
        grupo_id= self.request.query_params.get('grupo_id')
        if grupo_id is not None:
            queryset = Modulo.objects.filter(grupo_id=grupo_id)
        else:
            queryset = Modulo.objects.all()
        return queryset



class AnuncioViewSet(ModelViewSet):
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer
    def get_queryset(self):
        grupo_id= self.request.query_params.get('grupo_id')
        if grupo_id is not None:
            queryset = Anuncio.objects.filter(grupo_id=grupo_id)
        else:
            queryset = Anuncio.objects.all()
        return queryset

class EjercicioTareaViewSet(ModelViewSet):
    queryset = EjercicioTarea.objects.all()
    serializer_class = EjercicioTareaSerializer   

class GrupoViewSet(ModelViewSet):
    queryset = Grupo.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return GrupoGetSerializer
        elif self.request.method == "POST":
            return GrupoPostSerializer
        
    def get_queryset(self):
        codigo_acceso = self.request.query_params.get('codigo_acceso')
        grupo_id = self.request.query_params.get('grupo_id')
        profe_nomina = self.request.query_params.get('profe_nomina')
        queryset = Grupo.objects.all()
        if codigo_acceso:
            queryset = queryset.filter(codigo_acceso=codigo_acceso)
        elif grupo_id:
            queryset = queryset.filter(grupo_id =grupo_id)
        elif profe_nomina:
            queryset = queryset.filter(profe_nomina =profe_nomina)    
        else:
            return queryset     
        return queryset
        
class TareaViewSet(ModelViewSet):
    queryset = Tarea.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return TareaGetSerializer
        elif self.request.method == "POST":
            return TareaPostSerializer
    
    def get_queryset(self):
        modulo_id = self.request.query_params.get('modulo_id')
        nombre_id = self.request.query_params.get('nombre_id')
        if modulo_id:
            queryset = Tarea.objects.filter(modulo_id=modulo_id)
        elif nombre_id:
            queryset = Tarea.objects.filter(nombre_id=nombre_id)
        else:
            queryset = Tarea.objects.all()
        return queryset

class EjercicioViewSet(ModelViewSet):
    queryset = Ejercicio.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return EjercicioGetSerializer
        elif self.request.method == "POST":
            return EjercicioPostSerializer

    def get_queryset(self):
        titulo = self.request.query_params.get('titulo')
        if titulo is not None:
            queryset = Ejercicio.objects.filter(titulo=titulo)
        else:
            queryset = Ejercicio.objects.all()
        return queryset

class OpcionesViewSet(ModelViewSet):
    queryset = Opciones.objects.all()
    serializer_class = OpcionesSerializer
    def get_queryset(self):
        ejercicio_id = self.request.query_params.get('ejercicio_id')
        if ejercicio_id is not None:
            queryset = Opciones.objects.filter(ejercicio_id=ejercicio_id)
        else:
            queryset = Opciones.objects.all()
        return queryset

class TestCasesViewSet(ModelViewSet):
    queryset = TestCases.objects.all()
    serializer_class = TestCasesSerializer


class UsuarioGrupoViewSet(ModelViewSet):
    queryset = UsuarioGrupo.objects.all()
    serializer_class = UsuarioGrupoSerializer

class AuthView(APIView):
    @csrf_exempt
    def post(self, request):
        response_data = {'output' : "Apparently"}
        return JsonResponse(response_data)
    
class CodeView(APIView):
    @csrf_exempt
    def post(self, request):
        data = request.body
        data = json.loads(data)
        if data['submit'] == False:
            data = request.body
        data = json.loads(data)
        if data['submit'] == False:
            data = data['answ']
            print(data)
            tests = '(["2", "3"], "5"), (["5", "10"], "15"), (["10", "15"], "25"),'
            #temporary directory
            random_dir_name = generate_random_string(8)
            temp_dir = tempfile.mkdtemp(prefix=random_dir_name)
            print("Temporary directory:", temp_dir)
            #temp file for code
            temp_file_path = os.path.join(temp_dir, "testCases.py")
            temp_file = open(temp_file_path, "w")
            temp_file.write(data)
            temp_file.close()
            #temp file for tests
            temp_file_path2 = os.path.join(temp_dir, "test_run.py")
            temp_file2 = open(temp_file_path2, "w")
            temp_file2.write(f"""
import builtins
import importlib
import io
import sys

import pytest
from pytest import MonkeyPatch

@pytest.mark.parametrize(
    "test_input, expected_output",
    [
        {tests} 
    ],
)

def test_example_123(monkeypatch: MonkeyPatch, test_input: str, expected_output: str):
    def mocked_input(prompt="", return_vals= test_input):
        return return_vals.pop(-1)
    
    mocked_stdout = io.StringIO()

    with monkeypatch.context() as m:
        m.setattr(builtins, "input", mocked_input)
        m.setattr(sys, "stdout", mocked_stdout)

        sys.modules.pop("testCases", None)
        importlib.import_module(name="testCases", package="files")

    assert mocked_stdout.getvalue().strip() == expected_output  """)
            temp_file2.close()
            print("Temporary file path:", temp_file_path)
            command = f"pytest {temp_file_path2}"
            result= subprocess.run(command, capture_output=True, text=True, shell=True)
            print(result)

            output = result.stdout
            print(output)
            passed_tests = re.findall(r'(\d+) passed', output)
            failed_tests = re.findall(r'(\d+) failed', output)
            response_data = {'output' : output, 'passed' : passed_tests, 'failed': failed_tests} 
            return JsonResponse(response_data)
        


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, Usuario):
        token = super().get_token(Usuario)

        # Add custom claims
        token['email'] = Usuario.email
        token['rol'] = Usuario.rol
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer