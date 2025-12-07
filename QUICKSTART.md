# Guía de Inicio Rápido - n8n-mcp

Esta guía te llevará desde cero hasta tener tu primer workflow de n8n funcionando en menos de 5 minutos.

## ⚡ Instalación Rápida

### Opción 1: Uso Directo (Recomendado)

1. Abre Antigravity IDE
2. Ve a **Settings** (Ctrl+,)
3. Busca "MCP"
4. Copia esta configuración:

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

5. Guarda y reinicia el IDE
6. ¡Listo! El MCP ya está disponible

### Opción 2: Instalación Local

```bash
git clone https://github.com/ThomasTixerina/n8n-mcp.git
cd n8n-mcp
npm install
npm run build
```

Luego configura en Antigravity:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "node",
      "args": ["/ruta/completa/al/n8n-mcp/dist/index.js"]
    }
  }
}
```

## 🎯 Tu Primer Workflow

### 1. Conecta el Workspace

En Antigravity IDE, abre el chat y escribe:

```
Conecta mi workspace en /ruta/a/mi/proyecto
```

El MCP usará automáticamente `connect_workspace` y te dará las instrucciones.

### 2. Define tu Automatización

```
Quiero crear un sistema que envíe notificaciones cuando reciba datos de un webhook
```

El MCP te guiará paso a paso usando `guide_automation_setup`.

### 3. Crea el Workflow

El MCP te sugerirá crear el workflow:

```
Crea un workflow llamado "Sistema de Notificaciones" con trigger webhook
```

### 4. Añade Funcionalidad

```
Necesito procesar los datos y enviarlos a Slack
```

El MCP usará `suggest_n8n_nodes` y te dará los nodos perfectos.

### 5. Conecta con GitHub

```
Quiero versionar este workflow en GitHub
```

El MCP te dará todos los comandos git necesarios.

## 🔥 Casos de Uso Rápidos

### Sincronización de Datos

```
Dame una plantilla para sincronizar datos entre dos APIs
```

### Sistema de Notificaciones

```
Crea un workflow que envíe emails cuando algo ocurra
```

### Procesamiento Automático

```
Necesito procesar archivos CSV automáticamente cada día
```

### Integración de APIs

```
Quiero conectar Stripe con mi base de datos
```

## 💡 Tips Rápidos

1. **Sé específico**: Cuanto más detalles des, mejores sugerencias recibirás
2. **Usa plantillas**: Son más rápidas que empezar desde cero
3. **Pregunta**: El MCP está para ayudarte, no dudes en pedir clarificaciones
4. **Versiona**: Conecta con GitHub desde el inicio
5. **Prueba**: Valida cada paso antes de continuar

## 🆘 Ayuda Rápida

### No veo el MCP en Antigravity
- Verifica que Node.js esté instalado: `node --version`
- Reinicia el IDE completamente
- Revisa la consola de desarrollador (Help → Toggle Developer Tools)

### El MCP no responde
- Verifica la configuración en settings.json
- Asegúrate de que npx esté disponible: `npx --version`
- Intenta la instalación local

### Necesito ayuda con algo específico
Solo pregunta al MCP:
```
Necesito ayuda con [tu problema]
```

El MCP usará `guide_automation_setup` para guiarte.

## 📚 Siguiente Paso

Una vez que tengas tu primer workflow funcionando:

1. Lee los [EXAMPLES.md](./EXAMPLES.md) para casos más complejos
2. Revisa el [README.md](./README.md) para la documentación completa
3. Experimenta con diferentes plantillas
4. Comparte tus workflows con el equipo via GitHub

## 🎓 Recursos Adicionales

- [Documentación de n8n](https://docs.n8n.io/)
- [Nodos disponibles en n8n](https://docs.n8n.io/integrations/)
- [Comunidad n8n](https://community.n8n.io/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

¿Dudas? Pregunta directamente al MCP - está diseñado para ayudarte en cada paso! 🚀
