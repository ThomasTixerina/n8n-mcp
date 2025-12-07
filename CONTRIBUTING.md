# Contribuir a n8n-mcp

¡Gracias por tu interés en contribuir a n8n-mcp! Este documento te guiará a través del proceso.

## 🚀 Cómo Empezar

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub, luego:
git clone https://github.com/TU_USUARIO/n8n-mcp.git
cd n8n-mcp
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Compilar el Proyecto

```bash
npm run build
# O para desarrollo continuo:
npm run watch
```

## 🛠️ Estructura del Proyecto

```
n8n-mcp/
├── src/
│   └── index.ts          # Servidor MCP principal
├── dist/                 # Código compilado
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración TypeScript
├── README.md             # Documentación principal
├── QUICKSTART.md         # Guía de inicio rápido
├── EXAMPLES.md           # Ejemplos de uso
└── antigravity-config.json # Configuración ejemplo
```

## 💡 Áreas de Contribución

### 1. Nuevas Herramientas (Tools)

Para añadir una nueva herramienta al MCP:

1. Define la herramienta en el array `TOOLS`:

```typescript
{
  name: 'mi_nueva_herramienta',
  description: 'Descripción de lo que hace',
  inputSchema: {
    type: 'object',
    properties: {
      parametro1: {
        type: 'string',
        description: 'Descripción del parámetro',
      },
    },
    required: ['parametro1'],
  },
}
```

2. Implementa el handler en el switch de `CallToolRequestSchema`:

```typescript
case 'mi_nueva_herramienta': {
  const { parametro1 } = args as { parametro1: string };
  
  // Tu lógica aquí
  
  return {
    content: [
      {
        type: 'text',
        text: 'Resultado de la herramienta',
      },
    ],
  };
}
```

### 2. Nuevas Plantillas de Workflow

Añade plantillas al objeto `WORKFLOW_TEMPLATES`:

```typescript
mi_plantilla: {
  name: 'Nombre de la Plantilla',
  description: 'Descripción',
  nodes: [
    { type: 'Tipo de Nodo', config: 'Configuración' },
  ],
}
```

### 3. Sugerencias de Nodos

Expande el objeto `NODE_SUGGESTIONS` con nuevas categorías:

```typescript
mi_categoria: ['Nodo1', 'Nodo2', 'Nodo3'],
```

### 4. Guías de Automatización

Añade nuevos pasos al objeto `AUTOMATION_GUIDES`:

```typescript
step6: {
  title: '6. Nuevo Paso',
  guidance: 'Guía para el usuario',
  next_action: 'Siguiente acción',
}
```

## 🧪 Testing

### Pruebas Manuales

```bash
# Compilar
npm run build

# Ejecutar el servidor
node dist/index.js
```

El servidor esperará input en stdin. Puedes probar manualmente o usar un cliente MCP.

### Probar con Antigravity IDE

1. Compila tu versión local
2. Actualiza la configuración para apuntar a tu versión:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "node",
      "args": ["/ruta/a/tu/n8n-mcp/dist/index.js"]
    }
  }
}
```

3. Reinicia Antigravity IDE
4. Prueba las herramientas

## 📝 Estilo de Código

### TypeScript

- Usa `const` por defecto, `let` solo cuando sea necesario
- Tipado explícito donde mejore la claridad
- Nombres descriptivos en español para user-facing strings
- Comentarios en español para documentación de usuario
- Comentarios técnicos pueden estar en inglés

### Formato

- 2 espacios de indentación
- Punto y coma al final de statements
- Comillas simples para strings
- No dejar console.logs excepto en el servidor principal

### Mensajes de Respuesta

- Usa emojis para mejorar la legibilidad (✅ ❌ 🔍 💡 etc.)
- Incluye ejemplos cuando sea relevante
- Proporciona próximos pasos claros
- Mantén el tono amigable y educativo

## 📋 Proceso de Pull Request

### 1. Crear una Rama

```bash
git checkout -b feature/mi-nueva-funcionalidad
```

### 2. Hacer Cambios

- Haz commits pequeños y descriptivos
- Escribe mensajes de commit claros
- Incluye el contexto en el mensaje

Ejemplo:
```bash
git commit -m "Add workflow export tool

- Adds export_workflow tool
- Supports JSON and YAML formats
- Includes error handling for invalid workflows"
```

### 3. Actualizar Documentación

Si tu cambio afecta al usuario:
- Actualiza README.md
- Añade ejemplos en EXAMPLES.md
- Actualiza QUICKSTART.md si aplica

### 4. Probar Completamente

- Compila sin errores: `npm run build`
- Prueba manualmente cada nueva funcionalidad
- Verifica que no hayas roto funcionalidad existente

### 5. Push y PR

```bash
git push origin feature/mi-nueva-funcionalidad
```

Luego crea el Pull Request en GitHub con:
- Título descriptivo
- Descripción de los cambios
- Ejemplos de uso
- Screenshots si aplica

## 🎯 Ideas para Contribuciones

### Herramientas Nuevas
- `validate_workflow`: Validar workflows antes de deployment
- `export_workflow`: Exportar workflows a JSON/YAML
- `import_workflow`: Importar workflows existentes
- `test_workflow`: Ejecutar tests en workflows
- `deploy_workflow`: Deployment automático a n8n cloud
- `manage_credentials`: Ayudar con gestión de credenciales

### Mejoras a Herramientas Existentes
- Más plantillas de workflows
- Mejores sugerencias de nodos con IA
- Integración con más servicios
- Soporte para más triggers
- Mejor manejo de errores

### Documentación
- Tutoriales en video
- Más ejemplos de uso
- Casos de uso del mundo real
- Traducciones a otros idiomas
- Guías específicas por industria

### Infraestructura
- Tests automatizados
- CI/CD pipeline
- Publicación automática a npm
- Versionamiento semántico
- Changelog automático

## 🐛 Reportar Bugs

Si encuentras un bug:

1. Verifica que no exista ya un issue
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Versión de n8n-mcp
   - Versión de Node.js
   - Sistema operativo

## 💬 Preguntas

Si tienes preguntas:
- Abre un issue con la etiqueta "question"
- Sé específico sobre lo que necesitas
- Proporciona contexto

## 📜 Código de Conducta

- Sé respetuoso y constructivo
- Acepta feedback con mente abierta
- Enfócate en el código, no en las personas
- Ayuda a otros contribuidores
- Mantén un ambiente positivo

## 🙏 Reconocimientos

Todos los contribuidores serán reconocidos en el README.md

---

¡Gracias por hacer n8n-mcp mejor! 🚀
