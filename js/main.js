// Tạo mảng chứa danh sách nhân viên
const staffList = [];

// Thêm mới nhân viên
getEle('#btnThemNV').addEventListener('click', () => {
    // input: dữ liệu đầu vào của nhân viên
    let account = String(getEle('#tknv').value); // input tài khoản
    let checkAcc = validateAcc(account); // kiểm tra input tài khoản
    let checkLength = validateLength(account, 4, 6); // kiểm tra độ dài input tài khoản

    let fullName = getEle('#name').value; // input họ tên
    let checkName = validateName(fullName); // kiêm tra input họ tên

    let email = getEle('#email').value; // input địa chỉ email
    let checkEmail = validateEmail(email); // kiểm tra input địa chỉ email

    let password = getEle('#password').value;
    let date = getEle('#datepicker').value;
    let baseSalary = +getEle('#luongCB').value;
    let position = getEle('#chucvu').value;
    let hours = +getEle('#gioLam').value;

    // progress
    // tạo object nhân viên
    const staff = new StaffInfo(
        account,
        fullName,
        email,
        password,
        date,
        baseSalary,
        position,
        hours
    );

    // thêm object nhân viên vào mảng staffList
    staffList.push(staff);

    // gọi hàm renderTable để hiển thị danh sách nhân viên
    renderTable(staffList);

    // trước khi in ra danh sách nhân viên phải kiểm tra tất cả các field xem dữ liệu đã nhập có hợp lệ hay không
    // if (position === '0') {
    //     alert('Vui lòng chọn chức vụ.');
    // }
    // else if (!checkAcc) {
    //     alert('Tài khoản phải được nhập bằng số.');
    // }
    // else if (!checkLength) {
    //     alert('Tài khoản phải nhập từ 4 đến 6 ký số.');
    // }
    // else if (!checkName) {
    //     alert('Tên nhân viên phải là chữ.');
    // }
    // else if (!checkEmail) {
    //     alert('Email phải đúng định dạng.');
    // }
    // else {
    //     // gọi hàm renderTable để hiển thị danh sách nhân viên
    //     renderTable(staffList);
    // }
});

// Tạo hàm hiển thị danh sách sinh viên ra table
renderTable = (staffList) => {
    let html = '';
    for (let i = 0; i < staffList.length; i++) {
        let staff = staffList[i];
        html +=
        `
        <tr>
            <td>${staff.account}</td>
            <td>${staff.fullName}</td>
            <td>${staff.email}</td>
            <td>${staff.date}</td>
            <td>${staff.position}</td>
            <td>${staff.totalSalary()}</td>
            <td>${staff.category()}</td>
            <td><button type="button" class="btn btn-danger btnDelete">Delete</button></td>
        </tr>
        `;
    }

    getEle('#tableDanhSach').innerHTML = html;
}


// Tạo hàm kiểm tra tài khoản
function validateAcc(acc) {
    let numbers = /^[0-9]+$/;

    getEle('#tbTKNV').style.display = 'block';

    if (acc.match(numbers)) {
        getEle('#tbTKNV').innerHTML = '';
        return true;
    }
    else {
        getEle('#tbTKNV').innerHTML = 'Tài khoản phải được nhập bằng số.';
        return false;
    }
}


// Tạo hàm kiểm tra họ tên
function validateName(name) {
    let letters = new RegExp("^[A-Za-z]+$");

    getEle('#tbTen').style.display = 'block';

    if (letters.test(name)) {
        getEle('#tbTen').innerHTML = '';
        return true;
    }
    else {
        getEle('#tbTen').innerHTML = 'Tên nhân viên phải là chữ.';
        return false;
    }
}


// Tạo hàm kiểm tra email
function validateEmail(email) {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    getEle('#tbEmail').style.display = 'block';

    if (email.match(mailFormat)) {
        getEle('#tbEmail').innerHTML = '';
        return true;
    }
    else {
        getEle('#tbEmail').innerHTML = 'Email phải đúng định dạng.';
        return false;
    }
}

// Tạo hàm kiểm tra độ dài chuỗi
function validateLength(input, min, max){
    if (input.length >= min && input.length <= max) {
        getEle('#tbTKNV').innerHTML = '';
        return true;
    } 
    else {
        getEle('#tbTKNV').innerHTML = 'Tài khoản phải nhập từ ' + min + ' đến ' + max + ' ký số.';
        return false;
    }
}


function getEle(selector) {
    return document.querySelector(selector);
}

// console.log(staffList);