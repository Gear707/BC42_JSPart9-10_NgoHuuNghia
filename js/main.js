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

    // kiểm tra tất cả các field xem dữ liệu đã nhập có hợp lệ hay không
    let checkAcc = validateAcc();
    let checkName = validateName();
    let checkEmail = validateEmail();
    let checkPassword = validatePassword();
    let checkDate = validateDate();
    let checkSalary = validateSalary();
    let checkPosition = validatePosition();
    let checkHours = validateHours();

    if (!checkAcc) {
        return;
    }
    if (!checkName) {
        return;
    }
    if (!checkEmail) {
        return;
    }
    if (!checkPassword) {
        return;
    }
    if (!checkDate) {
        return;
    }
    if (!checkSalary) {
        return;
    }
    if (!checkPosition) {
        return;
    }
    if (!checkHours) {
        return;
    }

    // tạo object nhân viên
    const staff = new StaffInfo(
        account, fullName, email, password, date, baseSalary, position, hours
    );

    // thêm object nhân viên vào mảng staffList
    staffList.push(staff);

    // gọi hàm renderTable để hiển thị danh sách nhân viên
    renderTable(staffList);

    // gọi hàm reserForm để xóa hết các dữ liệu đã nhập
    resetForm();
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
            <td>${staff.totalSalary().toLocaleString()}</td>
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

    // enable trường account & button thêm nhân viên
    getEle('#btnThemNV').disabled = false;
    getEle('#tknv').disabled = false;
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

    // kiểm tra tất cả các field xem dữ liệu đã nhập có hợp lệ hay không
    let checkAcc = validateAcc();
    let checkName = validateName();
    let checkEmail = validateEmail();
    let checkPassword = validatePassword();
    let checkDate = validateDate();
    let checkSalary = validateSalary();
    let checkPosition = validatePosition();
    let checkHours = validateHours();

    if (!checkAcc) {
        return;
    }
    if (!checkName) {
        return;
    }
    if (!checkEmail) {
        return;
    }
    if (!checkPassword) {
        return;
    }
    if (!checkDate) {
        return;
    }
    if (!checkSalary) {
        return;
    }
    if (!checkPosition) {
        return;
    }
    if (!checkHours) {
        return;
    }

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
    let numbers = /^[0-9]{4,6}$/;

    getEle('#tbTKNV').style.display = 'block';

    if (acc.match(numbers)) {
        getEle('#tbTKNV').innerHTML = '';
        return true;
    }
    else {
        getEle('#tbTKNV').innerHTML = 'Tài khoản phải có từ 4 ~ 6 ký số.';
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


// Hàm kiểm tra mật khẩu
function validatePassword() {
    let password = getEle('#password').value;
    let passFormat = /^([A-Z]){1}([\w_\.!@#$%^&*()]+){6,10}$/;

    getEle('#tbMatKhau').style.display = 'block';

    if (password.match(passFormat)) {
        getEle('#tbMatKhau').innerHTML = '';
        return true;
    }
    else {
        getEle('#tbMatKhau').innerHTML = 'Mật khẩu từ 6 ~ 10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt)';
        return false;
    }
}


// Hàm kiểm tra ngày làm
function validateDate() {
    let date = getEle('#datepicker').value;

    getEle('#tbNgay').style.display = 'block';

    if (date === '' || date === null) {
        getEle('#tbNgay').innerHTML = 'Ngày làm không được để trống';
        return false;
    }
    else {
        getEle('#tbNgay').innerHTML = '';
        return true;
    }
}


// Hàm kiểm tra lương cơ bản
function validateSalary() {
    let baseSalary = +getEle('#luongCB').value;

    getEle('#tbLuongCB').style.display = 'block';

    if (baseSalary < 1e+6 || baseSalary > 20e+6) {
        getEle('#tbLuongCB').innerHTML = 'Lương cơ bản phải nằm trong phạm vi 1,000,000 ~ 20,000,000';
        return false;
    }
    else {
        getEle('#tbLuongCB').innerHTML = '';
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


// Hàm kiểm tra số giờ làm trong tháng
function validateHours() {
    let hours = +getEle('#gioLam').value;

    getEle('#tbGiolam').style.display = 'block';

    if (hours < 80 || hours > 200) {
        getEle('#tbGiolam').innerHTML = 'Số giờ làm phải nằm trong khoảng 80 ~ 200 giờ';
        return false;
    }
    else {
        getEle('#tbGiolam').innerHTML = '';
        return true;
    }
}

function getEle(selector) {
    return document.querySelector(selector);
}