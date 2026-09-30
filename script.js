const API_URL = "http://127.0.0.1:5000";


// ===============================
// START PACKET CAPTURE
// ===============================

async function startCapture() {

    const startButton = document.querySelector(".start");

    startButton.innerHTML = "● CAPTURE RUNNING";

    startButton.style.background = "#00ff41";
    startButton.style.color = "#000";

    try {

        const response = await fetch(
            API_URL + "/api/start"
        );

        const data = await response.json();

        console.log("START RESPONSE:", data);

        setStatus(
            "CAPTURE ACTIVE",
            true
        );

    } catch (error) {

        console.error(
            "START ERROR:",
            error
        );

        startButton.innerHTML =
            "▶ START CAPTURE";

        startButton.style.background = "";

        startButton.style.color = "";

        setStatus(
            "BACKEND ERROR",
            false
        );
    }
}


// ===============================
// STOP PACKET CAPTURE
// ===============================

async function stopCapture() {

    try {

        const response = await fetch(
            API_URL + "/api/stop"
        );

        const data = await response.json();

        console.log(
            "STOP RESPONSE:",
            data
        );

        const startButton =
            document.querySelector(".start");

        startButton.innerHTML =
            "▶ START CAPTURE";

        startButton.style.background = "";

        startButton.style.color = "";

        setStatus(
            "SYSTEM STANDBY",
            true
        );

    } catch (error) {

        console.error(
            "STOP ERROR:",
            error
        );

        setStatus(
            "BACKEND ERROR",
            false
        );
    }
}


// ===============================
// CLEAR PACKET DATA
// ===============================

async function clearPackets() {

    try {

        const response = await fetch(
            API_URL + "/api/clear"
        );

        const data = await response.json();

        console.log(
            "CLEAR RESPONSE:",
            data
        );

        updateDashboard();

    } catch (error) {

        console.error(
            "CLEAR ERROR:",
            error
        );

        setStatus(
            "BACKEND ERROR",
            false
        );
    }
}


// ===============================
// UPDATE DASHBOARD
// ===============================

async function updateDashboard() {

    try {

        // Get packets

        const packetsResponse =
            await fetch(
                API_URL + "/api/packets"
            );

        const packets =
            await packetsResponse.json();


        // Get statistics

        const statsResponse =
            await fetch(
                API_URL + "/api/stats"
            );

        const stats =
            await statsResponse.json();


        // Update total

        document.getElementById(
            "total"
        ).textContent =
            stats.total ?? 0;


        // Update TCP

        document.getElementById(
            "tcp"
        ).textContent =
            stats.tcp ?? 0;


        // Update UDP

        document.getElementById(
            "udp"
        ).textContent =
            stats.udp ?? 0;


        // Update ICMP

        document.getElementById(
            "icmp"
        ).textContent =
            stats.icmp ?? 0;


        // Update packet count

        document.getElementById(
            "packetCount"
        ).textContent =
            (stats.total ?? 0) + " PACKETS";


        // Display packets

        displayPackets(packets);


        // Backend is working

        setStatus(
            "BACKEND ONLINE",
            true
        );

    } catch (error) {

        console.error(
            "DASHBOARD ERROR:",
            error
        );

        setStatus(
            "BACKEND OFFLINE",
            false
        );
    }
}


// ===============================
// DISPLAY PACKETS
// ===============================

function displayPackets(packets) {

    const table =
        document.getElementById(
            "packetTable"
        );


    // No packets

    if (
        !packets ||
        packets.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="waiting"
                >

                    <span>></span>
                    WAITING FOR NETWORK TRAFFIC...

                </td>

            </tr>

        `;

        return;
    }


    // Clear old rows

    table.innerHTML = "";


    // Add packets

    packets
        .slice()
        .reverse()
        .forEach(packet => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${safe(packet.time)}
                </td>

                <td>
                    ${safe(packet.source)}
                </td>

                <td>
                    ${safe(packet.destination)}
                </td>

                <td>
                    ${safe(packet.protocol)}
                </td>

                <td>
                    ${safe(packet.size)} B
                </td>

                <td>
                    ${safe(packet.payload)}
                </td>

            `;


            table.appendChild(row);

        });
}


// ===============================
// SAFE TEXT FUNCTION
// ===============================

function safe(value) {

    const element =
        document.createElement("div");

    element.textContent =
        value ?? "-";

    return element.innerHTML;
}


// ===============================
// STATUS DISPLAY
// ===============================

function setStatus(
    message,
    online
) {

    const statusText =
        document.getElementById(
            "statusText"
        );

    const statusDot =
        document.getElementById(
            "statusDot"
        );


    statusText.textContent =
        message;


    if (online) {

        statusDot.classList.remove(
            "offline"
        );

        statusDot.classList.add(
            "online"
        );

    } else {

        statusDot.classList.remove(
            "online"
        );

        statusDot.classList.add(
            "offline"
        );
    }
}


// ===============================
// AUTOMATIC REFRESH
// ===============================

setInterval(
    updateDashboard,
    1000
);


// ===============================
// INITIAL CHECK
// ===============================

updateDashboard();