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
        if (data.success) {
            return true;
        } else {
            console.error('Lỗi từ Apps Script:', data.error);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
