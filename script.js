/* ==========================================================
   EDITÁ SOLO ESTA PARTE PARA ACTUALIZAR LA PÁGINA
   ========================================================== */
const WHATSAPP = "5491121825254";
const PRECIOS_ACTUALIZADOS = "Octubre 2026"; // cambialo cuando toques los precios

// Precios de EJEMPLO: reemplazalos por los tuyos. Usá números sin puntos.
const PLANES = [
  { nombre: "Básica",   precio: 0, destacado: false,
    items: ["Sobre animado", "Cuenta regresiva", "Ubicación con mapa", "Confirmación por WhatsApp"] },
  { nombre: "Completa", precio: 0, destacado: true,
    items: ["Todo lo de Básica", "Música de fondo", "Galería de fotos", "Datos de regalos / alias"] },
  { nombre: "Premium",  precio: 0, destacado: false,
    items: ["Todo lo de Completa", "Álbum compartido con QR", "Diseño a medida", "Entrega prioritaria"] },
];

// Para agregar un modelo, sumá una línea. "tipo" puede ser: "bodas", "xv" o "infantiles".
const MODELOS = [
  { tipo: "xv",         nombre: "Mis XV Vanessa",  demo: "https://creaciones-ar.github.io/INVITACION-1/" },
  { tipo: "infantiles", nombre: "Mis 13 Liliana",  demo: "https://creaciones-ar.github.io/INVITACION-VANESSA/" },
];

const CATEGORIAS = [
  { id: "bodas",      titulo: "Bodas",      texto: "Para el día en que se dicen que sí." },
  { id: "xv",         titulo: "XV años",    texto: "Una entrada de película para la quinceañera." },
  { id: "infantiles", titulo: "Infantiles", texto: "Cumpleaños y fiestas con mucho color." },
];

const FAQ = [
  ["¿Cuánto tarda en estar lista?", "Escribinos con los datos del evento y te avisamos el plazo según la agenda del momento."],
  ["¿Cómo la reciben mis invitados?", "Te damos un link y lo reenviás por WhatsApp a todos, sin límite de invitados."],
  ["¿Puedo cambiar algo después?", "Sí, consultanos y lo ajustamos."],
  ["¿Cómo se paga?", "Coordinamos el pago por WhatsApp."],
];
/* ================== FIN DE LO EDITABLE ================== */

const wa = (txt) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
const pesos = (n) => n > 0 ? "$" + n.toLocaleString("es-AR") : "Consultar";

["hero", "footer", "flotante"].forEach(id =>
  document.getElementById("cta-" + id).href = wa("Hola Albys Cotillón! Quiero consultar por una invitación digital."));

document.getElementById("fecha-precios").textContent = "Precios actualizados: " + PRECIOS_ACTUALIZADOS;

const tarjeta = (m) => `
  <article class="modelo">
    <div class="celu"><iframe src="${m.demo}" title="Demo ${m.nombre}" loading="lazy"></iframe></div>
    <h3>${m.nombre}</h3>
    <a href="${m.demo}" target="_blank" rel="noopener">Abrir en pantalla completa</a><br>
    <a href="${wa('Hola! Me gusta el modelo ' + m.nombre + ', quiero una así.')}">Quiero este</a>
  </article>`;

document.getElementById("secciones").innerHTML = CATEGORIAS.map((c, i) => {
  const lista = MODELOS.filter(m => m.tipo === c.id);
  const cuerpo = lista.length
    ? lista.map(tarjeta).join("")
    : `<p class="vacio">Estamos preparando modelos de ${c.titulo.toLowerCase()}. <a href="${wa('Hola! Quiero ver modelos de ' + c.titulo.toLowerCase() + '.')}">Escribinos y te mostramos</a>.</p>`;
  return `<section id="${c.id}"${i % 2 ? ' class="alt"' : ""}>
    <h2>${c.titulo}</h2><p class="sub">${c.texto}</p>
    <div class="modelos">${cuerpo}</div></section>`;
}).join("");

document.getElementById("lista-planes").innerHTML = PLANES.map(p => `
  <article class="plan${p.destacado ? " destacado" : ""}">
    <h3>${p.nombre}</h3>
    <div class="precio">${pesos(p.precio)}</div>
    <ul>${p.items.map(i => `<li>${i}</li>`).join("")}</ul>
    <a class="btn" href="${wa('Hola! Me interesa el plan ' + p.nombre + '.')}">Elegir ${p.nombre}</a>
  </article>`).join("");

document.getElementById("lista-faq").innerHTML = FAQ.map(([q, a]) =>
  `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
