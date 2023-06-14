from django.urls import path, include
from django.contrib import admin 
from rest_framework import routers
from django.urls import path
from .views import EjercicioTareaViewSet, UsuarioViewSet,UsuarioGrupoViewSet, UsuarioTareaEjercicioViewSet, UFViewSet, ModuloViewSet, AnuncioViewSet, GrupoViewSet, TareaViewSet, EjercicioViewSet, OpcionesViewSet, TestCasesViewSet, CodeView, AuthView, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register('usuarios', UsuarioViewSet)
router.register('usuarioEjercicioTarea',UsuarioTareaEjercicioViewSet )
router.register('uf',UFViewSet )
router.register('modulo',ModuloViewSet )
router.register('anuncio', AnuncioViewSet)
router.register('grupo', GrupoViewSet)
router.register('tarea', TareaViewSet )
router.register('ejercicios', EjercicioViewSet )
router.register('opciones', OpcionesViewSet)
router.register('testCases', TestCasesViewSet)
router.register('ejercicioTarea', EjercicioTareaViewSet)
router.register('usuarioGrupo', UsuarioGrupoViewSet)

urlpatterns = [
    
    path('code/', CodeView.as_view() ),
    path('auth/', AuthView.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]





urlpatterns += router.urls