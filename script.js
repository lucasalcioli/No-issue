document.addEventListener("DOMContentLoaded", function() {
    loadOrders();
});

// Transizione dalla schermata iniziale a quella secondaria
document.getElementById("enterSite").addEventListener("click", function () {
    document.getElementById("introScreen").style.display = 'none';
    document.getElementById("mainContent").style.display = 'block';
});

// Gestione del pre-ordine e generazione codice univoco
document.getElementById("submitOrder").addEventListener("click", function () {
    const color = document.getElementById("color").value;
    const size = document.getElementById("size").value;
    const street = document.getElementById("street").value;
    const zip = document.getElementById("zip").value;
    const city = document.getElementById("city").value;

    if (!street || !zip || !city) {
        alert("Inserisci tutti i dati di spedizione.");
        return;
    }

    const uniqueCode = generateUniqueCode();
    const newOrder = {
        color: color,
        size: size,
        street: street,
        zip: zip,
        city: city,
        confirmed: false,
        uniqueCode: uniqueCode
    };

    // Salva l'ordine e visualizza il codice di conferma
    saveOrder(newOrder);
    showConfirmationScreen(uniqueCode);
});

// Funzione per generare un codice univoco
function generateUniqueCode() {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Funzione per visualizzare la schermata di conferma
function showConfirmationScreen(code) {
    document.getElementById("mainContent").style.display = 'none';
    document.getElementById("confirmationScreen").style.display = 'block';
    document.getElementById("confirmationCode").innerText = code;

    // Aggiungi il messaggio di avviso per Instagram
    document.getElementById("confirmationMessage").innerText = "ATTENZIONE: invia questo codice alla pagina Instagram @no.issue_official per la conferma e il pagamento dell'ordine";
}

// Funzione per salvare l'ordine nel localStorage
function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    displayOrder(order, orders.length - 1);
}

// Funzione per caricare gli ordini da localStorage
function loadOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.forEach((order, index) => {
        displayOrder(order, index);
    });
}

// Funzione per mostrare l'ordine nella tabella
function displayOrder(order, index) {
    const table = document.getElementById("orderTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    
    newRow.insertCell(0).innerText = order.color;
    newRow.insertCell(1).innerText = order.size;
    newRow.insertCell(2).innerText = order.street;
    newRow.insertCell(3).innerText = order.zip;
    newRow.insertCell(4).innerText = order.city;
    
    // Colonna "Verificato" con una checkbox
    const verifyCell = newRow.insertCell(5);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = order.confirmed;
    checkbox.addEventListener("change", function () {
        order.confirmed = checkbox.checked;
        saveOrdersToStorage();
    });
    verifyCell.appendChild(checkbox);

    // Colonna azioni con il pulsante di cancellazione
    const actionCell = newRow.insertCell(6);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Cancella";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", function () {
        // Animazione di rimozione della riga
        newRow.classList.add("fade-out");
        setTimeout(function() {
            deleteOrder(index); // Elimina l'ordine da localStorage
            table.deleteRow(newRow.rowIndex); // Rimuove la riga dalla tabella
        }, 300); // Ritardo per l'animazione
    });
    actionCell.appendChild(deleteButton);
}

// Funzione per salvare gli ordini aggiornati su localStorage
function saveOrdersToStorage() {
    const rows = Array.from(document.getElementById("orderTable").getElementsByTagName("tbody")[0].rows);
    const updatedOrders = rows.map(row => {
        return {
            color: row.cells[0].innerText,
            size: row.cells[1].innerText,
            street: row.cells[2].innerText,
            zip: row.cells[3].innerText,
            city: row.cells[4].innerText,
            confirmed: row.cells[5].firstChild.checked
        };
    });
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
}

// Funzione per eliminare un ordine dal localStorage
function deleteOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Accesso all'area privata con codice
document.getElementById("accessPrivate").addEventListener("click", function () {
    document.getElementById("mainContent").style.display = 'none';
    document.getElementById("privateSection").style.display = 'block';
});

// Verifica del codice di accesso all'area privata
document.getElementById("loginButton").addEventListener("click", function () {
    const password = document.getElementById("password").value;

    if (password === "3455") {
        document.getElementById("adminLoginForm").style.display = 'none';
        document.getElementById("orderSummary").style.display = 'block';
    } else {
        alert("Codice errato.");
    }
});
