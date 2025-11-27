// script.js
let device = null;
let server = null;
let writeChar = null;

const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const CHAR_UUID    = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

const connectBtn = document.getElementById('connectBtn');
const statusEl = document.getElementById('status');
const controls = document.getElementById('controls');
const brightness = document.getElementById('brightness');
const bval = document.getElementById('bval');

// Utility: send JSON string to device using writeValueWithoutResponse
async function sendJson(obj) {
  if (!writeChar) {
    console.warn('No characteristic to write to');
    return;
  }
  const json = JSON.stringify(obj);
  const encoder = new TextEncoder();
  try {
    // Use write without response for NimBLE compatibility on iOS
    await writeChar.writeValueWithoutResponse(encoder.encode(json));
    console.log('Sent:', json);
  } catch (e) {
    console.error('Write failed', e);
  }
}

// Connect flow
connectBtn.addEventListener('click', async () => {
  try {
    statusEl.textContent = 'Requesting device...';
    device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [SERVICE_UUID]
    });

    statusEl.textContent = 'Connecting...';
    server = await device.gatt.connect();

    const service = await server.getPrimaryService(SERVICE_UUID);
    writeChar = await service.getCharacteristic(CHAR_UUID);

    // show controls
    controls.classList.remove('hidden');
    statusEl.textContent = 'Connected: ' + (device.name || 'Unknown');

    // set up disconnect listener
    device.addEventListener('gattserverdisconnected', () => {
      statusEl.textContent = 'Disconnected';
      controls.classList.add('hidden');
      writeChar = null;
      device = null;
    });

  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Connection failed';
    controls.classList.add('hidden');
  }
});

// Attach button handlers
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', async () => {
    const raw = btn.getAttribute('data-cmd');
    try {
      const obj = JSON.parse(raw);
      await sendJson(obj);
    } catch (e) {
      console.error('Invalid JSON in button', e);
    }
  });
});

// Brightness slider
brightness.addEventListener('input', async (ev) => {
  const v = parseInt(ev.target.value);
  bval.textContent = v;
  await sendJson({ brightness: v });
});
