const API_URL = "https://taller6home.org:8443/api/properties";
const BACKEND_URL = "https://taller6home.duckdns.org:8443";

let currentPage = 0;
const pageSize = 5;

function showSuccess(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "green",
    }).showToast();
}

function showError(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
    }).showToast();
}

async function loadProperties(page = currentPage, size = pageSize) {
    const token = localStorage.getItem("token");
    try {
            const response = await fetch(`${API_URL}/paged?page=${page}&size=${size}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
	const propertiesPage = await response.json();
        const propertyList = document.getElementById("propertyList");
        propertyList.innerHTML = "";

        propertiesPage.content.forEach(property => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${property.address}</strong><br>
                Price: $${property.price}<br>
                Size: ${property.size} sqft<br>
                Description: ${property.description}<br>
                <button onclick="updateProperty(${property.id})">Update</button>
                <button onclick="deleteProperty(${property.id})">Delete</button>
            `;
            propertyList.appendChild(li);
        });

        // Actualizar la información de la página
        document.getElementById("pageInfo").textContent = `Página ${propertiesPage.number + 1} de ${propertiesPage.totalPages}`;
        currentPage = propertiesPage.number;

        // Habilitar/deshabilitar botones de paginación
        document.getElementById("prevPage").disabled = propertiesPage.first;
        document.getElementById("nextPage").disabled = propertiesPage.last;

        } catch (error) {
            console.error("Error loading properties:", error);
            showError("Failed to load properties.");
        }
}

// Manejar el formulario de búsqueda
document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const searchAddress = document.getElementById("searchAddress").value;
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;
    const minSize = document.getElementById("minSize").value;
    const maxSize = document.getElementById("maxSize").value;

    try {
        const response = await fetch(`${API_URL}/search?address=${searchAddress}&minPrice=${minPrice}&maxPrice=${maxPrice}&minSize=${minSize}&maxSize=${maxSize}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const properties = await response.json();
        const propertyList = document.getElementById("propertyList");
        propertyList.innerHTML = "";

        properties.forEach(property => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${property.address}</strong><br>
                Price: $${property.price}<br>
                Size: ${property.size} sqft<br>
                Description: ${property.description}<br>
                <button onclick="updateProperty(${property.id})">Update</button>
                <button onclick="deleteProperty(${property.id})">Delete</button>
            `;
            propertyList.appendChild(li);
        });
    } catch (error) {
        console.error("Error searching properties:", error);
        showError("Failed to search properties.");
    }
});

document.getElementById("propertyForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const property = {
        address: document.getElementById("address").value,
        price: parseFloat(document.getElementById("price").value),
        size: parseFloat(document.getElementById("size").value),
        description: document.getElementById("description").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(property)
        });
        if (response.ok) {
            showSuccess("Property added successfully!");
            loadProperties();
        } else {
            throw new Error("Failed to add property.");
        }
    } catch (error) {
        showError("Failed to add property.");
        console.error("Error adding property:", error);
    }
});

async function updateProperty(id) {
    const token = localStorage.getItem("token");

    const newAddress = prompt("Enter new address:");
    const newPrice = parseFloat(prompt("Enter new price:"));
    const newSize = parseFloat(prompt("Enter new size:"));
    const newDescription = prompt("Enter new description:");

    const updatedProperty = {
        address: newAddress,
        price: newPrice,
        size: newSize,
        description: newDescription
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedProperty)
                });
        if (response.ok) {
            showSuccess("Property updated successfully!");
            loadProperties();
        }
    } catch (error) {
        showError("Failed to update property.");
        console.error("Error updating property:", error);
    }
}

async function deleteProperty(id) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            showSuccess("Property deleted successfully!");
            loadProperties();
        } else {
            throw new Error("Failed to delete property.");
        }
    } catch (error) {
        showError("Failed to delete property.");
        console.error("Error deleting property:", error);
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "index.html";
    } else {
        loadProperties();
    }
});
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 0) {
        loadProperties(currentPage - 1);
    }
});

// Manejar el clic en el botón "Siguiente"
document.getElementById("nextPage").addEventListener("click", () => {
    loadProperties(currentPage + 1);
});