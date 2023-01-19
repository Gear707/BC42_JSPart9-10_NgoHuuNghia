// Tạo lớp đối tượng nhân viên
function StaffInfo(
    account, fullName, email, password, date, baseSalary, position, hours
) {
    // property
    this.account = account;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.date = date;
    this.baseSalary = baseSalary;
    this.position = position;
    this.hours = hours;
}

// method
StaffInfo.prototype.totalSalary = function () {
    // tính tổng lương trong tháng dựa theo chức vụ
    switch (this.position) {
        case 'Sếp':
            return this.baseSalary * 3;
        case 'Trưởng phòng':
            return this.baseSalary * 2;
        case 'Nhân viên':
            return this.baseSalary;
        default:
            break;
    }
}

StaffInfo.prototype.category = function () {
    // xếp loại nhân viên dựa theo số giờ làm trong tháng
    let result = '';
    if (this.hours >= 192) {
        result = 'Xuất sắc';
    }
    else if (this.hours >= 176) {
        result = 'Giỏi';
    }
    else if (this.hours >= 160) {
        result = 'Khá';
    }
    else if (this.hours < 160) {
        result = 'Trung bình';
    }
    return result;
}