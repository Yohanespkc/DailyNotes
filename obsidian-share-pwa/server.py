import http.server
import socketserver
import json
import os
import mimetypes

PORT = 8085
TELEOBSI_DIR = "/Users/yohanessurya/Documents/Development/Gasing-obs/Gasing/Teleobsi"
WEB_DIR = os.path.dirname(os.path.abspath(__file__))

os.makedirs(TELEOBSI_DIR, exist_ok=True)

class TeleShareHandler(http.server.BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_HEAD(self):
        req_path = self.path.split('?')[0]
        if req_path == '/':
            req_path = '/index.html'

        local_path = os.path.join(WEB_DIR, req_path.lstrip('/'))
        if os.path.isfile(local_path):
            mime_type, _ = mimetypes.guess_type(local_path)
            if not mime_type:
                mime_type = 'application/octet-stream'
            
            file_size = os.path.getsize(local_path)
            self.send_response(200)
            self.send_header('Content-Type', mime_type)
            self.send_header('Content-Length', str(file_size))
            self.end_headers()
        else:
            self.send_error(404, "File not found")

    def do_POST(self):
        if self.path.startswith('/api/save-teleobsi'):
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                filename = data.get('filename', 'Catatan_Teleobsi.md')
                content = data.get('content', '')

                if not filename.endswith('.md'):
                    filename += '.md'
                
                clean_filename = "".join(c for c in filename if c.isalnum() or c in (' ', '_', '-', '.')).strip()
                if not clean_filename:
                    clean_filename = 'Catatan_Teleobsi.md'

                save_path = os.path.join(TELEOBSI_DIR, clean_filename)
                
                with open(save_path, 'w', encoding='utf-8') as f:
                    f.write(content)

                response = {
                    'status': 'success',
                    'message': f'Berhasil disimpan ke Teleobsi/{clean_filename}',
                    'path': save_path,
                    'filename': clean_filename
                }
                res_bytes = json.dumps(response).encode('utf-8')

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Content-Length', str(len(res_bytes)))
                self.end_headers()
                self.wfile.write(res_bytes)
                print(f"[Teleobsi API] Saved note: {save_path}")
            except Exception as e:
                err_res = json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(err_res)))
                self.end_headers()
                self.wfile.write(err_res)
        else:
            self.send_error(404, "Endpoint not found")

    def do_GET(self):
        req_path = self.path.split('?')[0]
        if req_path == '/':
            req_path = '/index.html'

        local_path = os.path.join(WEB_DIR, req_path.lstrip('/'))
        if os.path.isfile(local_path):
            mime_type, _ = mimetypes.guess_type(local_path)
            if not mime_type:
                mime_type = 'application/octet-stream'
            
            with open(local_path, 'rb') as f:
                content = f.read()

            self.send_response(200)
            self.send_header('Content-Type', mime_type)
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        else:
            self.send_error(404, "File not found")

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), TeleShareHandler) as httpd:
        print(f"TeleShare Server running on http://localhost:{PORT}")
        print(f"Obsidian Teleobsi Folder: {TELEOBSI_DIR}")
        httpd.serve_forever()
