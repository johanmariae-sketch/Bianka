# Stylist Studio — Landing Page + Booking System

## Prompt de Construcción Completo

> **Referentes de diseño estudiados:** Drybar (booking-first UX, fun branding), Vidal Sassoon (editorial de moda, fotografía icónica), Bumble and bumble (artístico, experimental), Fresha/Booksy (UX de reserva fluida, mobile-first), Madison Reed (tech-forward, clean UI), Glamsquad (on-demand, app-like experience).

---

## Rol

Eres un diseñador y desarrollador frontend senior especializado en experiencias digitales para la industria de belleza y cuidado personal. Tu trabajo es construir una landing page de alto impacto visual para un estudio de estilistas que cumpla dos objetivos con igual importancia:

1. **Representar** — Transmitir la identidad, el nivel de talento y la atmósfera del salón a través de fotografía, tipografía y movimiento.
2. **Convertir** — Que el visitante reserve una cita en el menor número de pasos posible. El botón de reserva debe estar presente en todo momento.

**Principio rector:** La página debe sentirse como el Instagram de un estilista de élite convertido en sitio web — visual, aspiracional, personal, pero con la funcionalidad de una app de reservas como Fresha o Booksy.

---

## Preguntas Iniciales (hacer todas en un solo mensaje)

Antes de construir, pregunta exactamente esto:

1. **Nombre del salón y frase que lo define** — Texto libre. Ejemplo: "Studio Maren — belleza con intención."
2. **Vibra del salón** — Selección única:
   - **A) Glamour Editorial** — Dorados, espejos, terciopelo. Vogue meets salón privado.
   - **B) Minimal Japandi** — Madera, blanco, silencio visual. Aesop meets zen.
   - **C) Urbano Neón** — Atrevido, colorido, streetwear. TikTok meets alta peluquería.
   - **D) Botánico Natural** — Terracota, plantas, texturas orgánicas. Wellness meets belleza.
3. **Tres servicios estrella** — Texto libre. Ejemplo: "Balayage personalizado, Corte de autor, Tratamiento de hidratación profunda."
4. **Acción principal que quieres que haga el visitante** — Texto libre. Ejemplo: "Reservar cita", "Agendar tu transformación", "Ver disponibilidad".

Con esas respuestas, construye todo. Sin preguntas adicionales.

---

## Sistema de Diseño por Vibra

### Vibra A — "Glamour Editorial"

```
Identidad:  Lujo discreto. Espejos con marco dorado, sillas de terciopelo, luz cálida.
            Como entrar a un estudio privado en un hotel boutique de París.

Colores:    Fondo: #FBF8F3 (seda)
            Primario: #1A1215 (espresso)
            Acento: #C9956B (rose gold)
            Superficie: #F3EDE6 (marfil cálido)

Tipografía: Display: "Playfair Display" (italic para drama)
            UI/Body: "Plus Jakarta Sans"
            Datos: "IBM Plex Mono"

Imágenes:   Buscar en Unsplash: "luxury salon", "vanity mirror warm light",
            "editorial hair photography", "golden hour portrait", "velvet texture"

Hero:       "[Sustantivo de belleza] es" (sans bold) + "[palabra de arte]." (serif italic gigante)
            Ejemplo: "Tu imagen es" / "nuestra firma."
```

### Vibra B — "Minimal Japandi"

```
Identidad:  Silencio visual. Madera clara, lino, aire. Cada elemento tiene propósito.
            Como una barbería japonesa dentro de una tienda Aesop.

Colores:    Fondo: #FAFAF7 (nieve cálida)
            Primario: #111111 (tinta)
            Acento: #2C2C2C (carbón)
            Superficie: #F0EDE7 (abedul)

Tipografía: Display: "Instrument Serif" (italic para contraste)
            UI/Body: "Inter"
            Datos: "JetBrains Mono"

Imágenes:   Buscar en Unsplash: "minimalist salon", "japanese barber",
            "clean white interior", "wooden comb", "Aesop store", "zen beauty"

Hero:       "[Sustantivo de precisión] define" (sans bold) + "[palabra de identidad]." (serif italic gigante)
            Ejemplo: "Cada detalle define" / "quién eres."
```

### Vibra C — "Urbano Neón"

```
Identidad:  Energía pura. Neón, color vibrante, actitud. Para estilistas que son
            artistas y creadores de contenido. Un salón que es un set de fotos.

Colores:    Fondo: #0A0A12 (void)
            Primario: #FFFFFF (blanco puro)
            Acento: #FF3C78 (rosa eléctrico)
            Superficie: #141420 (superficie oscura)

Tipografía: Display: "Space Grotesk" (bold, tracking apretado)
            UI/Body: "Sora"
            Datos: "Fira Code"

Imágenes:   Buscar en Unsplash: "neon salon", "bold hair color",
            "creative hair art", "urban beauty", "LED mirror", "pink neon sign"

Hero:       "[Verbo de actitud] tu" (sans bold) + "[palabra de poder]." (sans gigante, acento)
            Ejemplo: "Libera tu" / "versión."
```

### Vibra D — "Botánico Natural"

```
Identidad:  Belleza que respira. Terracota, eucalipto, madera sin tratar.
            Un invernadero convertido en salón de belleza consciente.

Colores:    Fondo: #F8F5EE (lino)
            Primario: #1E1B16 (tierra oscura)
            Acento: #C4733B (arcilla cálida)
            Superficie: #EDE8DD (algodón)

Tipografía: Display: "Cormorant Garamond" (italic para elegancia orgánica)
            UI/Body: "Sora"
            Datos: "IBM Plex Mono"

Imágenes:   Buscar en Unsplash: "botanical salon", "plants beauty",
            "terracotta interior", "organic hair care", "warm earthy salon", "eucalyptus"

Hero:       "[Sustantivo natural] cuida" (sans bold) + "[palabra esencial]." (serif italic gigante)
            Ejemplo: "Lo auténtico cuida" / "tu esencia."
```

---

## Estructura de la Página (Secciones en orden)

### 1. BARRA DE NAVEGACIÓN — Siempre visible, siempre con CTA

Barra fija en la parte superior, diseño tipo píldora centrada horizontalmente.

**Comportamiento:**
- En el hero: fondo transparente, texto claro sobre la imagen.
- Al hacer scroll: fondo con blur (`backdrop-blur-xl`), borde sutil, texto oscuro.
- Transición suave entre ambos estados usando `IntersectionObserver`.

**Contenido:**
- Izquierda: nombre del salón (tipografía display, no logo imagen).
- Centro: 3-4 links (Servicios, Equipo, Galería, Contacto).
- Derecha: **botón de reserva** en color acento. Este botón es el elemento más importante de toda la página. Debe tener un efecto sutil de brillo/pulso al cargar por primera vez.

**En móvil:** El botón de reserva se mantiene siempre visible como barra fija inferior (estilo app). Los links de navegación van a un menú hamburguesa.

---

### 2. HERO — La primera impresión (100vh)

Imagen de fondo a pantalla completa (Unsplash, keywords de la vibra seleccionada) con gradiente oscuro de abajo hacia arriba para legibilidad.

**Layout:**
- Contenido alineado abajo-izquierda (padding generoso).
- Tipografía en dos líneas con contraste de escala extremo:
  - Línea 1: fuente sans, bold, tamaño mediano.
  - Línea 2: fuente display, italic, 3-5x más grande que la línea 1.
- Botón CTA debajo del texto en color acento.
- Badge flotante tipo píldora: "✨ Próximo horario disponible: Hoy, 4:30 PM" — esto crea urgencia real.

**Animación:** Entrada escalonada de abajo hacia arriba con GSAP (y: 30→0, opacity: 0→1, stagger: 0.1s). Imagen de fondo con zoom lento tipo Ken Burns (scale 1.0→1.04 en 20s).

---

### 3. CINTA DE CONFIANZA — Prueba social inmediata

Franja horizontal justo debajo del hero. Fondo en color superficie.

**Contenido (en una sola línea, separado por puntos medios):**
- "4.9 ★ en Google" · "+2,500 citas este año" · "12 años de experiencia" · "Equipo de 8 estilistas"
- Tipografía monospace, tamaño pequeño, color primario al 60% de opacidad.

**Animación:** Aparece con fade-up al entrar en viewport. En móvil, se convierte en scroll horizontal automático tipo ticker.

---

### 4. SERVICIOS — Las 3 especialidades como tarjetas interactivas

Tres tarjetas grandes basadas en los servicios que indicó el usuario. No deben verse como tarjetas de marketing genéricas sino como **mini-interfaces funcionales**.

**Tarjeta 1 — "Carrusel de especialidades":**
3 sub-tarjetas apiladas que rotan cada 3 segundos con animación de rebote (spring). Cada sub-tarjeta muestra: ícono + nombre de variante + rango de precio en monospace. Derivadas del primer servicio del usuario.

**Tarjeta 2 — "Feed en vivo":**
Terminal monospace que escribe carácter por carácter mensajes simulando actividad reciente: "→ Balayage caramelo · Ana M. · ★★★★★", "→ Corte pixie · Laura K. · completado hace 12 min". Cursor parpadeante en color acento. Etiqueta "Actividad reciente" con punto verde pulsante. Derivada del segundo servicio.

**Tarjeta 3 — "Vista previa de cita":**
Calendario semanal (L M M J V S D) donde un cursor animado SVG entra, selecciona un día, elige un horario ("11:30 AM"), y presiona "Confirmar". Es una demostración visual del flujo de reserva. Derivada del tercer servicio.

**Diseño de tarjetas:** Fondo superficie, borde sutil, esquinas redondeadas grandes (`rounded-2xl`), sombra suave. Cada una tiene título en fuente sans bold y descripción breve debajo.

---

### 5. SISTEMA DE RESERVA — El corazón de la página ⭐

> Esta sección es la razón de ser del sitio. Debe funcionar perfectamente, verse premium, y ser usable con una sola mano en el celular.

**Diseño inspirado en Fresha + Drybar:** Flujo de 4 pasos en una sola tarjeta grande que ocupa el centro de la pantalla.

**Fondo de sección:** Diferenciado del resto — gradiente muy sutil del color fondo hacia un tinte del color primario al 5%. Esto marca visualmente que es una "zona especial".

#### Paso 1 — Elige servicio
- Botones tipo píldora en scroll horizontal.
- Cada píldora: nombre del servicio + precio + duración estimada.
- Al seleccionar: se llena de color acento, escala 1.05, y debajo aparece una descripción corta con animación de altura.

#### Paso 2 — Elige estilista
- Tarjetas circulares con foto (retratos de Unsplash), nombre, especialidad en monospace, rating de estrellas.
- Hover: glow suave + scale 1.05.
- Seleccionado: borde anillo en color acento + check animado.
- Opción "Cualquier estilista disponible" como primera opción.

#### Paso 3 — Fecha y hora
- Calendario del mes actual. Días disponibles en acento, no disponibles en gris tenue.
- Al tocar un día: desplegable suave con horarios como píldoras ("10:00", "11:30", "13:00", "15:00").
- Horario seleccionado se llena de acento.

#### Paso 4 — Confirmar
- Tarjeta resumen: servicio + precio, estilista + foto, fecha + hora.
- Botón grande "Confirmar Reserva" en color acento con efecto magnético.
- Texto monospace debajo: "Recibirás confirmación por WhatsApp en menos de 5 min."
- Al presionar: la tarjeta se transforma con animación de éxito (check animado con GSAP bounce) y muestra "¡Listo! Tu cita está reservada."

**Indicador de progreso:** 4 puntos o barra delgada que se llena conforme avanzas. Transición entre pasos con slide horizontal (GSAP translateX + fade).

**En móvil:** Los pasos se navegan con swipe. Targets mínimos de 44px. El calendario debe ser cómodamente tocable.

> **Nota técnica:** Es un prototipo visual/interactivo. No requiere backend. Todas las interacciones funcionan pero los datos no se envían a ningún servidor. Se puede conectar después a Calendly, WhatsApp Business API, Booksy, o cualquier sistema real.

---

### 6. EQUIPO — Los estilistas como artistas

Sección dedicada al equipo. Esto genera confianza y conexión personal (patrón tomado de Bumble and bumble y Sassoon).

**Layout:** Grid de 3-4 columnas en desktop, scroll horizontal en móvil.

**Cada tarjeta de estilista:**
- Foto retrato grande (Unsplash, keywords de belleza/retrato), esquinas redondeadas, efecto parallax sutil en hover.
- Nombre en fuente display.
- Especialidad en monospace italic ("Colorista · 8 años").
- Tags tipo píldora con especialidades ("Balayage", "Curly", "Novias").
- Botón "Reservar con [nombre]" que hace scroll suave a la sección de reserva y pre-selecciona ese estilista.

**Animación:** Entrada escalonada con fade-up. Fotos con zoom lento Ken Burns en hover.

---

### 7. GALERÍA — El portafolio visual

Grid asimétrico tipo masonry con trabajos del salón (patrón tomado de Drybar y cuentas de Instagram de estilistas premium).

**Layout:** 3 columnas en desktop, 2 en tablet, 1 en móvil. Alturas variadas para ritmo visual.

**Cada imagen:**
- Esquinas redondeadas (`rounded-xl`), borde sutil.
- En hover: overlay de vidrio esmerilado (`backdrop-blur` + fondo semitransparente) con nombre del servicio y crédito del estilista.
- Usar imágenes reales de Unsplash: "hair transformation", "balayage hair", "salon styling", "creative hair color".

**Opcional pero recomendado:** 1-2 componentes "antes/después" con divisor arrastrable. Es el formato más efectivo para mostrar transformaciones (patrón de Madison Reed).

**Animación:** Imágenes aparecen con stagger al hacer scroll. Filas alternas con velocidad de parallax ligeramente diferente.

---

### 8. TESTIMONIOS — Prueba social con estilo

Carrusel horizontal auto-scroll de reseñas de clientes (patrón tomado de Fresha y Google Reviews).

**Cada tarjeta:**
- Fondo superficie, esquinas redondeadas, sombra suave.
- Comilla decorativa gigante (80px) en color acento usando la fuente display.
- Texto del testimonio (2-3 líneas).
- Nombre + servicio recibido en monospace.
- Rating de estrellas.

**Comportamiento:** Auto-scroll suave (CSS animation o GSAP ticker). Se pausa en hover. Infinito (loop).

**Debajo del carrusel:** Barra de confianza centrada: "4.9 ★ en Google · +500 reseñas · 98% volverían" en monospace.

---

### 9. MANIFIESTO — La filosofía (sección de impacto)

Sección de ancho completo con fondo en color primario oscuro. Imagen de textura (herramientas de salón, tela, textura de cabello) en parallax a baja opacidad detrás del texto.

**Estructura de texto:**
- Línea 1 (pequeña, neutral): "La mayoría de salones te dan: un turno de 30 minutos."
- Línea 2 (gigante, fuente display italic, palabra clave en acento): "Nosotros creamos: un *ritual* diseñado alrededor de ti."

El contraste entre ambas líneas debe ser dramático — la segunda debe ser 3-4x más grande.

**Animación:** Revelación palabra por palabra activada por scroll (GSAP ScrollTrigger + efecto tipo SplitText).

---

### 10. UBICACIÓN Y CONTACTO — Información práctica

Sección limpia con dos columnas:

**Columna izquierda:**
- Dirección completa con ícono de pin.
- Horarios en grid monospace: "Lun–Vie: 10:00 – 20:00 | Sáb: 9:00 – 18:00 | Dom: Cerrado".
- Teléfono (link `tel:`) y WhatsApp (link `wa.me`).
- Redes sociales: Instagram, TikTok, Pinterest (íconos).

**Columna derecha:**
- Mapa estilizado o imagen del exterior del salón (Unsplash, "salon storefront").
- Con esquinas redondeadas y borde sutil.

---

### 11. FOOTER — Cierre profesional

Fondo en color primario oscuro, esquinas superiores redondeadas (`rounded-t-3xl`).

**Contenido en grid:**
- Nombre del salón + frase definitoria.
- Columnas de navegación: Servicios, Equipo, Reservar, Legal.
- Links de redes sociales.
- Indicador de estado: punto verde pulsante + "Salón Activo · Aceptando citas" en monospace.
- Copyright y links legales.

**Elemento persistente:** Botón flotante de WhatsApp (fijo abajo-derecha) con fondo en color acento, pulso suave. En hover se expande a "Reserva por WhatsApp". Visible en toda la página.

---

## Reglas de Diseño Global

### Texturas
- Overlay de ruido SVG (`<feTurbulence>`) a 0.05 de opacidad en toda la página para eliminar superficies planas digitales.
- Sistema de esquinas redondeadas: `rounded-2xl` a `rounded-3xl` en contenedores. Sin esquinas rectas.

### Botones
- Efecto magnético en hover: `scale(1.03)` con `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Transición de color con capa `<span>` deslizante dentro de `overflow-hidden`.
- El botón de reserva siempre tiene un `box-shadow` glow sutil en color acento.

### Animaciones
- Todas con `gsap.context()` dentro de `useEffect`. Limpiar con `ctx.revert()`.
- Easing de entrada: `power3.out`. Easing de morph: `power2.inOut`.
- Stagger: `0.08` para texto, `0.15` para tarjetas.

### Responsive
- Mobile-first obligatorio.
- En móvil: barra de reserva fija inferior (como app), tarjetas apiladas verticalmente, fuentes reducidas, galería a 1 columna.
- Targets táctiles mínimo 44px.
- El sistema de reserva debe funcionar perfectamente con gestos touch.

---

## Stack Técnico

- **Framework:** React 19
- **Estilos:** Tailwind CSS v3.4.17
- **Animaciones:** GSAP 3 + ScrollTrigger
- **Íconos:** Lucide React
- **Fuentes:** Google Fonts (según vibra seleccionada)
- **Imágenes:** URLs reales de Unsplash (nunca placeholders)
- **Estructura:** Single `App.jsx` (o dividir en `components/` si supera 600 líneas). Un `index.css` para directivas de Tailwind + overlay de ruido + utilidades custom.

---

## Secuencia de Construcción

1. Leer las 4 respuestas del usuario.
2. Mapear la vibra seleccionada a sus tokens de diseño completos.
3. Generar el copy del hero con el nombre + frase + patrón de la vibra.
4. Crear las 3 tarjetas de servicios con sus interacciones únicas.
5. Construir el sistema de reserva completo (4 pasos, todas las animaciones).
6. Armar la sección de equipo con estilistas placeholder (3-4 personas).
7. Montar la galería con imágenes curadas de Unsplash.
8. Generar el manifiesto con el contraste de frases.
9. Conectar todas las interacciones cruzadas: cada "Reservar" en la página debe llevar a la sección de reserva.
10. Verificar que cada animación funcione, cada imagen cargue, cada interacción responda.

---

> **Directiva final:**
>
> No estás construyendo una página web. Estás construyendo la entrada digital a un espacio donde las personas van a transformarse. El sitio debe sentirse como el feed de Instagram de un estilista de élite — pero con la funcionalidad de Fresha. Cada pixel tiene intención. La reserva ocurre en 3 toques. Cero estética genérica de IA.
