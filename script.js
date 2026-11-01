/* ==========================================================
   EDITÁ SOLO ESTA PARTE PARA ACTUALIZAR LA PÁGINA
   ========================================================== */
const WHATSAPP = "5491121825254";
const PRECIOS_ACTUALIZADOS = "Octubre 2026"; // cambialo cuando toques los precios

// Precios de EJEMPLO: reemplazalos por los tuyos. Usá números sin puntos.
// "descuento" y "nota" son opcionales (dejalos "" si no los querés).
const PLANES = [
  { nombre: "Básica",   precio: 0, descuento: "", destacado: false, nota: "Señá con el 50% y asegurá tu invitación.",
    items: ["Sobre animado", "Cuenta regresiva", "Ubicación con mapa", "Confirmación por WhatsApp"] },
  { nombre: "Completa", precio: 0, descuento: "", destacado: true, nota: "Señá con el 50% y asegurá tu invitación.",
    items: ["Todo lo de Básica", "Música de fondo", "Galería de fotos", "Datos de regalos / alias"] },
  { nombre: "Premium",  precio: 0, descuento: "", destacado: false, nota: "Señá con el 50% y asegurá tu invitación.",
    items: ["Todo lo de Completa", "Álbum compartido con QR", "Diseño a medida", "Entrega prioritaria"] },
];

// Para agregar un modelo, sumá una línea. "tipo": "bodas", "xv" o "infantiles". "img" (opcional): captura para la portada del celular.
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
    <div class="celu">
      <div class="portada"${m.img ? ` style="background-image:url('${m.img}')"` : ""}>
        <img src="logo.png" alt="" width="90" height="90">
        <button class="probar" type="button" data-demo="${m.demo}">▶ Tocá para probar</button>
      </div>
      <iframe title="Demo ${m.nombre}" allow="autoplay" hidden></iframe>
    </div>
    <h3>${m.nombre}</h3>
    <a href="${m.demo}" target="_blank" rel="noopener">Abrir en pantalla completa</a><br>
    <a href="${wa('Hola! Me gusta el modelo ' + m.nombre + ', quiero una así.')}">Quiero este</a>
  </article>`;

document.getElementById("secciones").innerHTML = CATEGORIAS.map((c, i) => {
  const lista = MODELOS.filter(m => m.tipo === c.id);
  const cuerpo = lista.length
    ? `<div class="carrusel"><button class="flecha" data-dir="-1" aria-label="Anterior">‹</button>
       <div class="pista">${lista.map(tarjeta).join("")}</div>
       <button class="flecha" data-dir="1" aria-label="Siguiente">›</button></div>`
    : `<p class="vacio">Estamos preparando modelos de ${c.titulo.toLowerCase()}. <a href="${wa('Hola! Quiero ver modelos de ' + c.titulo.toLowerCase() + '.')}">Escribinos y te mostramos</a>.</p>`;
  return `<section id="${c.id}"${i % 2 ? ' class="alt"' : ""}>
    <h2>${c.titulo}</h2><p class="sub">${c.texto}</p>${cuerpo}</section>`;
}).join("");

/* Carrusel: flechas */
document.querySelectorAll(".carrusel").forEach(car => {
  const pista = car.querySelector(".pista");
  car.querySelectorAll(".flecha").forEach(f => f.onclick = () =>
    pista.scrollBy({ left: f.dataset.dir * pista.clientWidth * 0.8, behavior: "smooth" }));
  const ajustar = () => car.classList.toggle("sin-scroll", pista.scrollWidth <= pista.clientWidth + 4);
  ajustar(); addEventListener("resize", ajustar);
});

/* Demos: solo suena una a la vez y se apagan al salir de pantalla */
const parar = (celu) => {
  const fr = celu.querySelector("iframe");
  if (fr.hidden) return;
  fr.src = "about:blank"; fr.hidden = true;
  celu.querySelector(".portada").hidden = false;
};
const pararTodas = () => document.querySelectorAll(".celu").forEach(parar);
document.querySelectorAll(".probar").forEach(btn => btn.onclick = () => {
  const celu = btn.closest(".celu");
  pararTodas();
  const fr = celu.querySelector("iframe");
  fr.src = btn.dataset.demo; fr.hidden = false;
  celu.querySelector(".portada").hidden = true;
});
const vigia = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) parar(e.target); }), { threshold: 0.4 });
document.querySelectorAll(".celu").forEach(c => vigia.observe(c));
document.addEventListener("visibilitychange", () => { if (document.hidden) pararTodas(); });

document.getElementById("lista-planes").innerHTML = PLANES.map(p => `
  <article class="plan${p.destacado ? " destacado" : ""}">
    <h3>MODELO <em>${p.nombre.toUpperCase()}</em></h3>
    <div class="precio">${pesos(p.precio)}${p.descuento ? ` <small>${p.descuento}</small>` : ""}</div>
    <ul>${p.items.map(i => `<li>${i}</li>`).join("")}</ul>
    <a class="btn" href="${wa('Hola! Quiero señar el plan ' + p.nombre + '.')}">Quiero señar el 50%</a>
    ${p.nota ? `<p class="nota">${p.nota}</p>` : ""}
  </article>`).join("");

document.getElementById("lista-faq").innerHTML = FAQ.map(([q, a]) =>
  `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
