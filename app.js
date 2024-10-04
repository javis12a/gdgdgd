document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('save-btn').addEventListener('click', handleAttendance);
});

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
    const url = 'https://script.google.com/macros/s/AKfycbyN6sU1V7-K2Ynx880p-_dqVKhQ7F-arjWIzyFwDqoq9tp0zZfov5x0LVR9MUH7OTpW6A/exec'; // Thay bằng URL Google Apps Script đã triển khai

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student: studentName }) // Dữ liệu phải được định dạng JSON
        });

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
