const WebSocket = require('ws');

// Lấy PORT từ biến môi trường (Render cấp tự động)
const PORT = process.env.PORT || 27782;  

// Tạo WebSocket Server
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
    console.log('🔗 Client đã kết nối');

    ws.on('message', (message) => {
        console.log(`📩 Nhận tin nhắn: ${message}`);
        ws.send(`📨 Server phản hồi: ${message}`);
    });

    ws.on('close', () => console.log('❌ Client đã ngắt kết nối'));
});

console.log(`🚀 WebSocket Server đang chạy trên cổng ${PORT}`);
