const BACKEND_URL = "https://taller6home.duckdns.org:8080";
const apiUrl = `${BACKEND_URL}/api/properties`;
let editingId = null;

// 📋 Listar propiedades
async function listProperties() {
  try {
    const res = await fetch(apiUrl, { credentials: "include" }); // 🔹 incluye cookies si tu backend usa sesión
    if (!res.ok) throw new Error('Error al obtener datos');

    const props = await res.json();
    const ul = document.getElementById('propertiesList');
    ul.innerHTML = '';

    if (!props.length) {
      ul.innerHTML = '<li>No hay propiedades registradas.</li>';
      return;
    }

    props.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${p.address}</strong> — $${p.price} — ${p.size} m²
        <div class="actions">
          <button onclick="view(${p.id})">Ver</button>
          <button onclick="edit(${p.id})">Editar</button>
          <button onclick="delProp(${p.id})">Borrar</button>
        </div>
      `;
      ul.appendChild(li);
    });
  } catch (err) {
    showMsg(err.message);
  }
}

// 🏗️ Crear / actualizar propiedad
document.getElementById('createForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fd = new FormData(e.target);
  const body = {
    address: fd.get('address'),
    price: parseFloat(fd.get('price')),
    size: parseFloat(fd.get('size')),
    description: fd.get('description')
  };

  const method = editingId ? 'PUT' : 'POST';
  const url = editingId ? `${apiUrl}/${editingId}` : apiUrl;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: "include", // 🔹 importante si tu backend usa cookies OAuth o CORS
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error('Error al guardar');

    showMsg(editingId ? '✅ Propiedad actualizada' : '✅ Propiedad creada');
    e.target.reset();
    editingId = null;
    document.getElementById('submitBtn').textContent = 'Crear';
    listProperties();
  } catch (err) {
    showMsg(err.message);
  }
});

// 🗑️ Eliminar
async function delProp(id) {
  if (!confirm('¿Seguro que deseas borrar este registro?')) return;
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      credentials: "include"
    });
    if (!res.ok) throw new Error('Error al eliminar');
    showMsg('🗑️ Propiedad eliminada');
    listProperties();
  } catch (err) {
    showMsg(err.message);
  }
}

// ✏️ Editar
async function edit(id) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, { credentials: "include" });
    if (!res.ok) throw new Error('No se pudo obtener el registro');

    const p = await res.json();
    document.getElementById('address').value = p.address;
    document.getElementById('price').value = p.price;
    document.getElementById('size').value = p.size;
    document.getElementById('description').value = p.description || '';

    editingId = id;
    document.getElementById('submitBtn').textContent = 'Actualizar';
    showMsg(`✏️ Editando registro #${id}`);
  } catch (err) {
    showMsg(err.message);
  }
}

// 🔍 Vista (temporal)
function view(id) {
  alert(`Detalle de la propiedad #${id} (por implementar)`);
}

// 📨 Mensajes
function showMsg(m) {
  const msg = document.getElementById('messages');
  msg.innerText = m;
  msg.style.opacity = 1;
  setTimeout(() => (msg.style.opacity = 0), 3000);
}

// 🚀 Cargar propiedades al iniciar
window.onload = listProperties;
