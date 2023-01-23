// Tạo mảng chứa danh sách nhân viên
let staffList = [];


// Thêm mới nhân viên
getEle('#btnThemNV').addEventListener('click', () => {
    let account = getEle('#tknv').value;
    let fullName = getEle('#name').value;
    let email = getEle('#email').value;
    let password = getEle('#password').value;
    let date = getEle('#datepicker').value;
    let baseSalary = +getEle('#luongCB').value;
    let position = getEle('#chucvu').value;
    let hours = +getEle('#gioLam').value;

    // tạo object nhân viên
    const staff = new StaffInfo(
        account, fullName, email, password, date, baseSalary, position, hours
    );

    // trước khi in ra danh sách nhân viên phải kiểm tra tất cả các field xem dữ liệu đã nhập có hợp lệ hay không
    let checkAcc = validateAcc();
    let checkLength = validateLength();
    let checkName = validateName();
    let checkEmail = validateEmail();
    let checkDate = validateDate();
    let checkPosition = validatePosition();


    if (!checkAcc) {
        alert('Tài khoản phải được nhập bằng số.');
    }
    else if (!checkLength) {
        alert('Tài khoản phải nhập từ 4 đến 6 ký số.');
    }
    else if (!checkName) {
        alert('Tên nhân viên phải là chữ.');
    }
    else if (!checkEmail) {
        alert('Email phải đúng định dạng.');
    }
    else if (!checkDate) {
        alert('Vui lòng nhập ngày làm.');
    }
    else if (!checkPosition) {
        alert('Vui lòng chọn chức vụ.');
    }
    else {
        // thêm object nhân viên vào mảng staffList
        staffList.push(staff);

        // gọi hàm renderTable để hiển thị danh sách nhân viên
        renderTable(staffList);

        // gọi hàm reserForm để xóa hết các dữ liệu đã nhập
        resetForm();
    }

});


// Hàm hiển thị danh sách sinh viên ra table
function renderTable(staffList) {
    let html = staffList.reduce((output, staff) => {
        return output +
            `
        <tr>
            <td>${staff.account}</td>
            <td>${staff.fullName}</td>
            <td>${staff.email}</td>
            <td>${staff.date}</td>
            <td>${staff.position}</td>
            <td>${staff.totalSalary()}</td>
            <td>${staff.category()}</td>
            <td>
                <button type="button" class="btn btn-info" onclick="editStaff('${staff.account}')" data-toggle="modal" data-target="#myModal">Sửa</button>
                <button type="button" class="btn btn-danger" onclick="deleteStaff('${staff.account}')">Xóa</button>
            </td>
        </tr>
        `;
    }, "");

    getEle('#tableDanhSach').innerHTML = html;
}


// Hàm reset giá trị các field
function resetForm() {
    getEle('#tknv').value = '';
    getEle('#name').value = '';
    getEle('#email').value = '';
    getEle('#password').value = '';
    getEle('#datepicker').value = '';
    getEle('#luongCB').value = '';
    getEle('#chucvu').value = 'Chọn chức vụ';
    getEle('#gioLam').value = '';
}


// Hàm tìm kiếm nhân viên dựa theo xếp loại
getEle('#btnTimNV').addEventListener('click', () => {
    let search = getEle("#searchName").value;

    // lọc ra các staff có category khớp với giá trị search
    let newStaffList = staffList.filter((staff) => {
        let category = staff.category().toLowerCase();
        search = search.toLowerCase();
        return category.indexOf(search) !== -1;
    });

    // hiển thị danh sách search ra giao diện
    renderTable(newStaffList);
});


// Hàm xóa nhân viên dựa theo account
function deleteStaff(acc) {
    // lọc ra mảng staffList chỉ chứa account khác với account của nhân viên muốn xóa
    staffList = staffList.filter((staff) => staff.account !== acc)

    // cập nhật giao diện
    renderTable(staffList);
}


// Hàm tìm staff theo account để fill thông tin lên form
function editStaff(acc) {
    // trả về đúng mảng chứa staff đang chọn
    let selectedStaff = staffList.find((staff) => staff.account === acc)

    // lấy thông tin của staff tìm được để fill lên form
    getEle('#tknv').value = selectedStaff.account;
    getEle('#name').value = selectedStaff.fullName;
    getEle('#email').value = selectedStaff.email;
    getEle('#password').value = selectedStaff.password;
    getEle('#datepicker').value = selectedStaff.date;
    getEle('#luongCB').value = selectedStaff.baseSalary;
    getEle('#chucvu').value = selectedStaff.position;
    getEle('#gioLam').value = selectedStaff.hours;

    // disable trường account & button thêm nhân viên
    getEle('#btnThemNV').disabled = true;
    getEle('#tknv').disabled = true;
}


// Hàm cập nhật thông tin nhân viên
getEle('#btnCapNhat').addEventListener('click', () => {
    let account = getEle('#tknv').value;
    let fullName = getEle('#name').value;
    let email = getEle('#email').value;
    let password = getEle('#password').value;
    let date = getEle('#datepicker').value;
    let baseSalary = +getEle('#luongCB').value;
    let position = getEle('#chucvu').value;
    let hours = +getEle('#gioLam').value;

    // tạo object nhân viên
    const staff = new StaffInfo(
        account, fullName, email, password, date, baseSalary, position, hours
    );

    // cập nhật thông tin mới của nhân viên
    let index = staffList.findIndex((staff) => staff.account === account)
    staffList[index] = staff;

    // cập nhật giao diện
    renderTable(staffList);

    // reset các trường dữ liệu
    resetForm();
})


// Hàm kiểm tra tài khoản
function validateAcc() {
    let acc = getEle('#tknv').value;

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


// Hàm kiểm tra họ tên
function validateName() {
    let name = getEle('#name').value;

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


// Hàm kiểm tra email
function validateEmail() {
    let email = getEle('#email').value;

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


// Hàm kiểm tra độ dài chuỗi
function validateLength() {
    let input = String(getEle('#tknv').value);
    const min = 4;
    const max = 6;

    if (input.length >= min && input.length <= max) {
        getEle('#tbTKNV').innerHTML = '';
        return true;
    }
    else {
        getEle('#tbTKNV').innerHTML = 'Tài khoản phải nhập từ ' + min + ' đến ' + max + ' ký số.';
        return false;
    }
}


// Hàm kiểm tra ngày làm
function validateDate() {
    let date = getEle('#datepicker').value;

    getEle('#tbNgay').style.display = 'block';

    if (date === '') {
        getEle('#tbNgay').innerHTML = 'Ngày làm không được để trống';
        return false;
    }
    else {
        getEle('#tbNgay').innerHTML = '';
        return true;
    }
}


// Hàm kiểm tra chức vụ
function validatePosition() {
    let position = getEle('#chucvu').value;

    getEle('#tbChucVu').style.display = 'block';

    if (position === 'Chọn chức vụ') {
        getEle('#tbChucVu').innerHTML = 'Vui lòng chọn chức vụ.';
        return false;
    }
    else {
        getEle('#tbChucVu').innerHTML = '';
        return true;
    }
}

function getEle(selector) {
    return document.querySelector(selector);
}