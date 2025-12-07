# Arquitectura y Diseño de n8n-mcp

Este documento describe la arquitectura técnica del servidor MCP.

## 📐 Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                  Antigravity IDE                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │         MCP Client (Built-in)                    │  │
│  └──────────────────┬───────────────────────────────┘  │
└─────────────────────┼───────────────────────────────────┘
                      │ stdio
                      │ (JSON-RPC)
┌─────────────────────▼───────────────────────────────────┐
│              n8n-mcp Server                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │  MCP Protocol Handler                            │  │
│  │  - ListTools                                     │  │
│  │  - CallTool                                      │  │
│  └──────────────────┬───────────────────────────────┘  │
│                     │                                   │
│  ┌──────────────────▼───────────────────────────────┐  │
│  │  Tool Implementations                            │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │ create_n8n_workflow                        │ │  │
│  │  │ suggest_n8n_nodes                          │ │  │
│  │  │ setup_github_integration                   │ │  │
│  │  │ guide_automation_setup                     │ │  │
│  │  │ connect_workspace                          │ │  │
│  │  │ create_workflow_template                   │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  └──────────────────┬───────────────────────────────┘  │
│                     │                                   │
│  ┌──────────────────▼───────────────────────────────┐  │
│  │  Data Structures                                 │  │
│  │  - TOOLS (Tool definitions)                     │  │
│  │  - NODE_SUGGESTIONS (Node database)             │  │
│  │  - WORKFLOW_TEMPLATES (Templates)               │  │
│  │  - AUTOMATION_GUIDES (Step-by-step guides)      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                      │
                      │ (User follows generated instructions)
                      │
┌─────────────────────▼───────────────────────────────────┐
│              External Systems                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   n8n        │  │   GitHub     │  │  Workspace   │  │
│  │   Instance   │  │              │  │   Files      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 🔧 Componentes Principales

### 1. MCP Server Core

**Archivo**: `src/index.ts`

El servidor implementa el protocolo MCP usando el SDK oficial:

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
```

**Responsabilidades**:
- Iniciar el servidor MCP
- Manejar la comunicación stdio con el cliente
- Registrar handlers para requests
- Gestionar el ciclo de vida del servidor

### 2. Tool Registry

**Constante**: `TOOLS`

Define todas las herramientas disponibles con:
- Nombre único
- Descripción user-facing
- JSON Schema para validación de inputs
- Campos requeridos

**Ejemplo**:
```typescript
{
  name: 'create_n8n_workflow',
  description: 'Ayuda a crear un workflow...',
  inputSchema: {
    type: 'object',
    properties: { ... },
    required: ['workflow_name', 'trigger_type']
  }
}
```

### 3. Tool Implementations

Cada herramienta se implementa en el switch de `CallToolRequestSchema`:

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (name) {
    case 'create_n8n_workflow': {
      // Implementación
    }
  }
});
```

**Patrón de respuesta**:
```typescript
return {
  content: [
    {
      type: 'text',
      text: 'Contenido de la respuesta con formato markdown'
    }
  ]
};
```

### 4. Data Structures

#### NODE_SUGGESTIONS
Mapea categorías a listas de nodos de n8n:
```typescript
{
  email: ['Email', 'Gmail', 'SendGrid'],
  database: ['MySQL', 'PostgreSQL'],
  // ...
}
```

#### WORKFLOW_TEMPLATES
Plantillas predefinidas con estructura completa:
```typescript
{
  data_sync: {
    name: 'Nombre',
    description: 'Descripción',
    nodes: [/* nodos configurados */]
  }
}
```

#### AUTOMATION_GUIDES
Guía paso a paso estructurada:
```typescript
{
  step1: {
    title: 'Título del paso',
    questions: ['Pregunta 1', 'Pregunta 2'],
    next_action: 'Qué hacer después'
  }
}
```

## 🔄 Flujo de Datos

### 1. Inicialización

```
1. Usuario configura MCP en Antigravity IDE
2. IDE ejecuta: npx -y n8n-mcp
3. Servidor inicia en modo stdio
4. Servidor registra handlers
5. Servidor espera requests
```

### 2. List Tools Request

```
IDE → Server: ListToolsRequest
Server: Busca en TOOLS array
Server → IDE: Lista de todas las herramientas disponibles
IDE: Muestra herramientas al usuario
```

### 3. Call Tool Request

```
Usuario → IDE: "Crea un workflow llamado X"
IDE: Identifica herramienta apropiada
IDE → Server: CallToolRequest
  {
    name: "create_n8n_workflow",
    arguments: { workflow_name: "X", ... }
  }
Server: Ejecuta handler correspondiente
Server: Genera respuesta con instrucciones
Server → IDE: Response con contenido markdown
IDE → Usuario: Muestra respuesta formateada
```

## 🎨 Patrones de Diseño

### 1. Strategy Pattern (Tool Selection)

Cada herramienta es una estrategia diferente para resolver un problema:
- Crear workflow
- Sugerir nodos
- Configurar GitHub
- etc.

### 2. Template Method (Workflow Templates)

Las plantillas definen la estructura, el usuario customiza los detalles.

### 3. Chain of Responsibility (Automation Guide)

Los pasos de automatización forman una cadena donde cada paso guía al siguiente.

### 4. Registry Pattern (Tool Registry)

Todas las herramientas se registran en un array central para fácil gestión.

## 🔒 Seguridad

### Principios

1. **No credenciales**: El servidor nunca maneja credenciales directamente
2. **User-driven**: Todas las acciones las ejecuta el usuario manualmente
3. **Read-only**: El servidor solo proporciona instrucciones, no ejecuta comandos
4. **Validación**: Todos los inputs se validan contra schemas

### Consideraciones

- El servidor corre en el contexto del usuario (local)
- No hace llamadas a APIs externas
- No almacena datos
- No accede al filesystem directamente

## 📊 Flujo de Trabajo del Usuario

```
┌─────────────────────────────────────────────────────┐
│ 1. Usuario pide ayuda en IDE                       │
│    "Quiero crear un sistema de notificaciones"     │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│ 2. MCP sugiere usar guide_automation_setup         │
│    Proporciona preguntas para definir el objetivo  │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│ 3. MCP sugiere crear workflow con                  │
│    create_n8n_workflow                             │
│    Proporciona estructura JSON del workflow        │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│ 4. Usuario pide qué nodos usar                     │
│    MCP ejecuta suggest_n8n_nodes                   │
│    Devuelve lista de nodos apropiados              │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│ 5. MCP sugiere setup_github_integration            │
│    Proporciona comandos git completos              │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│ 6. Usuario ejecuta comandos en terminal            │
│    Usuario configura workflow en n8n               │
│    ✅ Automatización completa                      │
└─────────────────────────────────────────────────────┘
```

## 🚀 Extensibilidad

### Añadir Nueva Herramienta

1. **Definir en TOOLS**:
```typescript
{
  name: 'nueva_herramienta',
  description: '...',
  inputSchema: { ... }
}
```

2. **Implementar handler**:
```typescript
case 'nueva_herramienta': {
  const { param } = args;
  // Lógica
  return { content: [...] };
}
```

3. **Documentar**:
- Añadir a README.md
- Añadir ejemplo a EXAMPLES.md

### Añadir Nueva Plantilla

```typescript
WORKFLOW_TEMPLATES.nueva_plantilla = {
  name: '...',
  description: '...',
  nodes: [...]
};
```

### Añadir Categoría de Nodos

```typescript
NODE_SUGGESTIONS.nueva_categoria = [
  'Nodo1', 'Nodo2', ...
];
```

## 📈 Métricas y Observabilidad

El servidor usa `console.error` para logs (no interfiere con stdio):

```typescript
console.error('n8n MCP Server running on stdio');
```

Para debugging, se pueden añadir más logs sin afectar la comunicación.

## 🎯 Decisiones de Diseño

### ¿Por qué stdio?

- Estándar MCP
- Simple y confiable
- No requiere networking
- Seguro (local-only)

### ¿Por qué no ejecutar comandos directamente?

- Seguridad: El usuario mantiene control
- Flexibilidad: El usuario puede customizar
- Educativo: El usuario aprende en el proceso
- Transparencia: Todo es visible

### ¿Por qué mensajes en español?

- Mejor UX para el público objetivo
- Reduce fricción cognitiva
- Hace la herramienta más accesible

### ¿Por qué plantillas estáticas?

- Más rápido que generación dinámica
- Fácil de mantener y testear
- Predictible y confiable
- Fácil de extender

## 🔮 Futuras Mejoras

### Corto Plazo
- [ ] Validación de workflows
- [ ] Exportación a diferentes formatos
- [ ] Más plantillas

### Medio Plazo
- [ ] Integración con n8n API
- [ ] Tests automatizados
- [ ] CI/CD pipeline

### Largo Plazo
- [ ] IA para sugerencias más inteligentes
- [ ] Soporte para múltiples idiomas
- [ ] Marketplace de plantillas

---

Este documento es un trabajo en progreso. ¡Contribuciones bienvenidas! 📝
