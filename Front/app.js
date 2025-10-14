

const apiUrl = '/api/properties';
let editingId = null; 


async function listProperties() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Error al obtener datos');

    const props = await res.json();
    const ul = document.getElementById('propertiesList');
    ul.innerHTML = '';

    if (props.length === 0) {
      ul.innerHTML = '<li>No hay propiedades registradas.</li>';
      return;
    }

    props.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${p.address}</strong> — $${p.price} — ${p.size} m²
        <button onclick="view(${p.id})">Ver</button>
        <button onclick="edit(${p.id})">Editar</button>
        <button onclick="delProp(${p.id})">Borrar</button>
      `;
      ul.appendChild(li);
    });
  } catch (err) {
    showMsg(err.message);
  }
}


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


async function delProp(id) {
  if (!confirm('¿Seguro que deseas borrar este registro?')) return;
  try {
    const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar');
    showMsg('🗑️ Propiedad eliminada');
    listProperties();
  } catch (err) {
    showMsg(err.message);
  }
}


async function edit(id) {
  try {
    const res = await fetch(`${apiUrl}/${id}`);
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


function view(id) {
  alert(`Detalle de la propiedad #${id} (puedes implementarlo más adelante)`);
}


function showMsg(m) {
  const msg = document.getElementById('messages');
  msg.innerText = m;
  msg.style.opacity = 1;
  setTimeout(() => (msg.style.opacity = 0), 3000);
}


window.onload = listProperties;
