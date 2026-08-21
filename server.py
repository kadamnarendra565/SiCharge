#!/usr/bin/env python3
"""
SiCharge Local Web Preview Server
Launches an HTTP server and opens the interactive website in your default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    port = PORT
    
    # Check port availability
    while port < PORT + 20:
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                print("=" * 60)
                print("⚡ SiCharge - Silicon Carbide Power Modules Website")
                print(f"🚀 Server running at: {url}")
                print("📄 Press Ctrl+C in this terminal to stop the server.")
                print("=" * 60)
                webbrowser.open(url)
                httpd.serve_forever()
        except OSError:
            print(f"⚠️ Port {port} is in use, trying port {port + 1}...")
            port += 1
        except KeyboardInterrupt:
            print("\n🛑 Server stopped successfully.")
            sys.exit(0)

if __name__ == "__main__":
    run_server()
