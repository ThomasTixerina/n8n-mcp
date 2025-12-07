# FAQ y Solución de Problemas

## ❓ Preguntas Frecuentes

### Generales

**Q: ¿Qué es n8n-mcp?**
A: Es un servidor MCP (Model Context Protocol) que integra n8n con Antigravity IDE, permitiendo crear workflows de automatización con asistencia de IA.

**Q: ¿Necesito instalar n8n para usar este MCP?**
A: No necesariamente para crear workflows. El MCP te ayuda a diseñarlos. Para ejecutarlos, sí necesitarás una instancia de n8n (local o cloud).

**Q: ¿Es gratuito?**
A: Sí, n8n-mcp es open source con licencia MIT. n8n también tiene versión gratuita.

**Q: ¿Funciona solo con Antigravity IDE?**
A: Está optimizado para Antigravity IDE, pero debería funcionar con cualquier cliente MCP compatible.

**Q: ¿En qué idioma están las respuestas?**
A: Principalmente en español, pero el código y la estructura son universales.

### Instalación

**Q: ¿Qué requisitos tiene?**
A: Node.js 18 o superior. Nada más.

**Q: ¿Cómo lo instalo?**
A: La forma más simple es usar `npx -y n8n-mcp` directamente en la configuración de Antigravity IDE. No necesitas instalación previa.

**Q: ¿Puedo instalarlo globalmente?**
A: Sí, con `npm install -g n8n-mcp` (cuando esté publicado en npm).

**Q: ¿Dónde va la configuración?**
A: En las settings de Antigravity IDE, sección MCP Servers.

### Uso

**Q: ¿Cómo empiezo?**
A: Simplemente pregunta en el chat de Antigravity: "Quiero crear una automatización". El MCP te guiará.

**Q: ¿Qué herramientas hay disponibles?**
A: Seis herramientas principales:
1. `create_n8n_workflow` - Crear workflows
2. `suggest_n8n_nodes` - Sugerir nodos
3. `setup_github_integration` - Integrar con GitHub
4. `guide_automation_setup` - Guía paso a paso
5. `connect_workspace` - Conectar workspace
6. `create_workflow_template` - Plantillas predefinidas

**Q: ¿Puedo crear workflows personalizados?**
A: ¡Absolutamente! Usa las herramientas como base y personaliza según necesites.

**Q: ¿Cómo ejecuto los workflows que creo?**
A: El MCP genera la estructura. Debes copiarla a tu instancia de n8n para ejecutarla.

### Integración

**Q: ¿Cómo conecto con GitHub?**
A: Usa la herramienta `setup_github_integration`. Te dará comandos git listos para usar.

**Q: ¿El MCP hace commits automáticamente?**
A: No, te proporciona los comandos. Tú decides cuándo ejecutarlos.

**Q: ¿Puedo usar otros servicios de git?**
A: La herramienta está optimizada para GitHub, pero los conceptos aplican a GitLab, Bitbucket, etc.

## 🔧 Solución de Problemas

### El MCP no aparece en Antigravity IDE

**Problema**: No veo n8n-mcp en la lista de herramientas disponibles.

**Soluciones**:

1. **Verificar configuración**:
   ```json
   {
     "mcpServers": {
       "n8n-mcp": {
         "command": "npx",
         "args": ["-y", "n8n-mcp"]
       }
     }
   }
   ```

2. **Verificar Node.js**:
   ```bash
   node --version  # Debe ser ≥ 18
   npx --version   # Debe estar disponible
   ```

3. **Reiniciar completamente el IDE**:
   - Cerrar todas las ventanas
   - Cerrar el proceso completamente
   - Volver a abrir

4. **Ver logs del IDE**:
   - Help → Toggle Developer Tools
   - Buscar errores relacionados con MCP

5. **Probar instalación local**:
   ```bash
   git clone https://github.com/ThomasTixerina/n8n-mcp.git
   cd n8n-mcp
   npm install
   npm run build
   ```
   
   Luego configurar con ruta absoluta:
   ```json
   {
     "mcpServers": {
       "n8n-mcp": {
         "command": "node",
         "args": ["/ruta/absoluta/n8n-mcp/dist/index.js"]
       }
     }
   }
   ```

### El MCP no responde

**Problema**: Las herramientas no se ejecutan o no hay respuesta.

**Soluciones**:

1. **Verificar que el servidor esté corriendo**:
   - Busca el mensaje "n8n MCP Server running on stdio" en los logs

2. **Probar el servidor manualmente**:
   ```bash
   cd n8n-mcp
   node dist/index.js
   ```
   Debe mostrar el mensaje de inicio.

3. **Verificar permisos**:
   ```bash
   chmod +x dist/index.js
   ```

4. **Limpiar y recompilar**:
   ```bash
   rm -rf dist/ node_modules/
   npm install
   npm run build
   ```

### Errores al usar npx

**Problema**: `npx -y n8n-mcp` falla.

**Soluciones**:

1. **Si el paquete no está en npm aún**:
   - Usa instalación local (ver arriba)
   - O espera a que se publique en npm

2. **Limpiar cache de npx**:
   ```bash
   npx clear-npx-cache
   ```

3. **Verificar conectividad**:
   ```bash
   npm ping
   ```

### Los nodos sugeridos no son relevantes

**Problema**: `suggest_n8n_nodes` da sugerencias incorrectas.

**Soluciones**:

1. **Sé más específico en la descripción**:
   ```
   ❌ "necesito manejar datos"
   ✅ "necesito leer un archivo CSV y guardarlo en PostgreSQL"
   ```

2. **Menciona integraciones específicas**:
   ```
   "Usa suggest_n8n_nodes con:
   - task_description: 'sincronizar datos'
   - integration_needed: 'Google Sheets, MySQL'"
   ```

3. **Usa plantillas como punto de partida**:
   ```
   "Dame una plantilla para data_sync"
   ```

### El workflow no funciona en n8n

**Problema**: Copiaste el workflow a n8n pero no funciona.

**Soluciones**:

1. **El MCP genera estructura, no configuración completa**:
   - Necesitas configurar credenciales
   - Necesitas ajustar parámetros específicos
   - Necesitas conectar los nodos manualmente

2. **Revisa en n8n**:
   - ¿Están todos los nodos conectados?
   - ¿Tienes las credenciales configuradas?
   - ¿Los parámetros son correctos?

3. **Usa el modo de prueba de n8n**:
   - Ejecuta el workflow manualmente
   - Revisa los logs de cada nodo
   - Ajusta según sea necesario

### Problemas con GitHub

**Problema**: Los comandos git no funcionan.

**Soluciones**:

1. **Verificar que git esté instalado**:
   ```bash
   git --version
   ```

2. **Inicializar el repositorio primero**:
   ```bash
   git init
   ```

3. **Configurar git si es primera vez**:
   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu@email.com"
   ```

4. **Crear el repositorio en GitHub primero**:
   - Ve a github.com/new
   - Crea el repositorio
   - Luego ejecuta los comandos que te dio el MCP

5. **Verificar autenticación**:
   ```bash
   gh auth login  # Si usas GitHub CLI
   ```
   O configura SSH keys.

### El workspace no se conecta

**Problema**: `connect_workspace` no funciona como esperaba.

**Soluciones**:

1. **Usar rutas absolutas**:
   ```
   ❌ workspace_path: "~/proyecto"
   ✅ workspace_path: "/home/usuario/proyecto"
   ```

2. **Verificar que el directorio existe**:
   ```bash
   ls -la /ruta/al/workspace
   ```

3. **La herramienta solo da instrucciones**:
   - No modifica archivos automáticamente
   - Debes copiar la configuración manualmente

## 🚨 Problemas Conocidos

### Limitaciones Actuales

1. **No ejecuta comandos**: El MCP solo proporciona instrucciones, no ejecuta acciones automáticamente.

2. **Sin acceso a n8n API**: No puede comunicarse directamente con tu instancia de n8n (por ahora).

3. **Sugerencias básicas**: El matching de nodos usa keywords simples, no IA avanzada.

4. **Sin validación**: No valida que el workflow sea sintácticamente correcto para n8n.

### Workarounds

1. **Para ejecución automática**: Copia los comandos al terminal.

2. **Para mejor integración con n8n**: Usa n8n CLI para importar workflows.

3. **Para mejores sugerencias**: Sé muy específico en tus descripciones.

4. **Para validación**: Usa el editor de n8n para verificar el workflow.

## 📊 Depuración Avanzada

### Habilitar Logs Detallados

Modifica `src/index.ts` temporalmente:

```typescript
// Al inicio de cada case en el switch
console.error(`[DEBUG] Tool called: ${name}`);
console.error(`[DEBUG] Args:`, JSON.stringify(args, null, 2));
```

### Ver Comunicación MCP

En Antigravity IDE:
1. Help → Toggle Developer Tools
2. Console tab
3. Filtrar por "MCP"

### Probar Herramientas Individualmente

Crea un script de prueba:

```javascript
// test.js
const request = {
  params: {
    name: 'create_n8n_workflow',
    arguments: {
      workflow_name: 'Test',
      trigger_type: 'webhook'
    }
  }
};

// Luego prueba con node
```

## 💡 Tips Adicionales

### Para Mejor Experiencia

1. **Sé específico**: "Quiero un workflow que lea emails de Gmail y los guarde en Notion"

2. **Usa las guías**: `guide_automation_setup` te llevará paso a paso.

3. **Empieza con plantillas**: Son más rápidas que desde cero.

4. **Itera**: Crea básico → prueba → mejora → prueba.

5. **Documenta**: Usa `setup_github_integration` desde el inicio.

### Mejores Prácticas

1. **Un workflow por tarea**: No hagas workflows gigantes.

2. **Nombra descriptivamente**: "Sincronizar Contactos" mejor que "Workflow 1".

3. **Versiona todo**: Usa GitHub para cada cambio.

4. **Prueba incremental**: Añade un nodo a la vez.

5. **Lee la documentación de n8n**: El MCP es un ayudante, no reemplaza aprender n8n.

## 🆘 Obtener Ayuda

Si ninguna solución funciona:

1. **Revisa los logs** completos del IDE
2. **Crea un issue** en GitHub con:
   - Descripción del problema
   - Pasos para reproducir
   - Logs de error
   - Tu configuración (sin credenciales)
   - Versión de Node.js
   - Sistema operativo

3. **Consulta la documentación**:
   - [README.md](./README.md)
   - [QUICKSTART.md](./QUICKSTART.md)
   - [EXAMPLES.md](./EXAMPLES.md)
   - [ARCHITECTURE.md](./ARCHITECTURE.md)

---

¿Solucionaste tu problema? ¡Considera contribuir añadiendo tu solución a este documento! 🙏
