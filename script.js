let device;
let rxCharacteristic;

const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const RX_UUID      = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

async function connectBluetooth() {
    try {
        device = await navigator.bluetooth.requestDevice({
            filters: [{ services: [SERVICE_UUID] }]
        });

        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(SERVICE_UUID);
        rxCharacteristic = await service.getCharacteristic(RX_UUID);

        document.getElementById("controlPanel").style.display = "block";
        alert("Connected!");
    } catch (error) {
        alert("Connection failed: " + error);
    }
}

async function sendCommand(cmd) {
    if (!rxCharacteristic) return;
    const encoder = new TextEncoder();
    await rxCharacteristic.writeValue(encoder.encode(cmd));
}

// Button event listeners
document.getElementById("connectBtn").addEventListener("click", connectBluetooth);

const led2Btn = document.getElementById("led2Btn");
let led2On = false;
led2Btn.addEventListener("click", () => {
    led2On = !led2On;
    led2Btn.textContent = led2On ? "LED 1 OFF" : "LED 1 ON";
    led2Btn.className = led2On ? "btn off" : "btn on";
    sendCommand(`{"led2":${led2On ? 1 : 0}}`);
});

const led20Btn = document.getElementById("led20Btn");
let led20On = false;
led20Btn.addEventListener("click", () => {
    led20On = !led20On;
    led20Btn.textContent = led20On ? "LED 2 OFF" : "LED 2 ON";
    led20Btn.className = led20On ? "btn off" : "btn on";
    sendCommand(`{"led20":${led20On ? 1 : 0}}`);
});

const led21Btn = document.getElementById("led21Btn");
let led21On = false;
led21Btn.addEventListener("click", () => {
    led21On = !led21On;
    led21Btn.textContent = led21On ? "LED 3 OFF" : "LED 3 ON";
    led21Btn.className = led21On ? "btn off" : "btn on";
    sendCommand(`{"led21":${led21On ? 1 : 0}}`);
});

// Brightness slider
const led2Brightness = document.getElementById("led2Brightness");
led2Brightness.addEventListener("input", () => {
    sendCommand(`{"brightness":${led2Brightness.value}}`);
});
