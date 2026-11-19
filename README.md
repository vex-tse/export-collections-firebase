# Firebase Collections

Firebase Collections es una demostración web creada con Astro y Firebase para validar el inicio de sesión con Google y el control de acceso por roles.

La aplicación autentica usuarios, consulta el registro de autorización en Firestore y muestra una interfaz de exportación con datos de ejemplo. No consulta colecciones reales ni genera archivos.

## Estado actual

| Estado | Funcionalidad |
| --- | --- |
| Implementado | Inicio de sesión con Google y persistencia de sesión |
| Implementado | Verificación de usuarios mediante la colección `allowusers` |
| Implementado | Roles `admin`, `editor` y `viewer` |
| Implementado | Interfaz demostrativa de `/export` |
| No disponible | Lectura real de colecciones de Firestore |
| No disponible | Generación o descarga de CSV, JSON o Excel |

La exportación y las selecciones mostradas en la interfaz son capacidades futuras. Actualmente, el botón de demostración no lee ni modifica datos.

## Tecnologías

- Astro 7
- Firebase JS SDK 13
- Firebase Authentication con Google
- Cloud Firestore
- TypeScript
- Firebase CLI

## Requisitos

- Node.js 22.23.4 o superior
- npm
- Proyecto de Firebase
- Proveedor Google habilitado en Firebase Authentication
- Base de datos de Firestore

## Inicio rápido

### 1. Obtener e instalar el proyecto

```bash
git clone https://github.com/vex-tse/export-collections-firebase.git
cd export-collections-firebase
npm install
```

### 2. Configurar Firebase

Crea un archivo `.env` en la raíz del proyecto:

```dotenv
PUBLIC_FIREBASE_API_KEY=<API_KEY>
PUBLIC_FIREBASE_AUTH_DOMAIN=<AUTH_DOMAIN>
PUBLIC_FIREBASE_PROJECT_ID=<PROJECT_ID>
PUBLIC_FIREBASE_APP_ID=<APP_ID>
```

Estas variables deben pertenecer a la aplicación web configurada en Firebase. Las variables públicas no sustituyen las reglas de seguridad ni las credenciales privadas.

### 3. Configurar Google Authentication

En Firebase Authentication:

1. Habilita el proveedor **Google**.
2. Autoriza los dominios utilizados por el entorno de desarrollo y los entornos de despliegue.

### 4. Crear un usuario autorizado

La aplicación consulta exactamente un documento en `allowusers` que cumpla estas condiciones:

- `uid` coincide con el UID del usuario autenticado.
- `active` es `true`.
- `role` contiene `admin`, `editor` o `viewer`.
- El correo de Google está verificado.

Ejemplo representativo:

```json
{
  "uid": "<UID_DE_FIREBASE_AUTH>",
  "active": true,
  "role": "admin"
}
```

No se incluyen valores reales de usuarios o credenciales.

### 5. Ejecutar el proyecto

```bash
npm run dev
```

Astro inicia normalmente el sitio en `http://localhost:4321`.

```bash
npm run build
npm run preview
```

`npm run build` genera la compilación de producción y `npm run preview` permite previsualizarla localmente.

## Uso

1. Abre la página principal.
2. Selecciona **Continuar con Google**.
3. Firebase Authentication verifica el usuario.
4. La aplicación consulta su documento en `allowusers`.
5. Si está autorizado, redirige a `/export`.
6. En la vista demostrativa se muestran el usuario, su rol y las opciones de ejemplo.
7. Selecciona **Cerrar sesión** para finalizar la sesión.

### Roles

| Rol | Comportamiento actual |
| --- | --- |
| `admin` | Accede e interactúa con la vista demostrativa |
| `editor` | Accede e interactúa con la vista demostrativa |
| `viewer` | Accede a la vista, pero la acción de exportación se deshabilita |

## Reglas de Firestore

El archivo [firestore.rules](./firestore.rules) permite que un usuario autenticado lea el documento de `allowusers` cuyo campo `uid` coincida con su propia identidad. La creación, modificación y eliminación desde el cliente están prohibidas.

Para publicar las reglas:

```bash
firebase deploy --only firestore:rules
```

El proyecto debe estar asociado previamente al proyecto de Firebase correspondiente.

## Arquitectura

- `src/pages/index.astro` presenta el inicio de sesión.
- `src/pages/export.astro` verifica la sesión y muestra la interfaz demostrativa.
- `src/lib/firebase.ts` crea o reutiliza la aplicación de Firebase y obtiene Firebase Authentication.
- `src/lib/firebase/auth.ts` inicia sesión y valida el usuario contra `allowusers`.
- `firestore.rules` controla el acceso a los documentos de autorización.

Flujo principal:

```mermaid
flowchart LR
    Usuario --> Google
    Google --> Auth[Firebase Authentication]
    Auth --> Allowusers
    Allowusers -->|Autorizado| Export[/export]
    Allowusers -->|No autorizado| Logout[Cerrar sesión]
```

## Seguridad

- Nunca publiques la configuración privada ni las credenciales de administrador.
- Valida los permisos tanto en el cliente como en una implementación servidor antes de habilitar exportaciones reales.
- Las reglas actuales no permiten escrituras de `allowusers` desde el cliente.
- El rol mostrado en la interfaz no sustituye las reglas de seguridad.

## Pruebas y calidad

El archivo [tests/authorization-policy.test.ts](./tests/authorization-policy.test.ts) existe, pero está vacío.

El proyecto no configura actualmente un framework de pruebas ni scripts npm para:

- pruebas;
- linting;
- comprobación de tipos independiente.

La compilación disponible es:

```bash
npm run build
```

## Solución de problemas

### Falta una variable de Firebase

Confirma que `.env` contiene `PUBLIC_FIREBASE_API_KEY`, `PUBLIC_FIREBASE_AUTH_DOMAIN`, `PUBLIC_FIREBASE_PROJECT_ID` y `PUBLIC_FIREBASE_APP_ID`.

### El usuario no puede iniciar sesión

Comprueba que el proveedor Google esté habilitado y que el dominio local o desplegado esté autorizado en Firebase Authentication.

### El usuario aparece como no autorizado

Comprueba que exista exactamente un documento en `allowusers` con el UID correcto, `active: true` y un rol permitido.

### Firebase CLI no publica las reglas

Comprueba que el proyecto CLI seleccionado sea el correcto y que [firebase.json](./firebase.json) referencie [firestore.rules](./firestore.rules).

## Historial y licencia

Los cambios recientes se documentan en [CHANGELOG.md](./CHANGELOG.md).

No se ha definido una licencia. Hasta que exista una licencia publicada, la distribución o reutilización del proyecto no debe asumirse como permitida.
