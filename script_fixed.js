
let orders = [];
let orderId = 1;

function goToSecondaryPage() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('secondary-page').style.display = 'block';
}

function goToPrivateArea() {
    const code = prompt('Inserisci il codice per accedere all'area privata:');
    if (code === '3455') {
        document.getElementById('main-page').style.display = 'none';
        document.getElementById('private-area').style.display = 'block';
        loadOrders();
    } else {
        alert('Codice non valido');
    }
}

function submitOrder() {
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;
    const phone = document.getElementById('phone').value;
    const via = document.getElementById('via').value;
    const city = document.getElementById('city').value;
    const cap = document.getElementById('cap').value;
    const uniqueCode = `ORD-${orderId}-${Math.floor(Math.random() * 1000)}`;

    if (color && size && phone && via && city && cap) {
        const order = {
            color, size, phone, via, city, cap, uniqueCode
        };
        orders.push(order);
        alert(`ATTENZIONE: salva e invia questo codice nei direct della pagina Instagram @no.issue_official per la conferma e il pagamento dell'ordine: ${uniqueCode}`);
        orderId++;
    } else {
        alert('Compila tutti i campi.');
    }
}

function loadOrders() {
    const tableBody = document.querySelector('#order-table tbody');
    tableBody.innerHTML = '';
    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.color}</td>
            <td>${order.size}</td>
            <td>${order.phone}</td>
            <td>${order.via}</td>
            <td>${order.city}</td>
            <td>${order.cap}</td>
            <td>${order.uniqueCode}</td>
            <td><input type="checkbox"></td>
            <td><button onclick="deleteOrder(${index})">Cancella</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteOrder(index) {
    orders.splice(index, 1);
    loadOrders();
}
