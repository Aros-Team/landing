# Landing Project

## Comandos

```bash
npm start          # Servidor de desarrollo (http://localhost:4200)
npm run build      # Build para producción
npm test           # Ejecutar tests
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── services/
│   │   ├── assistant.ts    # Servicio de chat/IA (mockeado)
│   │   └── email/email.ts  # Servicio de email (mockeado)
│   ├── chat/               # Componente de chat (Signals)
│   ├── project/            # Componente de proyecto
│   ├── collaborator/       # Componente de colaborador
│   └── top-bar/            # Barra superior (responsive + ScrollSpy)
├── environments/
│   └── environment.development.ts
└── index.html
```

## Configuración de APIs

Los servicios están configurados para consumir las siguientes APIs:

- **Assistant (Chat)**: `${apiBaseUrl}/chat`
- **Email (Lead)**: `${apiBaseUrl}/lead`

Donde `apiBaseUrl` está definido en `environment.development.ts` como:
```ts
apiBaseUrl: 'https://aros.services/api'
```

### Desarrollo

Los servicios están **mockeados** actualmente. Para activar las APIs reales, descomenta las líneas marcadas con `// TODO:` en:
- `src/app/services/assistant.ts`
- `src/app/services/email/email.ts`

### Producción

Cuando deployes, asegúrate de que las variables de entorno apunten a la URL correcta de tus microservicios.

## Imágenes

**Optimizar antes de producción:**

| Archivo | Tamaño actual | Tamaño recomendado |
|---------|---------------|-------------------|
| `public/Logo-chat-bot.png` | 2.9MB | <100KB (WebP) |
| `public/Proyecto-muestra.jpeg` | 153KB | ~50KB (WebP) |

## Convenciones

- Componentes standalone de Angular 21
- TypeScript strict mode
- **Signals** para estado reactivo (zoneless)
- Prefijo `app` para componentes
- Estilos: CSS plano (no SCSS)
- Testing: Jasmine + Karma

## Tech Stack

- Angular 21 (zoneless, signals)
- RxJS 7.8
- TypeScript 5.9
