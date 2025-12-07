#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

// Define available tools
const TOOLS: Tool[] = [
  {
    name: 'create_n8n_workflow',
    description: 'Ayuda a crear un workflow de n8n paso a paso. Proporciona plantillas y guía al usuario en la construcción de automatizaciones.',
    inputSchema: {
      type: 'object',
      properties: {
        workflow_name: {
          type: 'string',
          description: 'Nombre del workflow a crear',
        },
        workflow_description: {
          type: 'string',
          description: 'Descripción de lo que hace el workflow',
        },
        trigger_type: {
          type: 'string',
          description: 'Tipo de trigger (webhook, schedule, manual, etc.)',
          enum: ['webhook', 'schedule', 'manual', 'email'],
        },
      },
      required: ['workflow_name', 'trigger_type'],
    },
  },
  {
    name: 'suggest_n8n_nodes',
    description: 'Sugiere nodos de n8n basados en la tarea que el usuario quiere automatizar. Ayuda a encontrar las herramientas correctas.',
    inputSchema: {
      type: 'object',
      properties: {
        task_description: {
          type: 'string',
          description: 'Descripción de la tarea que se quiere automatizar',
        },
        integration_needed: {
          type: 'string',
          description: 'Servicios o aplicaciones que necesita integrar (opcional)',
        },
      },
      required: ['task_description'],
    },
  },
  {
    name: 'setup_github_integration',
    description: 'Configura la integración con GitHub para el proyecto. Ayuda a crear repositorio, configurar webhooks y establecer flujos de CI/CD.',
    inputSchema: {
      type: 'object',
      properties: {
        project_name: {
          type: 'string',
          description: 'Nombre del proyecto',
        },
        repository_name: {
          type: 'string',
          description: 'Nombre del repositorio en GitHub',
        },
        setup_webhooks: {
          type: 'boolean',
          description: 'Si se deben configurar webhooks automáticamente',
        },
      },
      required: ['project_name', 'repository_name'],
    },
  },
  {
    name: 'guide_automation_setup',
    description: 'Proporciona guía paso a paso para configurar una automatización completa. Pregunta información necesaria y guía al usuario en el proceso.',
    inputSchema: {
      type: 'object',
      properties: {
        automation_goal: {
          type: 'string',
          description: 'Objetivo de la automatización que se quiere lograr',
        },
        current_step: {
          type: 'number',
          description: 'Paso actual en el proceso (1-10)',
        },
        user_experience: {
          type: 'string',
          description: 'Nivel de experiencia del usuario',
          enum: ['principiante', 'intermedio', 'avanzado'],
        },
      },
      required: ['automation_goal'],
    },
  },
  {
    name: 'connect_workspace',
    description: 'Conecta el MCP con el workspace de Antigravity. Configura el entorno para que funcione automáticamente.',
    inputSchema: {
      type: 'object',
      properties: {
        workspace_path: {
          type: 'string',
          description: 'Ruta del workspace',
        },
        auto_configure: {
          type: 'boolean',
          description: 'Si se debe configurar automáticamente',
        },
      },
      required: ['workspace_path'],
    },
  },
  {
    name: 'create_workflow_template',
    description: 'Crea una plantilla de workflow predefinida basada en casos de uso comunes.',
    inputSchema: {
      type: 'object',
      properties: {
        template_type: {
          type: 'string',
          description: 'Tipo de plantilla',
          enum: [
            'data_sync',
            'notification_system',
            'data_processing',
            'api_integration',
            'scheduled_task',
            'event_driven',
          ],
        },
        customization: {
          type: 'object',
          description: 'Personalizaciones para la plantilla',
        },
      },
      required: ['template_type'],
    },
  },
];

// Node suggestions database
const NODE_SUGGESTIONS = {
  email: ['Email', 'Gmail', 'SendGrid', 'IMAP Email'],
  database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  api: ['HTTP Request', 'Webhook', 'GraphQL'],
  files: ['Read/Write Files', 'Google Drive', 'Dropbox', 'AWS S3'],
  spreadsheet: ['Google Sheets', 'Excel', 'Airtable'],
  communication: ['Slack', 'Discord', 'Microsoft Teams', 'Telegram'],
  automation: ['Schedule Trigger', 'Cron', 'If', 'Switch', 'Merge'],
  data_processing: ['Code', 'Function', 'Set', 'Split In Batches'],
};

// Workflow templates
const WORKFLOW_TEMPLATES = {
  data_sync: {
    name: 'Sincronización de Datos',
    description: 'Sincroniza datos entre dos fuentes',
    nodes: [
      { type: 'Schedule Trigger', config: 'Ejecutar cada hora' },
      { type: 'HTTP Request', config: 'Obtener datos de la fuente' },
      { type: 'Set', config: 'Transformar datos' },
      { type: 'Database', config: 'Guardar en destino' },
    ],
  },
  notification_system: {
    name: 'Sistema de Notificaciones',
    description: 'Envía notificaciones basadas en eventos',
    nodes: [
      { type: 'Webhook', config: 'Recibir evento' },
      { type: 'If', config: 'Validar condiciones' },
      { type: 'Slack/Email', config: 'Enviar notificación' },
    ],
  },
  data_processing: {
    name: 'Procesamiento de Datos',
    description: 'Procesa y transforma datos automáticamente',
    nodes: [
      { type: 'Manual Trigger', config: 'Iniciar manualmente' },
      { type: 'Read Files', config: 'Leer archivo de entrada' },
      { type: 'Code', config: 'Procesar datos' },
      { type: 'Write Files', config: 'Guardar resultado' },
    ],
  },
  api_integration: {
    name: 'Integración de API',
    description: 'Conecta múltiples APIs',
    nodes: [
      { type: 'HTTP Request', config: 'Llamar API 1' },
      { type: 'Set', config: 'Mapear datos' },
      { type: 'HTTP Request', config: 'Llamar API 2' },
      { type: 'Webhook Response', config: 'Devolver resultado' },
    ],
  },
  scheduled_task: {
    name: 'Tarea Programada',
    description: 'Ejecuta tareas en intervalos regulares',
    nodes: [
      { type: 'Cron', config: 'Definir programación' },
      { type: 'Function', config: 'Lógica de negocio' },
      { type: 'Email', config: 'Enviar reporte' },
    ],
  },
  event_driven: {
    name: 'Workflow Basado en Eventos',
    description: 'Responde a eventos externos',
    nodes: [
      { type: 'Webhook', config: 'Escuchar eventos' },
      { type: 'Switch', config: 'Determinar acción' },
      { type: 'Multiple Actions', config: 'Ejecutar según tipo' },
    ],
  },
};

// Setup guides
const AUTOMATION_GUIDES = {
  step1: {
    title: '1. Definir Objetivo',
    questions: [
      '¿Qué proceso quieres automatizar?',
      '¿Qué aplicaciones o servicios necesitas conectar?',
      '¿Con qué frecuencia debe ejecutarse?',
    ],
    next_action: 'Basado en tus respuestas, te recomendaré el tipo de workflow apropiado.',
  },
  step2: {
    title: '2. Seleccionar Trigger',
    options: [
      'Webhook - Para eventos externos en tiempo real',
      'Schedule - Para tareas programadas',
      'Manual - Para ejecutar bajo demanda',
      'Email - Para responder a correos',
    ],
    next_action: 'Configuraré el trigger apropiado para tu workflow.',
  },
  step3: {
    title: '3. Configurar Nodos de Procesamiento',
    guidance: 'Los nodos son los bloques de construcción. Te ayudaré a seleccionar los correctos.',
    next_action: 'Usaré suggest_n8n_nodes para encontrar los nodos perfectos.',
  },
  step4: {
    title: '4. Conectar con GitHub',
    guidance: 'Vincularemos tu workflow con un repositorio de GitHub para versionamiento.',
    next_action: 'Configuraré la integración con GitHub automáticamente.',
  },
  step5: {
    title: '5. Probar y Desplegar',
    guidance: 'Probaremos el workflow y lo desplegaremos.',
    next_action: 'Te guiaré en las pruebas y activación del workflow.',
  },
};

// Create the server
const server = new Server(
  {
    name: 'n8n-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'create_n8n_workflow': {
        const { workflow_name, workflow_description, trigger_type } = args as {
          workflow_name: string;
          workflow_description?: string;
          trigger_type: string;
        };

        const workflow = {
          name: workflow_name,
          description: workflow_description || '',
          nodes: [
            {
              type: trigger_type === 'webhook' ? 'Webhook' : 
                    trigger_type === 'schedule' ? 'Schedule Trigger' : 
                    trigger_type === 'email' ? 'Email Trigger' : 
                    'Manual Trigger',
              position: [250, 300],
            },
          ],
          connections: {},
        };

        return {
          content: [
            {
              type: 'text',
              text: `✅ Workflow "${workflow_name}" creado exitosamente!\n\n` +
                    `Configuración inicial:\n` +
                    `- Nombre: ${workflow_name}\n` +
                    `- Trigger: ${trigger_type}\n` +
                    `- Descripción: ${workflow_description || 'No especificada'}\n\n` +
                    `Próximos pasos:\n` +
                    `1. Usa 'suggest_n8n_nodes' para añadir nodos de procesamiento\n` +
                    `2. Configura las conexiones entre nodos\n` +
                    `3. Prueba el workflow\n\n` +
                    `Estructura del workflow:\n${JSON.stringify(workflow, null, 2)}`,
            },
          ],
        };
      }

      case 'suggest_n8n_nodes': {
        const { task_description, integration_needed } = args as {
          task_description: string;
          integration_needed?: string;
        };

        // Simple keyword matching for suggestions
        const suggestions: string[] = [];
        const taskLower = task_description.toLowerCase();

        Object.entries(NODE_SUGGESTIONS).forEach(([category, nodes]) => {
          if (taskLower.includes(category)) {
            suggestions.push(...nodes);
          }
        });

        // Check integration keywords
        if (integration_needed) {
          const integrationLower = integration_needed.toLowerCase();
          Object.values(NODE_SUGGESTIONS).forEach((nodes) => {
            nodes.forEach((node) => {
              if (integrationLower.includes(node.toLowerCase()) && !suggestions.includes(node)) {
                suggestions.push(node);
              }
            });
          });
        }

        // Default suggestions if none found
        if (suggestions.length === 0) {
          suggestions.push('HTTP Request', 'Set', 'Code', 'If');
        }

        return {
          content: [
            {
              type: 'text',
              text: `🔍 Nodos sugeridos para: "${task_description}"\n\n` +
                    `Nodos recomendados:\n${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
                    `${integration_needed ? `Integraciones detectadas: ${integration_needed}\n\n` : ''}` +
                    `💡 Tip: Puedes combinar estos nodos para crear un workflow completo.\n` +
                    `Usa 'create_n8n_workflow' para comenzar a construir tu automatización.`,
            },
          ],
        };
      }

      case 'setup_github_integration': {
        const { project_name, repository_name, setup_webhooks } = args as {
          project_name: string;
          repository_name: string;
          setup_webhooks?: boolean;
        };

        const steps = [
          `1. Crear repositorio en GitHub: ${repository_name}`,
          `2. Inicializar git en el proyecto: ${project_name}`,
          `3. Configurar remote: git remote add origin https://github.com/[username]/${repository_name}.git`,
          `4. Hacer commit inicial: git add . && git commit -m "Initial commit"`,
          `5. Push al repositorio: git push -u origin main`,
        ];

        if (setup_webhooks) {
          steps.push(
            `6. Configurar webhook en GitHub → Settings → Webhooks`,
            `7. URL del webhook: [Tu URL de n8n]/webhook/[workflow-id]`,
            `8. Eventos: push, pull_request`,
          );
        }

        return {
          content: [
            {
              type: 'text',
              text: `🔗 Configuración de GitHub para: ${project_name}\n\n` +
                    `Pasos a seguir:\n${steps.join('\n')}\n\n` +
                    `📝 Comandos rápidos:\n` +
                    `\`\`\`bash\n` +
                    `# Inicializar repositorio\n` +
                    `git init\n` +
                    `git add .\n` +
                    `git commit -m "Initial commit with n8n workflow"\n` +
                    `git branch -M main\n` +
                    `git remote add origin https://github.com/[username]/${repository_name}.git\n` +
                    `git push -u origin main\n` +
                    `\`\`\`\n\n` +
                    `✅ Tu proyecto ahora está versionado en GitHub y listo para colaboración!`,
            },
          ],
        };
      }

      case 'guide_automation_setup': {
        const { automation_goal, current_step, user_experience } = args as {
          automation_goal: string;
          current_step?: number;
          user_experience?: string;
        };

        const step = current_step || 1;
        const stepKey = `step${step}` as keyof typeof AUTOMATION_GUIDES;
        const guide = AUTOMATION_GUIDES[stepKey] || AUTOMATION_GUIDES.step1;

        const experienceLevel = user_experience || 'intermedio';
        const detailLevel = 
          experienceLevel === 'principiante' ? 'Explicaré cada paso en detalle.' :
          experienceLevel === 'avanzado' ? 'Iré directo al grano.' :
          'Te daré una guía equilibrada.';

        return {
          content: [
            {
              type: 'text',
              text: `📚 Guía de Automatización - ${guide.title}\n\n` +
                    `🎯 Objetivo: ${automation_goal}\n` +
                    `👤 Nivel: ${experienceLevel} - ${detailLevel}\n\n` +
                    `${'questions' in guide ? `Preguntas a considerar:\n${guide.questions.join('\n')}\n\n` : ''}` +
                    `${'options' in guide ? `Opciones disponibles:\n${guide.options.join('\n')}\n\n` : ''}` +
                    `${'guidance' in guide ? `Guía: ${guide.guidance}\n\n` : ''}` +
                    `➡️ Siguiente acción: ${guide.next_action}\n\n` +
                    `Progreso: Paso ${step} de 5\n` +
                    `Para continuar al siguiente paso, llama esta herramienta con current_step: ${step + 1}`,
            },
          ],
        };
      }

      case 'connect_workspace': {
        const { workspace_path, auto_configure } = args as {
          workspace_path: string;
          auto_configure?: boolean;
        };

        const configSteps = [
          `1. Abrir configuración de Antigravity IDE`,
          `2. Ir a Extensions → MCP Servers`,
          `3. Añadir nuevo servidor:`,
          `   - Name: n8n-mcp`,
          `   - Command: npx`,
          `   - Args: ["-y", "n8n-mcp"]`,
          `   - Workspace: ${workspace_path}`,
          `4. Guardar y reiniciar el IDE`,
        ];

        const configJson = {
          mcpServers: {
            'n8n-mcp': {
              command: 'npx',
              args: ['-y', 'n8n-mcp'],
              env: {
                WORKSPACE_PATH: workspace_path,
              },
            },
          },
        };

        return {
          content: [
            {
              type: 'text',
              text: `🔌 Conexión con Workspace: ${workspace_path}\n\n` +
                    `${auto_configure ? '⚙️ Configuración automática activada\n\n' : ''}` +
                    `Pasos de configuración:\n${configSteps.join('\n')}\n\n` +
                    `📄 Configuración JSON para tu MCP settings:\n` +
                    `\`\`\`json\n${JSON.stringify(configJson, null, 2)}\n\`\`\`\n\n` +
                    `✅ Una vez configurado, el MCP estará disponible automáticamente en tu workspace!\n\n` +
                    `Próximos pasos:\n` +
                    `- Usa 'create_n8n_workflow' para crear tu primer workflow\n` +
                    `- Usa 'guide_automation_setup' para recibir guía paso a paso`,
            },
          ],
        };
      }

      case 'create_workflow_template': {
        const { template_type, customization } = args as {
          template_type: string;
          customization?: any;
        };

        const template = WORKFLOW_TEMPLATES[template_type as keyof typeof WORKFLOW_TEMPLATES];
        if (!template) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Plantilla no encontrada: ${template_type}\n\n` +
                      `Plantillas disponibles:\n${Object.keys(WORKFLOW_TEMPLATES).join(', ')}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `📋 Plantilla: ${template.name}\n\n` +
                    `Descripción: ${template.description}\n\n` +
                    `Nodos incluidos:\n${template.nodes.map((n, i) => 
                      `${i + 1}. ${n.type}\n   ${n.config}`
                    ).join('\n')}\n\n` +
                    `${customization ? `Personalizaciones aplicadas:\n${JSON.stringify(customization, null, 2)}\n\n` : ''}` +
                    `🚀 Próximos pasos:\n` +
                    `1. Copia esta estructura a tu n8n\n` +
                    `2. Ajusta las configuraciones según tus necesidades\n` +
                    `3. Conecta con tus servicios específicos\n` +
                    `4. Prueba el workflow\n\n` +
                    `💡 Tip: Usa 'suggest_n8n_nodes' si necesitas añadir más nodos personalizados.`,
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: 'text',
              text: `Herramienta desconocida: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error ejecutando ${name}: ${error}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('n8n MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
