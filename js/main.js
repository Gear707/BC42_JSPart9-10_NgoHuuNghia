queSel = (selector) => document.querySelector(selector);

getID = (ID) => document.getElementById(ID);

// Thêm mới nhân viên
queSel('#btnThemNV').addEventListener('click', () => {
    // input: dữ liệu đầu vào của nhân viên
    let account = String(queSel('#tknv').value); // input tài khoản
    let checkAcc = validateAcc(account); // kiểm tra input tài khoản

    let fullName = String(queSel('#name').value); // input họ tên
    let checkName = validateName(fullName); // kiêm tra input họ tên

    let email = queSel('#email').value;
    let password = queSel('#password').value;
    let date = queSel('#datepicker').value;
    let baseSalary = +queSel('#luongCB').value;
    let position = queSel('#chucvu').value;
    let hours = +queSel('#gioLam').value;

    // tạo biến đối tượng cho lớp đối tượng StaffInfo, tương ứng là các tham số truyền vào từ input
    let staff = new StaffInfo(account, fullName, email, password, date, baseSalary, position, hours);

    // progress: tạo biến chứa value mà user đã nhập cho mỗi thuộc tính trong lớp đối tượng nhân viên
    let tdAccount = '<td>' + staff.account + '</td>';
    let tdFullName = '<td>' + staff.fullName + '</td>';
    let tdEmail = '<td>' + staff.email + '</td>';
    let tdDate = '<td>' + staff.date + '</td>';
    let tdPosition = '<td>' + staff.position + '</td>';
    let tdTotalSalary = '<td>' + staff.totalSalary() + '</td>';
    let tdCategory = '<td>' + staff.category() + '</td>';
    let tdEditDelete = '<td>' + '<button type="button" class="btn btn-info mr-1">Edit</button>' + '<button type="button" class="btn btn-danger ml-1">Delete</button>' + '</td>';

    // tạo biến chứa 1 hàng dữ liệu tương ứng mà user đã nhập
    let tr = '<tr>' + tdAccount + tdFullName + tdEmail + tdDate + tdPosition + tdTotalSalary + tdCategory + tdEditDelete + '</tr>';

    // output: hiển thị dữ liệu đã nhập dưới dạng table danh sách nhân viên
    let tbody = getID('tableDanhSach');

    // trước khi in ra danh sách nhân viên phải kiểm tra tất cả các field xem dữ liệu đã nhập có hợp lệ hay không
    if (position === '0') {
        alert('Vui lòng chọn chức vụ.');
    }
    else if (!checkAcc) {
        queSel('#tbTKNV').innerHTML = 'Tài khoản phải được nhập bằng số.';
    }
    else if (account.length < 4 || account.length > 6){
        queSel('#tbTKNV').innerHTML = 'Tài khoản phải nhập từ 4 đến 6 ký số.';
    }
    else if (!checkName){
        queSel('#tbTen').innerHTML = 'Tên nhân viên phải là chữ.';
    }
    else {
        tbody.innerHTML += tr;
    }
});

// Tạo hàm kiểm tra tài khoản
validateAcc = (acc) => {
    let numbers = /^[0-9]+$/;

    getID('tbTKNV').style.display = 'block';

    if (acc.match(numbers)) {
        return true;
    }
    else {
        return false;
    }
}

// Tạo hàm kiểm tra họ tên
validateName = (name) => {
    let letters = new RegExp("^[A-Za-z]+$");

    getID('tbTen').style.display = 'block';

    if (letters.test(name)) {
        return true;
    }
    else {
        return false;
    }
}