// show data from the table
let showdata = document.getElementById("show_data");

function showData() {
    showdata.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "read.php", true);
    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let z = 0; // to give the serial no. continues
            data.forEach(function (item) {
                z++;
                let row = document.createElement("tr");
                row.innerHTML = "<td>" + z + "</td><td>" + item.name +
                    "</td><td>" + item.email + "</td><td>" + item.city +
                    "</td><td>" + item.phone + "</td><td><button class='btn btn-warning btn-edit' data-sid=" + item.id + ">Edit</button>&nbsp;<button class='btn btn-danger btn-delete' data-sid=" + item.id + ">Delete</button></td>"; // varial z is for give the serial no. continues
                showdata.appendChild(row);
            });

        } else {
            console.log("Error");
        }
        delete_data();
        update_data();
    }
    xhr.send();
}
showData(); // call the function of showData to display the code


// Ajax for add the data to database
document.getElementById("student_add_ajax").addEventListener("click", add_student);

function add_student(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let city = document.getElementById("city").value;
    let phone = document.getElementById("phone").value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "insert.php", true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
        if (xhr.status === 200) {
            document.getElementById("msg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' + xhr.responseText + '</div>';

            document.getElementById("form").reset();

            var modal = bootstrap.Modal.getInstance(document.getElementById('Add_data'));
            modal.hide();

            showData();

            setTimeout(function () {
                document.getElementById("msg").innerHTML = '';
            }, 10000);

        } else {
            console.log("error.");
        }
    }

    const mydata = { name: name, email: email, city: city, phone: phone };

    const data = JSON.stringify(mydata);

    xhr.send(data);
}

//delete the data using btn
function delete_data() {
    var UpdateButton = document.getElementsByClassName("btn-delete");
    for (let i = 0; i < UpdateButton.length; i++) {
        UpdateButton[i].addEventListener("click", function () {
            let id = UpdateButton[i].getAttribute("data-sid");
            document.getElementById("sid").value = id;

            var deleteModal = new bootstrap.Modal(document.getElementById('Delete_data'));
            deleteModal.show();
        });
    }

    document.getElementById("student_delete_ajax").addEventListener("click", function () {
        let studentId = document.getElementById("sid").value;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "delete.php", true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onload = () => {
            if (xhr.status == 200) {

                document.getElementById("msg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert">\
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
                ' + xhr.responseText + '</div>';
                setTimeout(function () {
                    document.getElementById("msg").innerHTML = '';
                }, 10000);

                var deleteModal = bootstrap.Modal.getInstance(document.getElementById('Delete_data'));
                deleteModal.hide();

                var showDataElement = document.getElementById('show_data');
                if (showDataElement) {
                    showDataElement.innerHTML = '';
                }

                showData();
            } else {
                console.log("error.");
            }
        };

        const mydata = { sid: studentId };
        const data = JSON.stringify(mydata);
        xhr.send(data);
    });
}

// update the data using form and display the old display on from
function update_data() {
    var updateButton = document.getElementsByClassName("btn-edit");

    //Update Model show
    for (let i = 0; i < updateButton.length; i++) {
        updateButton[i].addEventListener("click", function () {
            let id = updateButton[i].getAttribute('data-sid');

            document.getElementById("sid").value = id;

            var updateModal = new bootstrap.Modal(document.getElementById('Update_data'));
            updateModal.show();

            fetchDataAndFillForm(id);
        });
    }

    function fetchDataAndFillForm(studentId) {

        let name = document.getElementById("up_name");
        let email = document.getElementById("up_email");
        let city = document.getElementById("up_city");
        let phone = document.getElementById("up_phone");

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "update_fatch.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");


        xhr.onload = () => {
            if (xhr.status == 200) {
                if (xhr.responseText) {
                    const responseData = JSON.parse(xhr.responseText);

                    name.value = responseData.name || "";
                    email.value = responseData.email || "";
                    city.value = responseData.city || "";
                    phone.value = responseData.phone || "";
                } else {
                    console.log("empty or invalid response.");
                }
            } else {
                console.log("Error: " + xhr.status);
            }
        };

        const mydata = { sid: studentId };
        const data = JSON.stringify(mydata);
        xhr.send(data);
    }

    document.getElementById("student_upd_ajax").addEventListener("click", function () {
        let upid = document.getElementById("sid").value;
        let upname = document.getElementById("up_name").value;
        let upemail = document.getElementById("up_email").value;
        let upcity = document.getElementById("up_city").value;
        let upphone = document.getElementById("up_phone").value;

        const xhr = new XMLHttpRequest();
        xhr.open("POSt", "update.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            if (xhr.status == 200) {
                document.getElementById("msg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert">\
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
                ' + xhr.responseText + '</div>';

                var modal = bootstrap.Modal.getInstance(document.getElementById('Update_data'));
                modal.hide();

                var showDataElement = document.getElementById('show_data');
                if (showDataElement) {
                    showDataElement.innerHTML = "";
                }
                setTimeout(function () {
                    document.getElementById("msg").innerHTML = '';
                }, 10000);

                showData();
            } else {
                console.log("Error on update data");
            }
        };

        const mydata = { id: upid, name: upname, email: upemail, city: upcity, phone: upphone };

        const data = JSON.stringify(mydata);

        xhr.send(data);
    });
}







