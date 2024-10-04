document.addEventListener('DOMContentLoaded', function() {
    // Xử lý sự kiện đăng nhập
    document.getElementById('login-btn').addEventListener('click', handleLogin);

    // Xử lý sự kiện lưu điểm danh
    document.getElementById('save-btn').addEventListener('click', handleAttendance);
});

// Hàm xử lý đăng nhập
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validateLogin(username, password)) {
        toggleVisibility('login-container', 'attendance-container');
    } else {
        displayError('login-error', 'Sai tài khoản hoặc mật khẩu!');
    }
}

// Xác thực tài khoản đăng nhập
function validateLogin(username, password) {
    const validUsername = 'kidstars';
    const validPassword = 'kidstars145@';
    return username === validUsername && password === validPassword;
}

// Chuyển đổi ẩn/hiện giữa hai phần tử
function toggleVisibility(hideElementId, showElementId) {
    document.getElementById(hideElementId).classList.add('hidden');
    document.getElementById(showElementId).classList.remove('hidden');
}

// Hiển thị thông báo lỗi
function displayError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Hàm xử lý điểm danh học sinh
function handleAttendance() {
    const studentName = document.getElementById('student-name').value;

    if (studentName) {
        saveAttendance(studentName)
            .then(success => {
                if (success) {
                    addStudentToList(studentName);
                } else {
                    alert('Lưu điểm danh thất bại. Vui lòng thử lại!');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Đã xảy ra lỗi khi lưu điểm danh.');
            });
    } else {
        alert('Vui lòng nhập tên học sinh.');
    }
}

// Thêm học sinh vào danh sách hiển thị
function addStudentToList(studentName) {
    const studentList = document.getElementById('student-list');
    const listItem = document.createElement('li');
    listItem.textContent = studentName;
    studentList.appendChild(listItem);

    // Xóa tên học sinh trong input sau khi lưu thành công
    document.getElementById('student-name').value = '';
}

// Hàm lưu điểm danh vào Google Apps Script
async function saveAttendance(studentName) {
    const url = 'https://script.google.com/macros/s/AKfycbwzQZmb6_2n0ZYEI69Acs2w8t4Z9enjQa6KEXwjDzpiT_B-g09LGUZZoxnMd3iMSmN5/exec';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student: studentName })
        });

        // Kiểm tra nếu phản hồi trả về là JSON và chứa trường success
        const data = await response.json();
        console.log('Success:', data);
        return data.success;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
