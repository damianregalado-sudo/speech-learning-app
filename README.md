# 🎨 Aprendo a Hablar

Aplicación educativa interactiva para niños con retraso del habla, basada en técnicas avanzadas de desarrollo cognitivo y educación especial.

## ✨ Características MVP

### Módulo 1: Libro Interactivo para Colorear
- **Canvas interactivo**: Dibujos simples (gato, manzana, pelota, flor, plátano, caramelo)
- **Flood Fill avanzado**: Detección inteligente de áreas para colorear
- **6 colores básicos**: Rojo, azul, amarillo, verde, naranja, morado
- **Feedback multisensorial**:
  - 🔊 Sonidos con Web Audio API
  - ✨ Animaciones visuales
  - 💬 Narración con Text-to-Speech

### Características Técnicas
- **PWA (Progressive Web App)**: Funciona sin conexión
- **Almacenamiento Local**: Progreso guardado en `localStorage`
- **Mobile-First**: Completamente responsive
- **Accesibilidad**: WCAG AA compliant
- **Framework**: React 18 + Vite
- **Service Worker**: Offline-first

## 🚀 Instalación & Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar dev server (http://localhost:3000)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del Proyecto

```
speech-learning-app/
├── src/
│   ├── pages/
│   │   ├── Home.jsx (perfil del niño)
│   │   └── ColoringPage.jsx (módulo colorear)
│   ├── components/
│   │   ├── ColoringCanvas.jsx (canvas + flood fill)
│   │   ├── ColorPalette.jsx (selector de colores)
│   │   ├── ProgressBar.jsx (barra de progreso)
│   │   └── Narration.jsx (text-to-speech)
│   ├── utils/
│   │   └── floodFill.js (algoritmo flood fill)
│   ├── styles/ (CSS módular)
│   ├── App.jsx (router)
│   └── main.jsx (entry point)
├── public/
│   ├── index.html
│   ├── manifest.json (PWA)
│   └── service-worker.js (offline)
├── vite.config.js
└── package.json
```

## 🎯 Roadmap de Fases

- [x] **Fase 0**: Configuración de proyecto + PWA setup
- [x] **Fase 1**: Módulo colorear (Canvas + Flood Fill)
- [ ] **Fase 2**: Trazo de letras (motricidad fina)
- [ ] **Fase 3**: Pronunciación de sílabas (audio analysis)
- [ ] **Fase 4**: Lectura de palabras (decodificación)
- [ ] **Fase 5**: Narrativa simple (comprensión)

## 📊 Almacenamiento Local

Cada sesión se guarda en `localStorage` con esta estructura:

```json
{
  "childProfile": {
    "id": 1728236400000,
    "name": "Luisa",
    "age": 4,
    "createdAt": "2026-10-06T11:16:40Z"
  },
  "sessions": [
    {
      "date": "2026-10-06",
      "activity": "colorear",
      "accuracy": 85,
      "duration": 1200,
      "areasCompleted": 3
    }
  ]
}
```

## 🌐 Deploy en Vercel

```bash
# 1. Pushear a GitHub
git remote add origin https://github.com/TU_USUARIO/speech-learning-app.git
git branch -M main
git push -u origin main

# 2. En Vercel:
# - Conectar repo de GitHub
# - Framework: Vite
# - Build command: npm run build
# - Output directory: dist
# - Deploy!
```

## 🔊 APIs Utilizadas

- **Canvas API**: Dibujo y flood fill
- **Web Audio API**: Síntesis de sonidos (feedback)
- **Web Speech API**: Text-to-Speech (narración)
- **Service Worker API**: Offline-first
- **LocalStorage API**: Persistencia de datos

## 👨‍⚕️ Fundamentos Pedagógicos

Diseñado basado en:
- **Conciencia Fonológica** (Blachman, Torgesen)
- **Zona de Desarrollo Próximo** (Vygotsky)
- **Aprendizaje Multimodal** (Mayer)
- **Refuerzo Positivo Adaptativo** (Skinner)

## ♿ Accesibilidad

- Alto contraste
- Fuentes grandes
- Botones grandes (touch-friendly)
- Soporte para Screen Readers (ARIA labels)
- Navegación por teclado

## 📝 Licencia

MIT

## 👤 Autor

Creado con ❤️ para educación especial

---

**Estado**: MVP en desarrollo
**Última actualización**: 2026-10-06
