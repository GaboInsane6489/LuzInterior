# 01. Core Features del Producto

> Este documento define **qué construimos**, **qué no**, y **en qué orden**.
> Es la traducción directa de la visión a funcionalidades concretas.

Si una idea no encaja aquí, **no se implementa**.

---

## 🎯 Objetivo del Producto

Construir una plataforma que ayude a las personas a **reconstruirse** mediante:

- estructura diaria
- progreso visible
- disciplina sostenida
- validación del esfuerzo real
- comunidad bien diseñada

No buscamos engagement artificial.
Buscamos **cambio real**.

---

## 🧱 Principios de Diseño de Features

Toda feature debe cumplir al menos uno:

1. Generar **acción**
2. Hacer el progreso **visible**
3. Reforzar la **disciplina**
4. Facilitar **responsabilidad**

Si no cumple ninguno → se descarta.

---

## 🟢 MVP — Core Absoluto

Estas features hacen que el producto **funcione**.
Sin ellas, no hay sistema.

### 1. Autenticación

**Descripción**

- Login vía OAuth (Google)
- Sesión persistente

**Por qué existe**

- Identidad
- Persistencia de progreso

---

### 2. Perfil de Usuario (Profile)

**Incluye**

- Avatar
- Bio breve
- Nivel
- XP
- Historial de actividad

**Reglas**

- Público por defecto
- Editable solo por el dueño

---

### 3. Dojo (Dashboard Personal)

**Incluye**

- Estado actual (nivel, XP, racha)
- Retos activos
- Historial reciente

**Objetivo**

- Mostrar progreso de forma inmediata

---

### 4. Sistema de Retos

**Tipos**

- Diarios
- Por ciclos (7, 14, 21 días)

**Flujo**

1. Usuario se une
2. Realiza acción
3. Marca como completado

**Validación**

- MVP: self-reported

---

### 5. XP, Niveles y Rachas

**XP**

- Se gana por completar retos
- Se acumula

**Nivel**

- Derivado del XP

**Rachas**

- Refuerzan constancia
- Se rompen si no hay acción

---

### 6. Logros (Achievements)

**Características**

- Condiciones claras
- Visuales simples
- XP asociado

**Ejemplos**

- 7 días seguidos
- Primer reto completado

---

## 🟡 Fase Intermedia — Profundización

Features que **mejoran** el sistema, pero no lo sostienen.

### 7. Validación Comunitaria (Evolución Social)

- **Objetivo**: Reemplazar la "prueba de imagen" obligatoria por validación social.
- **Mecánica**:
  - Usuarios de alto nivel (tutores/guerreros) validan el progreso de los iniciados.
  - "Honor" como moneda social: dar feedback útil otorga XP al validador.
- **Reduce fraude**: El ojo humano es mejor filtro que un script.
- **Refuerza comunidad**: Crea mentores naturales.

---

### 8. Mini-Juegos de Enfoque (Gamificación Saludable)

**Concepto**
Herramientas interactivas para entrenar la mente, no para perder el tiempo.

**Ejemplos**

1. **Zen Focus**: Mantener la pantalla sin tocar durante X minutos (meditación digital).
2. **Katana Reflex**: Ejercicios de ritmo y reacción para activar el estado de flujo.
3. **Respiración Consciente**: Guías visuales sincronizadas.

**Propósito**

- Ganar XP diario sin necesidad de subir contenido multimedia.
- Entrenar la disciplina mental in-app.
- Alternativa para usuarios que valoran la privacidad.

---

### 9. Notificaciones (Sistema Nervioso)

**Canales**

- Email
- In-app

**Uso**

- Recordatorios
- Confirmaciones
- Feedback

---

### 10. Rankings (Opt-in)

- Por disciplina
- Por constancia

Nunca por ego.

---

### 11. Dojos / Equipos

- Grupos privados
- Objetivos compartidos
- Progreso colectivo

---

## 🔴 Largo Plazo — Expansión

Features que convierten la plataforma en un **ecosistema**.

### 12. Mentorías

- Usuarios avanzados
- Feedback estructurado
- Acompañamiento

---

### 13. Inteligencia Artificial

- Análisis de journaling
- Recomendaciones
- Insights personalizados

---

### 14. App Móvil

- Notificaciones push
- Uso diario

---

### 15. Integraciones Externas

- WhatsApp
- Instagram
- LinkedIn
- GitHub

---

## ❌ Features Deliberadamente Excluidas

Estas **no se implementan**, aunque sean populares:

- Feed infinito
- Likes
- Métricas de vanidad
- Mensajería caótica
- Gamificación infantil

---

## 🧠 Control de Scope

Antes de implementar cualquier feature, responder:

1. ¿Qué problema real soluciona?
2. ¿Genera acción o solo consumo?
3. ¿A quién beneficia realmente?

Si no hay respuesta clara → no se hace.

---

## 🧭 Relación con Arquitectura

Toda feature:

- Respeta los roles definidos
- Usa RLS como fuente de verdad
- Mantiene simplicidad técnica

Ver:

- `/docs/architecture/01--business--and-technical-vision.md`
- `/docs/architecture/02--system--roles.md`

---

## 🧠 Nota Final

Este documento es un **filtro**.

Protege el proyecto del ruido,
la prisa,
y la pérdida de identidad.

Si una feature compromete la filosofía,
no se implementa.

---

**Mi Luz Interior no crece rápido.
Crece bien.**
