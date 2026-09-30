from flask import Flask, jsonify
from flask_cors import CORS
from scapy.all import AsyncSniffer, IP, TCP, UDP, ICMP, Raw
import threading
import time

app = Flask(__name__)
CORS(app)

packets = []

sniffer = None
capturing = False


# ===============================
# ANALYZE PACKET
# ===============================

def analyze_packet(packet):

    if IP not in packet:
        return

    source = packet[IP].src
    destination = packet[IP].dst
    size = len(packet)

    # Identify protocol
    if TCP in packet:
        protocol = "TCP"

    elif UDP in packet:
        protocol = "UDP"

    elif ICMP in packet:
        protocol = "ICMP"

    else:
        protocol = "OTHER"

    # Extract payload
    payload = "-"

    if Raw in packet:

        try:
            payload = bytes(
                packet[Raw].load
            )[:60].decode(
                "utf-8",
                errors="replace"
            )

        except Exception:
            payload = "Binary Data"

    packet_info = {
        "time": time.strftime("%H:%M:%S"),
        "source": source,
        "destination": destination,
        "protocol": protocol,
        "size": size,
        "payload": payload
    }

    packets.append(packet_info)

    # Keep latest 200 packets
    if len(packets) > 200:
        packets.pop(0)


# ===============================
# START CAPTURE
# ===============================

def capture_packets():

    global sniffer
    global capturing

    try:

        sniffer = AsyncSniffer(
            prn=analyze_packet,
            store=False
        )

        sniffer.start()

        print(">>> SCAPY PACKET CAPTURE STARTED")

    except Exception as error:

        capturing = False

        print(">>> CAPTURE ERROR:", error)


# ===============================
# START API
# ===============================

@app.route("/api/start")
def start_capture():

    global capturing

    if not capturing:

        capturing = True

        thread = threading.Thread(
            target=capture_packets,
            daemon=True
        )

        thread.start()

        return jsonify({
            "status": "started"
        })

    return jsonify({
        "status": "already running"
    })


# ===============================
# STOP API
# ===============================

@app.route("/api/stop")
def stop_capture():

    global capturing
    global sniffer

    capturing = False

    try:

        if sniffer:

            sniffer.stop()

            sniffer = None

            print(">>> PACKET CAPTURE STOPPED")

    except Exception as error:

        print(">>> STOP ERROR:", error)

    return jsonify({
        "status": "stopped"
    })


# ===============================
# GET PACKETS
# ===============================

@app.route("/api/packets")
def get_packets():

    return jsonify(packets)


# ===============================
# GET STATISTICS
# ===============================

@app.route("/api/stats")
def get_stats():

    tcp = 0
    udp = 0
    icmp = 0

    for packet in packets:

        if packet["protocol"] == "TCP":
            tcp += 1

        elif packet["protocol"] == "UDP":
            udp += 1

        elif packet["protocol"] == "ICMP":
            icmp += 1

    return jsonify({
        "total": len(packets),
        "tcp": tcp,
        "udp": udp,
        "icmp": icmp
    })


# ===============================
# CLEAR PACKETS
# ===============================

@app.route("/api/clear")
def clear_packets():

    packets.clear()

    return jsonify({
        "status": "cleared"
    })


# ===============================
# STATUS
# ===============================

@app.route("/api/status")
def status():

    return jsonify({
        "capturing": capturing,
        "packets": len(packets)
    })


# ===============================
# RUN FLASK
# ===============================

if __name__ == "__main__":

    print("=" * 50)
    print("       NEXUS-SNIFF NETWORK ANALYZER")
    print("=" * 50)

    print("Backend: http://127.0.0.1:5000")
    print("Status: ONLINE")

    print("=" * 50)

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )