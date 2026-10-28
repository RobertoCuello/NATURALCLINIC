# Natural by Roberto Cuello

La versión original de AI Studio se conserva en el ZIP de esta carpeta. La copia de trabajo de la landing está en `sitio/`. Las instrucciones del asistente están en `AGENTS.md` y la memoria en `wiki/index.md`.

Desde PowerShell en esta carpeta:

```powershell
./scripts/proyecto.ps1 ver
./scripts/proyecto.ps1 comprobar
```

La vista local usa http://127.0.0.1:3000; no es una publicación. Para detenerla, Ctrl+C en la consola que la ejecuta. Para recuperar dependencias, usar `./scripts/proyecto.ps1 instalar` con el archivo de bloqueo existente.

Puedes seguir agregando documentos, fotografías y logos en `Docs/`, sin ordenarlos previamente. El asistente los revisará y actualizará el catálogo. Los originales, la wiki interna y los archivos de revisión quedan fuera del repositorio compartible por defecto. La wiki contiene rutas y conocimiento organizado; no incluye copias de conversaciones ni información clínica de pacientes.

Esta landing no utiliza Gemini en su código actual. No hace falta crear una clave para verla; las variables de ejemplo pertenecen a la plantilla de AI Studio. No guardar claves en el navegador.
