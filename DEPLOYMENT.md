# 🚀 Deploy a Vercel

## Opción 1: Deploy Automático (Recomendado)

### Paso 1: Pushear a GitHub

```bash
# Crear repositorio en GitHub (https://github.com/new)
# Llamarlo: speech-learning-app

cd /home/damian/speech-learning-app

# Conectar repo remoto
git remote add origin https://github.com/TU_USUARIO/speech-learning-app.git
git branch -M main
git push -u origin main
```

### Paso 2: Deploy en Vercel

1. Ir a https://vercel.com/new
2. Hacer login con GitHub
3. Seleccionar el repo `speech-learning-app`
4. Vercel detectará automáticamente:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click en "Deploy"
6. ¡Listo! Tu app estará en `https://speech-learning-app.vercel.app` (o similar)

---

## Opción 2: Deploy Manual desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd /home/damian/speech-learning-app
vercel

# Seguir las instrucciones interactivas
```

---

## URLs y Configuraciones

### Production URL
```
https://speech-learning-app.vercel.app
```

### Environment Variables (si necesitas)
Crear en Vercel Dashboard → Settings → Environment Variables:
```
VITE_API_BASE_URL=https://speech-learning-app.vercel.app
```

### Build Settings (Vercel detecta automáticamente)
```
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

---

## Funcionalidades PWA (Offline-First)

Después del deploy, la app:
- ✅ Funciona sin conexión (gracias al Service Worker)
- ✅ Es instalable como app nativa
- ✅ Guarda progreso en localStorage (no se sincroniza con servidor)
- ✅ Se actualiza automáticamente con nuevas versiones

---

## Testing Pre-Deploy

Antes de hacer push a GitHub:

```bash
# Test local
npm run dev
# Visitar http://localhost:3000

# Build test
npm run build
npm run preview
# Visitar http://localhost:4173

# Verificar que funciona offline:
# 1. Abrir DevTools (F12)
# 2. Network tab → Throttle a "Offline"
# 3. Recargar página
# 4. Debe funcionar normalmente
```

---

## Troubleshooting

### Error: "Cannot find module 'src/main.jsx'"
- Solución: `npm install` nuevamente

### Build falla en Vercel
- Verificar que `package.json` tenga `"type": "module"`
- Verificar que `dist/` no esté en `.gitignore`

### Service Worker no registra
- Revisar que `service-worker.js` está en la raíz
- Revisar console de DevTools (F12 → Console)

---

## Próximos Pasos

1. ✅ Deploy en Vercel
2. ⬜ Agregar módulo de "Trazo de Letras"
3. ⬜ Agregar "Pronunciación de Sílabas"
4. ⬜ Agregar "Lectura de Palabras"
5. ⬜ Dashboard de reportes para padres

---

**Repo**: https://github.com/TU_USUARIO/speech-learning-app
**Vercel**: https://vercel.com/dashboard
**Docs PWA**: https://web.dev/progressive-web-apps/
