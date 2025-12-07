# n8n-mcp

Servidor MCP (Model Context Protocol) para integración de n8n con Antigravity IDE. Este servidor proporciona herramientas inteligentes para crear, gestionar y desplegar workflows de automatización de n8n directamente desde tu IDE.

## 🚀 Características

- **Integración automática con Antigravity IDE**: Simplemente llama al servidor y funciona
- **Guía paso a paso**: Asistencia interactiva para crear automatizaciones
- **Sugerencias inteligentes**: Recomendaciones de nodos de n8n basadas en tus necesidades
- **Plantillas predefinidas**: Workflows listos para usar para casos comunes
- **Integración con GitHub**: Conecta tus workflows con repositorios automáticamente
- **Soporte multilingüe**: Interfaz en español

## 📋 Requisitos Previos

- Node.js 18 o superior
- Antigravity IDE o cualquier cliente MCP compatible
- (Opcional) Cuenta de n8n para desplegar workflows
- (Opcional) Cuenta de GitHub para versionamiento

## 🔧 Instalación

### Uso Directo (Recomendado)

No necesitas clonar el repositorio. Simplemente configura el servidor MCP en Antigravity IDE:

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

### Instalación Local

Si prefieres instalar localmente:

```bash
npm install -g n8n-mcp
```

O para desarrollo:

```bash
git clone https://github.com/ThomasTixerina/n8n-mcp.git
cd n8n-mcp
npm install
npm run build
```

## 🎯 Configuración en Antigravity IDE

1. Abre la configuración de Antigravity IDE
2. Ve a **Extensions → MCP Servers**
3. Añade la configuración del servidor:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["-y", "n8n-mcp"],
      "env": {
        "WORKSPACE_PATH": "${workspaceFolder}"
      }
    }
  }
}
```

4. Guarda y reinicia el IDE
5. ¡El servidor estará disponible automáticamente!

## 🛠️ Herramientas Disponibles

### 1. `create_n8n_workflow`
Crea un nuevo workflow de n8n con la estructura básica.

**Parámetros:**
- `workflow_name`: Nombre del workflow
- `workflow_description`: Descripción (opcional)
- `trigger_type`: Tipo de trigger (webhook, schedule, manual, email)

**Ejemplo:**
```
Crea un workflow llamado "Sincronización Diaria" con trigger schedule
```

### 2. `suggest_n8n_nodes`
Sugiere nodos de n8n basados en tu tarea.

**Parámetros:**
- `task_description`: Descripción de lo que quieres automatizar
- `integration_needed`: Servicios a integrar (opcional)

**Ejemplo:**
```
Necesito enviar un email cuando reciba datos de una API
```

### 3. `setup_github_integration`
Configura la integración con GitHub para tu proyecto.

**Parámetros:**
- `project_name`: Nombre del proyecto
- `repository_name`: Nombre del repositorio en GitHub
- `setup_webhooks`: Configurar webhooks (opcional)

**Ejemplo:**
```
Conecta mi proyecto "mi-automatizacion" con el repositorio "workflows-n8n"
```

### 4. `guide_automation_setup`
Guía paso a paso para crear una automatización completa.

**Parámetros:**
- `automation_goal`: Objetivo de la automatización
- `current_step`: Paso actual (1-5)
- `user_experience`: Nivel de experiencia (principiante, intermedio, avanzado)

**Ejemplo:**
```
Quiero crear un sistema de notificaciones, soy principiante
```

### 5. `connect_workspace`
Conecta el MCP con tu workspace de Antigravity.

**Parámetros:**
- `workspace_path`: Ruta del workspace
- `auto_configure`: Configuración automática (opcional)

### 6. `create_workflow_template`
Crea workflows desde plantillas predefinidas.

**Parámetros:**
- `template_type`: Tipo de plantilla
  - `data_sync`: Sincronización de datos
  - `notification_system`: Sistema de notificaciones
  - `data_processing`: Procesamiento de datos
  - `api_integration`: Integración de APIs
  - `scheduled_task`: Tareas programadas
  - `event_driven`: Workflows basados en eventos

**Ejemplo:**
```
Dame una plantilla para sincronizar datos entre dos APIs
```

## 📚 Casos de Uso

### Caso 1: Crear una Automatización desde Cero

1. **Inicia la guía**:
   ```
   Usa guide_automation_setup con automation_goal: "automatizar envío de reportes"
   ```

2. **Crea el workflow**:
   ```
   Usa create_n8n_workflow con workflow_name: "Reporte Diario" y trigger_type: "schedule"
   ```

3. **Obtén sugerencias de nodos**:
   ```
   Usa suggest_n8n_nodes con task_description: "generar reporte y enviarlo por email"
   ```

4. **Conecta con GitHub**:
   ```
   Usa setup_github_integration con project_name y repository_name
   ```

### Caso 2: Usar una Plantilla

1. **Selecciona plantilla**:
   ```
   Usa create_workflow_template con template_type: "notification_system"
   ```

2. **Personaliza según necesites**

3. **Conecta con tu workspace**:
   ```
   Usa connect_workspace con workspace_path: "/ruta/a/tu/proyecto"
   ```

## 🔄 Flujo de Trabajo Típico

```
1. Conectar workspace → connect_workspace
2. Definir objetivo → guide_automation_setup (paso 1)
3. Crear workflow → create_n8n_workflow o create_workflow_template
4. Añadir nodos → suggest_n8n_nodes
5. Configurar GitHub → setup_github_integration
6. Probar y desplegar
```

## 🧪 Desarrollo y Testing

Para desarrollar o modificar el servidor:

```bash
# Instalar dependencias
npm install

# Compilar
npm run build

# Modo watch para desarrollo
npm run watch

# Probar localmente
node dist/index.js
```

## 📚 Documentación

- **[QUICKSTART.md](./QUICKSTART.md)** - Guía de inicio rápido (comienza aquí!)
- **[EXAMPLES.md](./EXAMPLES.md)** - Ejemplos detallados de uso
- **[FAQ.md](./FAQ.md)** - Preguntas frecuentes y solución de problemas
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guía para contribuir al proyecto
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitectura técnica del servidor
- **[CHANGELOG.md](./CHANGELOG.md)** - Historial de cambios

## 🤝 Contribuir

Las contribuciones son bienvenidas! Lee [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles.

Pasos rápidos:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

MIT License - ver el archivo [LICENSE](./LICENSE) para detalles

## 🆘 Soporte

Si necesitas ayuda:

1. Revisa la [FAQ](./FAQ.md) para problemas comunes
2. Lee el [QUICKSTART](./QUICKSTART.md) para comenzar
3. Consulta los [EXAMPLES](./EXAMPLES.md) para casos de uso
4. Usa la herramienta `guide_automation_setup` para guía interactiva
2. Revisa la documentación de [n8n](https://docs.n8n.io/)
3. Abre un issue en este repositorio

## 🎯 Roadmap

- [ ] Soporte para importar/exportar workflows
- [ ] Integración con más servicios
- [ ] Templates adicionales
- [ ] Validación de workflows
- [ ] Deployment automático a n8n cloud
- [ ] Soporte para credentials management

---

Desarrollado para facilitar la creación de automatizaciones con n8n en Antigravity IDE 🚀
