## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)






# REGLAS GLOBALES DE DESARROLLO PARA AGENTES DE IA

Estas instrucciones establecen los estándares de trabajo que deben respetarse en todos los proyectos. El objetivo es desarrollar software seguro, escalable, mantenible, eficiente y de calidad profesional.

Si existen instrucciones específicas del proyecto, respetar su arquitectura y convenciones. Si hay contradicciones, consultar antes de actuar.

## 1. SEGURIDAD Y CONTROL DE GIT

- Nunca ejecutar git commit, git push, git pull, git reset, git clean, git rebase, git merge ni comandos equivalentes.
- Nunca publicar, sincronizar ni enviar cambios a repositorios remotos.
- git add es la única operación de modificación de Git autorizada, y solamente cuando el usuario lo solicite explícitamente.
- No ejecutar git add automáticamente.
- Se permiten comandos de consulta como git status, git diff y git log.
- Nunca modificar la configuración de Git, hooks o mecanismos de protección para eludir estas reglas.
- No ejecutar operaciones destructivas ni alterar el historial del repositorio.

## 2. METODOLOGÍA DE DESARROLLO

- Analizar la estructura del proyecto antes de modificar código.
- Revisar package.json, configuraciones, documentación y dependencias existentes.
- Identificar las tecnologías y versiones utilizadas.
- Comprender cómo funciona la implementación actual antes de proponer cambios.
- No asumir que una funcionalidad debe implementarse sin revisar lo existente.
- Planificar los cambios cuando involucren varios archivos o componentes.
- Implementar soluciones concretas, limpias y enfocadas.
- No modificar funcionalidades existentes sin justificación.
- No sobrescribir cambios realizados por el usuario.

## 3. CALIDAD Y ORGANIZACIÓN DEL CÓDIGO

- Aplicar principios de código limpio (Clean Code).
- Mantener el código modular, legible, reutilizable y mantenible.
- Evitar duplicación de código.
- Aplicar separación de responsabilidades.
- Utilizar nombres descriptivos para variables, funciones, clases y archivos.
- Evitar funciones excesivamente grandes.
- Reutilizar componentes, servicios y utilidades existentes.
- No crear abstracciones o estructuras innecesarias.
- Mantener consistencia con las convenciones del proyecto.
- Evitar soluciones improvisadas o temporales.

## 4. MANEJO DE ERRORES Y EXCEPCIONES

- Gestionar adecuadamente los errores de las operaciones.
- Utilizar try/catch cuando corresponda, especialmente en operaciones asíncronas, llamadas a servicios externos y acceso a datos.
- No utilizar try/catch indiscriminadamente.
- Nunca dejar bloques catch vacíos.
- No ocultar errores ni continuar como si una operación hubiera sido exitosa.
- Proporcionar mensajes de error claros, descriptivos y útiles para identificar el origen del problema.
- Los mensajes deben indicar qué operación falló y aportar contexto suficiente para diagnosticarla.
- Conservar el error original cuando sea posible.
- Diferenciar errores esperados de errores inesperados.
- Manejar correctamente las promesas rechazadas.
- Utilizar el sistema de logging existente.
- Nunca mostrar credenciales, contraseñas, tokens o información sensible en los mensajes de error.

## 5. JAVASCRIPT Y TYPESCRIPT

- Preferir TypeScript cuando el proyecto lo utilice.
- Respetar estrictamente la configuración de TypeScript.
- Mantener activado y respetar el modo strict.
- Evitar el uso de any.
- Utilizar interfaces, tipos y estructuras adecuadas.
- Utilizar unknown cuando se desconozca el tipo de un dato y validarlo antes de utilizarlo.
- Evitar conversiones de tipos inseguras.
- Validar los datos externos antes de procesarlos.
- Utilizar async/await de forma consistente.
- No desactivar comprobaciones del compilador para ocultar errores.

## 6. ASTRO Y DESARROLLO WEB

- Cuando el proyecto utilice Astro, respetar su arquitectura y convenciones.
- Mantener una correcta organización de componentes, layouts y páginas.
- Utilizar las islas de hidratación solamente cuando sean necesarias.
- Evitar ejecutar innecesariamente código del lado del cliente.
- Separar correctamente la lógica del servidor y del navegador.
- Evitar exponer información privada en el frontend.
- Mantener una estructura semántica y accesible.
- No cambiar la arquitectura de Astro sin justificación.

## 7. NODE.JS Y DEPENDENCIAS

- En los proyectos que establezcan este requisito, utilizar Node.js 22.23.4 o superior.
- Revisar las versiones y configuraciones antes de realizar cambios.
- Respetar el gestor de paquetes existente: npm, pnpm o yarn.
- No mezclar gestores de paquetes.
- No instalar, eliminar o actualizar dependencias sin autorización explícita.
- No ejecutar scripts desconocidos sin revisar su contenido.
- Evitar dependencias innecesarias.
- No modificar archivos de bloqueo de dependencias sin necesidad.

## 8. FIREBASE Y GESTIÓN DE DATOS

- Respetar la estructura existente de Firebase.
- Comprender el servicio utilizado antes de implementar cambios.
- No modificar colecciones, documentos, campos o estructuras sin autorización.
- Validar los datos antes de almacenarlos.
- Gestionar errores de lectura, escritura, autenticación y conexión.
- No exponer credenciales ni claves privadas.
- Utilizar variables de entorno para la configuración sensible.
- Recordar que las variables públicas del frontend no son secretos.
- No realizar eliminaciones masivas ni modificaciones de datos reales sin autorización.
- Nunca debilitar las reglas de seguridad para solucionar errores.

## 9. DISEÑO RESPONSIVO Y EXPERIENCIA MULTIDISPOSITIVO

- Toda interfaz nueva o modificada debe adaptarse correctamente a móviles, tablets y computadoras.
- Aplicar la metodología Mobile First cuando corresponda.
- Utilizar CSS Grid, Flexbox, unidades relativas y Media Queries.
- Evitar dimensiones rígidas que generen desbordamientos.
- Adaptar correctamente menús, formularios, tablas, tarjetas, botones y diálogos.
- Mantener una correcta jerarquía visual en todos los tamaños.
- Garantizar que los textos sean legibles.
- Mantener áreas táctiles cómodas para dispositivos móviles.
- Adaptar imágenes y elementos multimedia.
- Evitar el desplazamiento horizontal innecesario.
- No ocultar funcionalidades importantes para simular responsividad.
- Respetar las buenas prácticas de accesibilidad.
- Verificar el funcionamiento en tamaños móviles, tablet y escritorio.
- Mantener consistencia visual entre dispositivos.

## 10. ESCALABILIDAD Y MANTENIBILIDAD

- Diseñar soluciones que permitan incorporar nuevas funcionalidades sin tener que reconstruir todo el sistema.
- Mantener una arquitectura modular.
- Separar responsabilidades entre interfaz, lógica de negocio y acceso a datos.
- Evitar dependencias innecesarias entre módulos.
- Centralizar la lógica compartida.
- Evitar duplicación de funciones y procesos.
- Crear componentes reutilizables cuando realmente aporten valor.
- Considerar el crecimiento de usuarios y volumen de información.
- Optimizar consultas y evitar procesamientos innecesarios.
- Considerar paginación, filtros y carga eficiente de información.
- Evitar cargar recursos que no sean necesarios.
- Mantener una estructura organizada de carpetas y archivos.
- No introducir complejidad prematura.
- Priorizar soluciones que sean fáciles de mantener y ampliar.

## 11. RENDIMIENTO Y OPTIMIZACIÓN

- Evitar operaciones innecesarias.
- Optimizar consultas y solicitudes a servicios externos.
- Evitar renderizados innecesarios en la interfaz.
- Optimizar imágenes y recursos multimedia.
- Utilizar carga diferida cuando sea conveniente.
- Evitar dependencias pesadas sin justificación.
- Evitar duplicación de solicitudes.
- Considerar tiempos de carga y experiencia del usuario.
- No sacrificar mantenibilidad por optimizaciones prematuras.
- Verificar que las optimizaciones no alteren el funcionamiento.

## 12. SEGURIDAD INFORMÁTICA

- No exponer credenciales, contraseñas, tokens o claves privadas.
- Validar y sanitizar entradas de usuarios cuando corresponda.
- Evitar vulnerabilidades de inyección.
- Aplicar el principio de mínimo privilegio.
- No confiar ciegamente en información enviada desde el frontend.
- Validar permisos y autorizaciones en el servidor.
- Proteger las operaciones sensibles.
- No almacenar información sensible de manera insegura.
- Respetar las reglas de seguridad de Firebase.
- No desactivar mecanismos de seguridad para solucionar problemas.

## 13. PRUEBAS Y VERIFICACIÓN

- Revisar las pruebas existentes antes de modificar funcionalidades.
- Ejecutar las validaciones disponibles después de implementar cambios.
- Verificar errores de compilación.
- Ejecutar lint, typecheck, build y pruebas cuando estén disponibles y sea seguro.
- Comprobar que los cambios no afecten funcionalidades existentes.
- No afirmar que algo funciona si no se ha verificado.
- Informar las pruebas que no pudieron ejecutarse.
- No modificar pruebas para ocultar errores reales.
- Corregir los errores introducidos por los cambios realizados.

## 14. DOCUMENTACIÓN Y ORGANIZACIÓN

- Mantener una estructura de archivos clara.
- Documentar funciones y procesos complejos cuando sea necesario.
- Utilizar comentarios que expliquen decisiones importantes, no código obvio.
- Mantener actualizada la documentación cuando cambie el funcionamiento.
- Documentar configuraciones y variables de entorno necesarias.
- No almacenar credenciales en documentación.
- Evitar archivos innecesarios o duplicados.
- Mantener consistencia en nombres y organización.

## 15. BUENAS PRÁCTICAS DE TRABAJO

- Comprender el requerimiento antes de comenzar.
- Dividir tareas grandes en pasos pequeños y verificables.
- Consultar documentación oficial cuando exista alguna duda técnica.
- No inventar comportamientos o reglas de negocio.
- Mantener los cambios dentro del alcance solicitado.
- Revisar los cambios realizados antes de finalizar.
- No dejar código muerto o implementaciones incompletas sin informar.
- No desactivar advertencias para conseguir una compilación exitosa.
- Identificar posibles mejoras fuera del alcance y proponerlas por separado.
- Comunicar claramente cualquier problema encontrado.
- Priorizar soluciones simples, seguras y mantenibles.

## 16. ENTREGA Y COMUNICACIÓN FINAL

Al terminar cada tarea, informar:

- Qué se implementó.
- Qué archivos fueron creados o modificados.
- Qué funcionalidades fueron afectadas.
- Qué validaciones y pruebas se ejecutaron.
- Qué resultados se obtuvieron.
- Qué errores o limitaciones siguen pendientes.
- Qué recomendaciones adicionales existen.

Nunca declarar una tarea terminada si existen errores conocidos que no hayan sido comunicados.

## 17. PRIORIDAD DE LAS INSTRUCCIONES

- Estas reglas representan los estándares generales de trabajo.
- Respetar también las instrucciones particulares de cada proyecto.
- No modificar decisiones arquitectónicas existentes sin justificación.
- Si existe un conflicto entre instrucciones, solicitar aclaración.
- No realizar acciones destructivas sin autorización.
- La seguridad y la integridad de los datos tienen prioridad.
- Las reglas escritas no sustituyen las restricciones técnicas de permisos y ejecución.

## 18. EXPLICACIÓN Y REPORTE DE CADA CAMBIO

Después de cada implementación o modificación de código, el agente debe proporcionar una explicación clara y detallada de los cambios realizados para que el usuario pueda comprenderlos y verificarlos.

El reporte debe incluir obligatoriamente:

1. **Objetivo del cambio:** explicar qué se solicitó y qué problema se buscó resolver.

2. **Archivos modificados:** indicar la ruta y el nombre exacto de cada archivo creado, modificado o eliminado.

3. **Descripción de los cambios:** explicar qué se hizo en cada archivo, qué funciones, componentes, servicios o configuraciones se modificaron y cuál es su propósito.

4. **Funcionamiento:** explicar cómo funciona la implementación realizada y cómo se relaciona con el resto del sistema.

5. **Justificación técnica:** explicar brevemente por qué se eligió esa solución y qué buenas prácticas se aplicaron.

6. **Verificación:** indicar qué pruebas, validaciones, compilaciones o revisiones se ejecutaron y cuáles fueron sus resultados.

7. **Pendientes o advertencias:** informar errores encontrados, funcionalidades no verificadas, limitaciones o aspectos que requieran atención.

8. **Verificación manual:** cuando corresponda, proporcionar instrucciones paso a paso para que el usuario pueda comprobar visual o funcionalmente los cambios.

### Reglas adicionales

- No limitarse a indicar que una tarea fue completada.
- No utilizar explicaciones genéricas como "se mejoró el código" sin especificar qué se modificó.
- Utilizar un lenguaje claro y comprensible, explicando términos técnicos cuando sea necesario.
- Identificar las rutas exactas de los archivos para facilitar su localización.
- Diferenciar claramente los archivos creados, modificados y eliminados.
- No afirmar que se realizaron pruebas que realmente no se ejecutaron.
- Si no hubo cambios en algún archivo que se esperaba modificar, explicar el motivo.
- Mantener este reporte al finalizar cada tarea, incluso cuando el cambio sea pequeño.

**Objetivo principal:** permitir que el usuario comprenda qué hizo el agente, dónde lo hizo, por qué lo hizo y cómo puede comprobar que funciona correctamente.