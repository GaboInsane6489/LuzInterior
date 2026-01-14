# 07. GitHub Profile Masterclass: Tu Tarjeta de Presentación Senior

En el nivel Senior, tu perfil de GitHub no es solo un repositorio de código; es tu **marca personal**. Es lo primero que ven los reclutadores técnicos y otros desarrolladores. Un perfil cuidado denota profesionalismo, atención al detalle y pasión por tu trabajo.

## 1. El "Secreto": El Repositorio Especial

GitHub tiene una funcionalidad "oculta" (ya no tanto) llamada **Profile README**.

### Cómo activarlo:

1. Crea un **nuevo repositorio**.
2. Llámalo **exactamente igual que tu nombre de usuario**.
   - Ejemplo: Si tu usuario es `GaboInsane6489`, el repo debe ser `GaboInsane6489/GaboInsane6489`.
3. Asegúrate de que sea **Público**.
4. Marca la casilla "Initialize this repository with a README".

¡Bum! Ahora verás un banner verde diciendo que has descubierto el secreto. Todo lo que pongas en el `README.md` de este repositorio aparecerá en la parte superior de tu perfil.

## 2. Anatomía de un README Senior

No llenes esto de texto plano. Hazlo visual.

### A. Header / Banner

Usa una imagen de cabecera que te represente. Puede ser un diseño abstracto con tus colores favoritos o algo relacionado con código.

- **Herramienta recomendada**: Canva (dimensiones recomendadas: `1500x500px`).

### B. Introducción "Hook"

Un saludo breve y quién eres.

```markdown
# ¡Hola! Soy Gabo 👋

> Desarrollador Full Stack apasionado por React y arquitecturas escalables.
```

### C. Stack Tecnológico (Badges)

En lugar de listar "React, Node, Python", usa **Badges** (escudos). Le dan vida y color.

- **Recurso**: [Shields.io](https://shields.io/) o [Badges4-README.md-Profile](https://github.com/alexandresanlim/Badges4-README.md-Profile)

Ejemplo:

```markdown
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
```

### D. Estadísticas Dinámicas

Hay herramientas que generan gráficos de tu actividad en tiempo real. ¡Son imprescindibles!

**GitHub Readme Stats** (El estándar de oro):

```markdown
![Estadísticas de Gabo](https://github-readme-stats.vercel.app/api?username=GaboInsane6489&show_icons=true&theme=tokyonight)
```

_Tips:_ Puedes cambiar el `theme` para que combine con tus colores (ej: `dracula`, `dark`, `radical`).

**Top Languages**:

```markdown
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=GaboInsane6489&layout=compact&theme=tokyonight)
```

**Streak Stats** (Racha de contribuciones):

```markdown
![Streak](https://github-readme-streak-stats.herokuapp.com/?user=GaboInsane6489&theme=tokyonight)
```

## 3. Pined Repositories (Los "Pines")

Tienes 6 espacios para destacar repositorios. **Úsalos sabiamente**.

- **No pongas forks** (a menos que hayas hecho una contribución masiva).
- **No pongas "HolaMundo"**.
- Elige tus proyectos más complejos (como `LuzInterior`).
- **Truco Senior**: Edita la descripción de esos repositorios y añade emojis para que destaquen en la cuadrícula.

## 4. Actividad (El gráfico verde)

La constancia es clave. No necesitas tener todos los cuadros verdes, pero evita "desiertos" de inactividad de meses.

- Si trabajas en repos privados, asegúrate de activar **"Private contributions"** en la configuración de tu perfil para que cuenten en el gráfico.

## 5. Plantilla "Lista para Copiar"

Aquí tienes una estructura base para tu `README.md`. Solo cambia `TU_USUARIO`.

```markdown
<div align="center">
  <img src="URL_DE_TU_BANNER_AQUI" width="100%" />
  <h1>¡Hola, soy Gabo! 🚀</h1>
  <p>Construyendo experiencias web inmersivas y escalables.</p>

  <!-- Redes Sociales -->
  <a href="https://linkedin.com/in/tu-perfil">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="https://tu-portfolio.com">
    <img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white" />
  </a>
</div>

---

### 🛠️ Tech Stack

<div align="center">
  <!-- Agrega tus badges aquí -->
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</div>

<br />

### 📊 Mis Estadísticas

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=TU_USUARIO&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000" height="150" alt="stats graph"  />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USUARIO&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000" height="150" alt="languages graph" />
</div>

---

### 🔭 Trabajando actualmente en...

- **LuzInterior**: Una plataforma de bienestar integral.
- **[Otro Proyecto]**: Descripción corta.

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=TU_USUARIO&label=Profile%20Views&color=0e75b6&style=flat" alt="profile views" />
</div>
```

## Checklist Final

- [ ] Crear repo `usuario/usuario`.
- [ ] Crear banner personalizado.
- [ ] Elegir paleta de colores para los stats (que combine con el banner).
- [ ] Actualizar descripción y sitio web en la barra lateral izquierda del perfil.
