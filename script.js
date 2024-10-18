let precioPorKilo = 0;
let porcentajeMerma = 0;
let productos = [];

function calcular() {
    const costo = parseFloat(document.getElementById('costo').value);
    const kilos = parseFloat(document.getElementById('kilos').value);
    const moneda = document.getElementById('moneda').value;
    
    if (isNaN(costo) || isNaN(kilos) || kilos <= 0) {
        document.getElementById('resultado').innerText = 'Por favor, introduce valores válidos';
        return;
    }
    
    precioPorKilo = costo / kilos;
    const simboloMoneda = moneda === 'USD' ? '$' :
                          moneda === 'PESO' ? '?' :
                          moneda === 'EUR' ? '€' : '';

    document.getElementById('resultado').innerText = 'Precio por kilo: ' + simboloMoneda + precioPorKilo.toFixed(2);
}

function calcularMerma() {
    const kilos = parseFloat(document.getElementById('kilos').value);
    const merma = parseFloat(document.getElementById('merma').value);
    const unidad = document.getElementById('unidad').value;
    
    if (isNaN(kilos) || kilos <= 0 || isNaN(merma) || merma < 0) {
        document.getElementById('resultadoMerma').innerText = 'Por favor, introduce valores válidos';
        return;
    }

    const kilosMerma = unidad === 'gramos' ? merma / 1000 : merma;
    porcentajeMerma = (kilosMerma / kilos) * 100;
    
    document.getElementById('resultadoMerma').innerText = 'Merma: ' + porcentajeMerma.toFixed(2) + '%';
}

function calcularIncremento() {
    if (isNaN(precioPorKilo) || precioPorKilo === 0) {
        document.getElementById('resultadoIncremento').innerText = 'Por favor, asegúrate de que todos los valores sean válidos';
        return;
    }

    const incremento = porcentajeMerma === 0 ? precioPorKilo : precioPorKilo * (1 + porcentajeMerma / 100);

    document.getElementById('resultadoIncremento').innerText = 'Costo más merma: ' + incremento.toFixed(2) + ' unidades monetarias';
}

function calcularVentaFinal() {
    const utilidad = parseFloat(document.getElementById('utilidad').value) / 100;
    const moneda = document.getElementById('moneda').value;

    if (isNaN(precioPorKilo) || isNaN(porcentajeMerma) || isNaN(utilidad) || precioPorKilo === 0) {
        document.getElementById('resultadoVentaFinal').innerText = 'Por favor, asegúrate de que todos los valores sean válidos';
        return;
    }

    const costoConMerma = porcentajeMerma === 0 ? precioPorKilo : precioPorKilo * (1 + porcentajeMerma / 100);
    const precioVenta = costoConMerma / (1 - utilidad);

    const simboloMoneda = moneda === 'USD' ? '$' :
                          moneda === 'PESO' ? '?' :
                          moneda === 'EUR' ? '€' : '';

    document.getElementById('resultadoVentaFinal').innerText = 'Precio de venta: ' + simboloMoneda + precioVenta.toFixed(2);
}

function guardarProducto() {
    const producto = document.getElementById('producto').value;
    const precioVenta = document.getElementById('resultadoVentaFinal').innerText;

    if (producto === '' || precioVenta === '') {
        alert('Por favor, introduce el nombre del producto y calcula el precio de venta');
        return;
    }

    productos.push({ nombre: producto, precio: precioVenta });
    actualizarLista();
}

function mostrarLista() {
    const lista = document.getElementById('listaProductos');
    lista.innerHTML = productos.map((producto, index) => `
        <div class="product-item">
            <span>${producto.nombre} - ${producto.precio}</span>
            <button onclick="eliminarProducto(${index})">Borrar</button>
            <button onclick="modificarProducto(${index})">Modificar</button>
        </div>
    `).join('');
}

function actualizarLista() {
    mostrarLista();
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    actualizarLista();
}

function modificarProducto(index) {
    const nuevoPrecio = prompt('Introduce el nuevo precio:', productos[index].precio);
    if (nuevoPrecio) {
        productos[index].precio = nuevoPrecio;
        actualizarLista();
    }
}
