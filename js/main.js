// Tạo mảng chứa danh sách nhân viên
let staffList = getStaffList();
console.log('staffList', staffList);

// Hiển thị danh sách staff ra UI khi mở site
renderTable(staffList);


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

    // kiểm tra tính hợp lệ của các input
    let isValid = validateData();
    if (!isValid) {
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

    // lưu staffList xuống localStorage
    storeStaffList();
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

    // lưu staffList xuống localStorage
    storeStaffList();
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

    // kiểm tra tính hợp lệ của các input
    let isValid = validateData();
    if (!isValid) {
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

    // lưu staffList xuống localStorage
    storeStaffList();
})


// Hàm validate các dữ liệu đầu vào
function validateData() {
    let isValid = true;

    // kiểm tra acc
    let acc = getEle('#tknv').value;
    const numbers = /^[0-9]{4,6}$/;

    getEle('#tbTKNV').style.display = 'block';

    if (acc.match(numbers)) {
        getEle('#tbTKNV').innerHTML = '';
    }
    else if (!acc.trim()) {
        isValid = false;
        getEle('#tbTKNV').innerHTML = 'Tài khoản không được để trống';
    }
    else {
        isValid = false;
        getEle('#tbTKNV').innerHTML = 'Tài khoản phải có từ 4 ~ 6 ký số';
    }

    // kiểm tra họ tên
    let name = getEle('#name').value;
    // const letters = new RegExp("^[A-Za-z]+$");
    // tạo biểu thức chính quy cho phép nhập tiếng việt
    const letters = new RegExp(
        "^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+$"
        );

    getEle('#tbTen').style.display = 'block';

    if (letters.test(name)) {
        getEle('#tbTen').innerHTML = '';
    }
    else if (!name.trim()) {
        isValid = false;
        getEle('#tbTen').innerHTML = 'Tên nhân viên không được để trống';
    }
    else {
        isValid = false;
        getEle('#tbTen').innerHTML = 'Tên nhân viên không hợp lệ';
    }

    // kiểm tra email
    let email = getEle('#email').value;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    getEle('#tbEmail').style.display = 'block';

    if (!email.trim()) {
        isValid = false;
        getEle('#tbEmail').innerHTML = 'Email không được để trống';
    }
    else if (!email.match(mailFormat)) {
        isValid = false;
        getEle('#tbEmail').innerHTML = 'Email không hợp lệ';
    }
    else {
        getEle('#tbEmail').innerHTML = '';
    }

    // kiểm tra password
    let password = getEle('#password').value;
    const passFormat = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10})/;

    getEle('#tbMatKhau').style.display = 'block';

    if (!password.trim()) {
        isValid = false;
        getEle('#tbMatKhau').innerHTML = 'Mật khẩu không được để trống';
    }
    else if (!password.match(passFormat)) {
        isValid = false;
        getEle('#tbMatKhau').innerHTML = 'Mật khẩu từ 6 ~ 10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt)';
    }
    else {
        getEle('#tbMatKhau').innerHTML = '';
    }

    // kiểm tra ngày làm
    let date = getEle('#datepicker').value;
    const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

    getEle('#tbNgay').style.display = 'block';

    if (!date.trim()) {
        isValid = false;
        getEle('#tbNgay').innerHTML = 'Ngày làm không được để trống';
    }
    else if (!date.match(dateFormat)) {
        isValid = false;
        getEle('#tbNgay').innerHTML = 'Ngày làm phải theo đúng định dạng DD/MM/YYYY';
    }
    else {
        getEle('#tbNgay').innerHTML = '';
    }

    // kiểm tra lương cơ bản
    let baseSalary = getEle('#luongCB').value;

    getEle('#tbLuongCB').style.display = 'block';

    if (!baseSalary.trim()) {
        isValid = false;
        getEle('#tbLuongCB').innerHTML = 'Lương cơ bản không được để trống'
    }
    else if (Number(baseSalary) < 1e+6 || Number(baseSalary) > 20e+6) {
        isValid = false;
        getEle('#tbLuongCB').innerHTML = 'Lương cơ bản phải nằm trong phạm vi 1,000,000 ~ 20,000,000';
    }
    else {
        getEle('#tbLuongCB').innerHTML = '';
    }

    // kiểm tra chức vụ
    let position = getEle('#chucvu').value;

    getEle('#tbChucVu').style.display = 'block';

    if (position === 'Chọn chức vụ') {
        isValid = false;
        getEle('#tbChucVu').innerHTML = 'Vui lòng chọn chức vụ hợp lệ';
    }
    else {
        getEle('#tbChucVu').innerHTML = '';
    }

    // kiểm tra số giờ làm trong tháng
    let hours = getEle('#gioLam').value;

    getEle('#tbGiolam').style.display = 'block';

    if (!hours.trim()) {
        isValid = false;
        getEle('#tbGiolam').innerHTML = 'Số giờ làm không được để trống';
    }
    else if (Number(hours) < 80 || Number(hours) > 200) {
        isValid = false;
        getEle('#tbGiolam').innerHTML = 'Số giờ làm phải nằm trong khoảng 80 ~ 200 giờ';
    }
    else {
        getEle('#tbGiolam').innerHTML = '';
    }

    return isValid;
}


// Hàm lưu thông tin staff xuống localStorage
function storeStaffList() {
    // chuyển mảng staffList thành JSON
    const json = JSON.stringify(staffList);

    // lưu xuống localStorage với key là staffList
    localStorage.setItem("staffList", json);
}


// Hàm lấy thông tin staff từ localStorage
function getStaffList() {
    // lấy data từ localStorage với key là staffList
    const json = localStorage.getItem("staffList");

    // nếu localStorage không có data thì trả về mảng rỗng
    if (!json) {
        return [];
    }

    // chuyển JSON thành kiểu dữ liệu array
    const staffList = JSON.parse(json);
    for (let i = 0; i < staffList.length; i++) {
        const staff = staffList[i];
        staffList[i] = new StaffInfo(
            staff.account,
            staff.fullName,
            staff.email,
            staff.password,
            staff.date,
            staff.baseSalary,
            staff.position,
            staff.hours
        );
    }

    return staffList;
}

function getEle(selector) {
    return document.querySelector(selector);
}