# Diagramas y Visualizaciones

Este documento contiene diagramas visuales para entender mejor el flujo de trabajo de n8n-mcp.

## 🎯 Flujo de Usuario Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                    USUARIO EN ANTIGRAVITY IDE                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ "Quiero crear una automatización"
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  PASO 1: CONECTAR WORKSPACE                                     │
│  Tool: connect_workspace                                        │
│  Output: Configuración JSON para MCP                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  PASO 2: DEFINIR OBJETIVO                                       │
│  Tool: guide_automation_setup (step 1)                          │
│  Output: Preguntas para clarificar objetivo                     │
│  - ¿Qué quieres automatizar?                                    │
│  - ¿Qué servicios conectar?                                     │
│  - ¿Con qué frecuencia ejecutar?                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Usuario responde
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  PASO 3: SELECCIONAR ENFOQUE                                    │
│  Opción A: Desde Cero          Opción B: Desde Plantilla       │
│  ├─ create_n8n_workflow        └─ create_workflow_template     │
│  └─ Estructura básica              └─ Workflow pre-configurado │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  PASO 4: AÑADIR NODOS                                           │
│  Tool: suggest_n8n_nodes                                        │
│  Input: Descripción de tarea + integraciones                    │
│  Output: Lista de nodos recomendados                            │
│  - Nodo 1: [Descripción]                                        │
│  - Nodo 2: [Descripción]                                        │
│  - ...                                                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  PASO 5: INTEGRAR CON GITHUB                                    │
│  Tool: setup_github_integration                                 │
│  Output: Comandos git listos                                    │
│  - git init                                                     │
│  - git add .                                                    │
│  - git commit -m "..."                                          │
│  - git push                                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  PASO 6: IMPLEMENTAR EN N8N                                     │
│  1. Usuario copia workflow JSON                                 │
│  2. Usuario abre n8n                                            │
│  3. Usuario importa workflow                                    │
│  4. Usuario configura credenciales                              │
│  5. Usuario prueba workflow                                     │
│  6. Usuario activa workflow                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                     ✅ AUTOMATIZACIÓN COMPLETA
```

## 🔄 Ciclo de Desarrollo Iterativo

```
     ┌──────────────────────────────────────────────┐
     │                                              │
     │   ┌──────────────────────────────────────┐  │
     │   │  1. CREAR/MODIFICAR WORKFLOW         │  │
     │   │     (create_n8n_workflow o template) │  │
     │   └────────────┬─────────────────────────┘  │
     │                │                             │
     │   ┌────────────▼─────────────────────────┐  │
     │   │  2. AÑADIR/AJUSTAR NODOS             │  │
     │   │     (suggest_n8n_nodes)              │  │
     │   └────────────┬─────────────────────────┘  │
     │                │                             │
     │   ┌────────────▼─────────────────────────┐  │
     │   │  3. PROBAR EN N8N                    │  │
     │   │     (manual - en instancia n8n)      │  │
     │   └────────────┬─────────────────────────┘  │
     │                │                             │
     │   ┌────────────▼─────────────────────────┐  │
     │   │  4. ¿FUNCIONA?                       │  │
     │   │     ├─ SÍ  → Commit a GitHub         │  │
     │   │     └─ NO  → Ajustar (volver a 1)    │  │
     │   └────────────┬─────────────────────────┘  │
     │                │ SÍ                          │
     │   ┌────────────▼─────────────────────────┐  │
     │   │  5. VERSION CONTROL                  │  │
     │   │     (setup_github_integration)       │  │
     │   └────────────┬─────────────────────────┘  │
     │                │                             │
     │   ┌────────────▼─────────────────────────┐  │
     │   │  6. DESPLEGAR                        │  │
     │   │     ✅ Workflow en producción        │  │
     │   └────────────┬─────────────────────────┘  │
     │                │                             │
     │                │ Nueva funcionalidad?        │
     │                └─────────────────────────────┘
     │                      │
     └──────────────────────┘
```

## 🛠️ Arquitectura de Herramientas

```
┌─────────────────────────────────────────────────────────────┐
│                      HERRAMIENTAS MCP                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📝 CREACIÓN                                                │
│  ├─ create_n8n_workflow ────────┐                          │
│  │   • Workflow desde cero      │                          │
│  │   • Define trigger           │                          │
│  │   • Estructura base          │                          │
│  │                              │                          │
│  └─ create_workflow_template ───┤                          │
│      • 6 plantillas              │                          │
│      • Pre-configuradas          │                          │
│      • Casos comunes             │                          │
│                                  │                          │
│  🔍 DESCUBRIMIENTO               │                          │
│  └─ suggest_n8n_nodes ───────────┤                          │
│      • Análisis de keywords      │                          │
│      • 8 categorías              │                          │
│      • Matching inteligente      ├──► WORKFLOW COMPLETO    │
│                                  │                          │
│  📚 GUÍA                         │                          │
│  └─ guide_automation_setup ──────┤                          │
│      • 5 pasos estructurados     │                          │
│      • Contextual                │                          │
│      • Educativo                 │                          │
│                                  │                          │
│  🔗 INTEGRACIÓN                  │                          │
│  ├─ setup_github_integration ────┤                          │
│  │   • Comandos git             │                          │
│  │   • Webhooks                 │                          │
│  │   • CI/CD ready              │                          │
│  │                              │                          │
│  └─ connect_workspace ───────────┘                          │
│      • Configuración MCP                                    │
│      • Workspace setup                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Tipos de Workflows Soportados

```
┌──────────────────────────────────────────────────────────────┐
│                    PLANTILLAS DISPONIBLES                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  🔄 data_sync                    ⏰ scheduled_task          │
│  └─ Sincronización automática    └─ Tareas programadas      │
│     entre fuentes de datos           con cron               │
│                                                              │
│  🔔 notification_system          ⚡ event_driven            │
│  └─ Alertas y notificaciones     └─ Respuesta a eventos     │
│     basadas en eventos               externos               │
│                                                              │
│  ⚙️ data_processing              🔌 api_integration         │
│  └─ Transformación y              └─ Conectar múltiples     │
│     procesamiento de datos           APIs                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘

Cada plantilla incluye:
• Nodos pre-configurados
• Conexiones básicas
• Configuración sugerida
• Próximos pasos claros
```

## 🎓 Niveles de Usuario

```
┌─────────────────────────────────────────────────────────────┐
│                     EXPERIENCIA DEL USUARIO                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🌱 PRINCIPIANTE                                            │
│  ├─ Usa: guide_automation_setup (step by step)             │
│  ├─ Comienza con: create_workflow_template                 │
│  ├─ Guía detallada en cada paso                            │
│  └─ Explicaciones completas                                │
│                                                             │
│  🌿 INTERMEDIO                                              │
│  ├─ Usa: create_n8n_workflow                               │
│  ├─ Combina: suggest_n8n_nodes + plantillas                │
│  ├─ Guía equilibrada                                       │
│  └─ Customización moderada                                 │
│                                                             │
│  🌳 AVANZADO                                                │
│  ├─ Usa: Todas las herramientas                            │
│  ├─ Crea desde cero con suggest_n8n_nodes                  │
│  ├─ Información directa                                    │
│  └─ Máxima flexibilidad                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Interacción MCP

```
┌────────────────┐                  ┌──────────────────┐
│  Antigravity   │                  │   n8n-mcp        │
│      IDE       │                  │    Server        │
└───────┬────────┘                  └────────┬─────────┘
        │                                    │
        │  ListToolsRequest                  │
        ├────────────────────────────────────>│
        │                                    │
        │  ToolsList (6 tools)               │
        │<────────────────────────────────────┤
        │                                    │
        │  User: "Crea workflow"             │
        │                                    │
        │  CallToolRequest                   │
        │  {                                 │
        │    name: "create_n8n_workflow",    │
        │    args: {...}                     │
        │  }                                 │
        ├────────────────────────────────────>│
        │                                    │
        │                                    │ Process
        │                                    │ Generate
        │                                    │ Response
        │                                    │
        │  Response                          │
        │  {                                 │
        │    content: [{                     │
        │      type: "text",                 │
        │      text: "✅ Workflow creado..." │
        │    }]                              │
        │  }                                 │
        │<────────────────────────────────────┤
        │                                    │
        │  Display to user                   │
        │                                    │
```

## 📈 Mejora Continua

```
v1.0.0 (Actual)
  │
  ├─ 6 herramientas core
  ├─ 6 plantillas
  ├─ Documentación completa
  └─ 0 vulnerabilidades
  
v1.1.0 (Futuro cercano)
  │
  ├─ Validación de workflows
  ├─ Más plantillas
  └─ Export/Import

v1.2.0 (Futuro medio)
  │
  ├─ Integración con n8n API
  ├─ Deployment automático
  └─ Tests automatizados

v2.0.0 (Futuro lejano)
  │
  ├─ IA para sugerencias
  ├─ Marketplace de plantillas
  └─ Soporte multiidioma
```

## 🌐 Ecosistema

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ┌─────────────┐       ┌─────────────┐                     │
│   │ Antigravity │◄─────►│   n8n-mcp   │                     │
│   │     IDE     │  MCP  │   Server    │                     │
│   └─────────────┘       └──────┬──────┘                     │
│                                │                             │
│                                │ Guía Usuario                │
│                                │                             │
│                         ┌──────▼──────┐                      │
│                         │   Usuario   │                      │
│                         │   Ejecuta   │                      │
│                         └──────┬──────┘                      │
│                                │                             │
│              ┌─────────────────┼─────────────────┐           │
│              │                 │                 │           │
│         ┌────▼─────┐     ┌────▼─────┐     ┌────▼─────┐     │
│         │  GitHub  │     │   n8n    │     │   Apps   │     │
│         │  (VCS)   │     │(Execute) │     │(Target)  │     │
│         └──────────┘     └──────────┘     └──────────┘     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

Estos diagramas ayudan a visualizar el flujo completo de trabajo con n8n-mcp. 📊
