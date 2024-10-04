document.getElementById('login-btn').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'kidstars' && password === 'kidstars145@') {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('attendance-container').classList.remove('hidden');
    } else {
        document.getElementById('login-error').textContent = 'Sai tài khoản hoặc mật khẩu!';
    }
});

document.getElementById('save-btn').addEventListener('click', function () {
    const studentName = document.getElementById('student-name').value;

    if (studentName) {
        saveAttendance(studentName)
            .then(success => {
                if (success) {
                    document.getElementById('student-name').value = '';
                    document.getElementById('student-list').innerHTML += `<li>${studentName}</li>`;
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
});

async function saveAttendance(name) {
    const url = 'https://script.google.com/macros/s/AKfycbwzQZmb6_2n0ZYEI69Acs2w8t4Z9enjQa6KEXwjDzpiT_B-g09LGUZZoxnMd3iMSmN5/exec';

    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Dùng no-cors để tránh lỗi CORS nhưng sẽ không nhận được phản hồi
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student: name })
        });

        // Giả định rằng yêu cầu thành công vì dùng no-cors không trả về phản hồi
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
