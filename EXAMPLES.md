# Ejemplos de Uso de n8n-mcp

Este documento contiene ejemplos prácticos de cómo usar el servidor MCP de n8n.

## Ejemplo 1: Crear un Sistema de Notificaciones

### Paso 1: Guía inicial
Pide ayuda al MCP:
```
"Usa la herramienta guide_automation_setup con estos parámetros:
- automation_goal: 'crear sistema de notificaciones por Slack'
- current_step: 1
- user_experience: 'principiante'"
```

### Paso 2: Crear el workflow base
```
"Usa create_n8n_workflow con:
- workflow_name: 'Sistema de Notificaciones Slack'
- workflow_description: 'Envía notificaciones a Slack cuando ocurren eventos'
- trigger_type: 'webhook'"
```

### Paso 3: Obtener sugerencias de nodos
```
"Usa suggest_n8n_nodes con:
- task_description: 'recibir webhook y enviar mensaje a Slack'
- integration_needed: 'Slack, webhook'"
```

## Ejemplo 2: Sincronización de Datos

### Usando una plantilla
```
"Usa create_workflow_template con:
- template_type: 'data_sync'"
```

Esto te dará una plantilla completa con:
- Schedule Trigger (ejecutar cada hora)
- HTTP Request (obtener datos)
- Set (transformar datos)
- Database (guardar datos)

### Personalizar la plantilla
```
"Usa suggest_n8n_nodes con:
- task_description: 'conectar con API de Google Sheets y MySQL'
- integration_needed: 'Google Sheets, MySQL'"
```

## Ejemplo 3: Integración con GitHub

### Conectar tu proyecto con GitHub
```
"Usa setup_github_integration con:
- project_name: 'mi-proyecto-automatizacion'
- repository_name: 'workflows-n8n'
- setup_webhooks: true"
```

Esto te proporcionará:
- Comandos git listos para copiar
- Instrucciones de configuración de webhooks
- Enlaces a la documentación relevante

## Ejemplo 4: Workflow Completo desde Cero

### 1. Conectar workspace
```
"Usa connect_workspace con:
- workspace_path: '/home/user/mis-proyectos/automatizaciones'
- auto_configure: true"
```

### 2. Comenzar guía paso a paso
```
"Usa guide_automation_setup con:
- automation_goal: 'procesar facturas automáticamente'
- current_step: 1
- user_experience: 'intermedio'"
```

### 3. Seguir los pasos
El MCP te guiará a través de 5 pasos:
1. Definir objetivo
2. Seleccionar trigger
3. Configurar nodos
4. Conectar con GitHub
5. Probar y desplegar

### 4. Crear el workflow
```
"Usa create_n8n_workflow con:
- workflow_name: 'Procesador de Facturas'
- trigger_type: 'email'"
```

### 5. Añadir nodos necesarios
```
"Usa suggest_n8n_nodes con:
- task_description: 'leer PDF de factura, extraer datos, guardar en base de datos'
- integration_needed: 'Email, PostgreSQL'"
```

## Ejemplo 5: API Integration

### Plantilla de integración
```
"Usa create_workflow_template con:
- template_type: 'api_integration'"
```

### Personalización
```
"Necesito conectar la API de Stripe con mi sistema CRM.
Usa suggest_n8n_nodes con:
- task_description: 'sincronizar pagos de Stripe con CRM'
- integration_needed: 'Stripe, HTTP Request, Database'"
```

## Flujo de Trabajo Recomendado

```
┌─────────────────────────────────────────────────┐
│  1. connect_workspace                           │
│     Conecta tu workspace de Antigravity         │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│  2. guide_automation_setup (paso 1)             │
│     Define tu objetivo y obtén recomendaciones  │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│  3. create_n8n_workflow o                       │
│     create_workflow_template                    │
│     Crea la estructura base                     │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│  4. suggest_n8n_nodes                           │
│     Obtén sugerencias de nodos específicos      │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│  5. setup_github_integration                    │
│     Versiona tu workflow                        │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│  6. Implementar en n8n                          │
│     Copia el workflow a tu instancia de n8n     │
└─────────────────────────────────────────────────┘
```

## Consejos y Mejores Prácticas

### 1. Empieza Simple
- Usa `create_workflow_template` para casos comunes
- Añade complejidad gradualmente
- Prueba cada paso antes de continuar

### 2. Usa la Guía Paso a Paso
- `guide_automation_setup` te ayudará a no olvidar nada
- Sigue los 5 pasos en orden
- Ajusta tu nivel de experiencia

### 3. Aprovecha las Sugerencias
- `suggest_n8n_nodes` conoce cientos de nodos
- Sé específico en tu descripción
- Menciona las integraciones que necesitas

### 4. Versiona Todo
- Usa `setup_github_integration` desde el inicio
- Commit frecuentemente
- Documenta tus cambios

### 5. Mantén Contacto con el MCP
- El MCP está aquí para ayudarte
- No dudes en pedir más detalles
- Usa `guide_automation_setup` con diferentes steps

## Solución de Problemas

### No aparece el MCP en Antigravity
1. Verifica la configuración en settings.json
2. Reinicia el IDE
3. Revisa que npx esté disponible

### El workflow no funciona en n8n
1. Verifica las credenciales en n8n
2. Asegúrate de que los nodos estén conectados
3. Revisa los logs de ejecución en n8n

### Necesito más nodos
1. Usa `suggest_n8n_nodes` con más detalles
2. Consulta la documentación de n8n
3. Pide ayuda al MCP con `guide_automation_setup`
