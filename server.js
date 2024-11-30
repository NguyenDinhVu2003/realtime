const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Đảm bảo phục vụ các tệp tĩnh trong thư mục public
app.use(express.static('public'));

// Đặt một route mặc định nếu người dùng truy cập vào /
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/user.html'); // Hoặc bạn có thể trả về trang admin.html tùy theo nhu cầu
});
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Lắng nghe dữ liệu người dùng từ client
    socket.on('user_data', (data) => {
        console.log('Received user data:', data);

        // Chuyển dữ liệu tới admin
        socket.emit('user_data', data);
    });

    // Lắng nghe phản hồi từ admin
    socket.on('admin_response', (response) => {
        console.log('Admin response:', response);

        // Gửi phản hồi về cho người dùng
        socket.emit('login_response', response);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Lắng nghe port
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
