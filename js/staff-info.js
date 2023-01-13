// Tạo lớp đối tượng nhân viên
function StaffInfo(_account, _fullName, _email, _password, _date, _baseSalary, _position, _hours) {
    // property
    this.account = _account;
    this.fullName = _fullName;
    this.email = _email;
    this.password = _password;
    this.date = _date;
    this.baseSalary = _baseSalary;
    this.position = _position;
    this.hours = _hours;


    // method
    this.totalSalary = function () { // tính tổng lương trong tháng
        switch (this.position) {
            case 'A':
                return this.baseSalary * 3;
            case 'B':
                return this.baseSalary * 2;
            case 'C':
                return this.baseSalary;
            default:
                break;
        }
    };

    this.category = function () { // xếp loại nhân viên dựa theo số giờ làm trong tháng
        let result = '';
        if (this.hours >= 192) {
            result = 'Xuất sắc';
        } 
        else if (this.hours >= 176 && this.hours < 192) {
            result = 'Giỏi';
        }
        else if (this.hours >= 160 && this.hours < 176){
            result = 'Khá';
        }
        else if (this.hours < 160){
            result = 'Trung bình';
        }
        return result;
    };
}