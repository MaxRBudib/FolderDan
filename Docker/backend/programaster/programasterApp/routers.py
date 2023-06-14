from rest_framework import routers
from .views import UsuarioViewSet, UFViewSet, GrupoViewSet, UsuarioGrupoViewSet


router = routers.DefaultRouter()
router.register('usuarios', UsuarioViewSet)
router.register('uf', UFViewSet)
router.register('grupos', GrupoViewSet)
router.register('usuariogrupo', UsuarioGrupoViewSet)