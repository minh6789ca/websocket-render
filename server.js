// JavaScript Documentconst fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const express = require('express');

const app = express();

// Tạo HTTPS Server
const server = https.createServer({
    cert: fs.readFileSync('./cert.pem'),   // Chứng chỉ SSL
    key: fs.readFileSync('./key.pem')
}, app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('🔗 Client đã kết nối');

    ws.on('message', (message) => {
        console.log(`📩 Tin nhắn nhận được: ${message}`);
        ws.send(`📨 Server phản hồi: ${message}`);
    });

    ws.on('close', () => console.log('❌ Client đã ngắt kết nối'));
});

// Lắng nghe cổng do Render cấp (PORT)
const PORT = process.env.PORT || 443;
server.listen(PORT, () => {
    console.log(`🚀 WSS Server chạy trên cổng ${PORT}`);
});
