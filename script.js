const jsonOutput = document.getElementById("jsonOutput");

// LED 1 toggle
let led2On = false;
document.getElementById("led2Btn").addEventListener("click", () => {
    led2On = !led2On;
    document.getElementById("led2Btn").textContent = led2On ? "LED 1 OFF" : "LED 1 ON";
    document.getElementById("led2Btn").className = led2On ? "btn off" : "btn";
    jsonOutput.textContent = `{"led2":${led2On ? 1 : 0}}`;
});

// LED 2 toggle
let led20On = false;
document.getElementById("led20Btn").addEventListener("click", () => {
    led20On = !led20On;
    document.getElementById("led20Btn").textContent = led20On ? "LED 2 OFF" : "LED 2 ON";
    document.getElementById("led20Btn").className = led20On ? "btn off" : "btn";
    jsonOutput.textContent = `{"led20":${led20On ? 1 : 0}}`;
});

// LED 3 toggle
let led21On = false;
document.getElementById("led21Btn").addEventListener("click", () => {
    led21On = !led21On;
    document.getElementById("led21Btn").textContent = led21On ? "LED 3 OFF" : "LED 3 ON";
    document.getElementById("led21Btn").className = led21On ? "btn off" : "btn";
    jsonOutput.textContent = `{"led21":${led21On ? 1 : 0}}`;
});

// Brightness slider
const led2Brightness = document.getElementById("led2Brightness");
document.getElementById("copyBrightnessBtn").addEventListener("click", () => {
    const val = led2Brightness.value;
    const jsonStr = `{"brightness":${val}}`;
    jsonOutput.textContent = jsonStr;
    navigator.clipboard.writeText(jsonStr);
    alert("Copied JSON to clipboard!");
});
