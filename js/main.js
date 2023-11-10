const firebaseConfig = {
    // config
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

function enroll(event) {
    event.preventDefault()

    let validationMessage = ""

    let cityName = document.querySelector("#cityName").value
    let courseName = document.querySelector("#courseName").value
    let fullName = document.querySelector("#fullName").value
    let fatherName = document.querySelector("#fatherName").value
    let email = document.querySelector("#email").value
    let phone = document.querySelector("#phone").value
    let cnic = document.querySelector("#cnic").value
    let dateOfBirth = document.querySelector("#dateOfBirth").value
    let gender = document.querySelector("#gender").value
    let lastQualification = document.querySelector("#lastQualification").value
    let address = document.querySelector("#address").value
    let timestamp = firebase.firestore.Timestamp.now().toMillis().value;

    // validations

    if (!email.endsWith("@gmail.com")) {
        validationMessage = ("Invalid email address";
        return;
    }

    if (
        courseName.trim() === ''
    ) {
        validationMessage = "Please select course"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (
        fullName.trim() === '' || fullName.length < 5 || fullName.length > 20
    ) {
        validationMessage = "Lengthen fullname 5 to 20 characters"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        validationMessage = "Please Select City"
        return;
    }

    if (cityName)

        db.collection("studentsData2023")
            .add({
                cityName: cityName,
                courseName: courseName,
                fullName: fullName,
                fatherName: fatherName,
                email: email,
                phone: phone,
                cnic: cnic,
                dateOfBirth: dateOfBirth,
                gender: gender,
                lastQualification: lastQualification,
                address: address,
                timestamp: timestamp,
            })
            .then(function (docRef) {
                // console.log("Document added successfully. ID:", docRef.id);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Enrolled Successfully'
                })

                event.target.reset()

            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

}

function renderStudent() {
    let container = document.querySelector(".results");
    container.innerHTML = "";

    db.collection("data")
        .orderBy("timestamp", "desc")
        .get()
        .then(function (querySnapshot) {
            if (querySnapshot.size === 0) {
                container.innerHTML = "<div class='not'>No Data Found</div>";
            } else {
                let table = document.createElement("table");
                let thead = document.createElement("thead");
                let tr = document.createElement("tr");
                let sNo = document.createElement("th");
                sNo.innerText = "No";
                let thName = document.createElement("th");
                thName.innerText = "Name";
                let thFather = document.createElement("th");
                thFather.innerText = "Father";
                let thRollNo = document.createElement("th");
                thRollNo.innerText = "Roll No";
                let thEng = document.createElement("th");
                thEng.innerText = "English";
                let thUrd = document.createElement("th");
                thUrd.innerText = "Urdu";
                let thMat = document.createElement("th");
                thMat.innerText = "Math";
                let thIsl = document.createElement("th");
                thIsl.innerText = "Islamiat";
                let thSin = document.createElement("th");
                thSin.innerText = "Sindhi";
                let thTotal = document.createElement("th");
                thTotal.innerText = "Total";
                let thObt = document.createElement("th");
                thObt.innerText = "Obt";
                let thPer = document.createElement("th");
                thPer.innerText = "Per %";
                let grade = document.createElement("th");
                grade.innerText = "Grade";
                let act = document.createElement("th");
                act.innerText = "Actions";

                tr.appendChild(sNo);
                tr.appendChild(thName);
                tr.appendChild(thFather);
                tr.appendChild(thRollNo);
                tr.appendChild(thEng);
                tr.appendChild(thUrd);
                tr.appendChild(thMat);
                tr.appendChild(thIsl);
                tr.appendChild(thSin);
                tr.appendChild(thTotal);
                tr.appendChild(thObt);
                tr.appendChild(thPer);
                tr.appendChild(grade);
                tr.appendChild(act);
                thead.appendChild(tr);
                table.appendChild(thead);

                let tbody = document.createElement("tbody");
                let num = 1
                querySnapshot.forEach(function (doc) {
                    let data = doc.data();
                    // console.log(data);
                    let tr = document.createElement("tr");

                    let sNo = document.createElement("td");
                    sNo.innerText = num++;
                    tr.appendChild(sNo);

                    let name = document.createElement("td");
                    name.innerText = data.name;
                    tr.appendChild(name);

                    let father = document.createElement("td");
                    father.innerText = data.father;
                    tr.appendChild(father);

                    let rollNo = document.createElement("td");
                    rollNo.innerText = data.rollNo;
                    tr.appendChild(rollNo);

                    let eng = document.createElement("td");
                    eng.innerText = data.eng;
                    if (Number(eng.innerText) < 33) {
                        eng.style.color = "#e55865"
                    }
                    tr.appendChild(eng);

                    let urd = document.createElement("td");
                    urd.innerText = data.urd;
                    if (Number(urd.innerText) < 33) {
                        urd.style.color = "#e55865"
                    }
                    tr.appendChild(urd);

                    let mat = document.createElement("td");
                    mat.innerText = data.mat;
                    if (Number(mat.innerText) < 33) {
                        mat.style.color = "#e55865"
                    }
                    tr.appendChild(mat);

                    let isl = document.createElement("td");
                    isl.innerText = data.isl;
                    if (Number(isl.innerText) < 33) {
                        isl.style.color = "#e55865"
                    }
                    tr.appendChild(isl);

                    let sin = document.createElement("td");
                    sin.innerText = data.sin;
                    if (Number(sin.innerText) < 33) {
                        sin.style.color = "#e55865"
                    }
                    tr.appendChild(sin);

                    let total = document.createElement("td")
                    total.innerText = 500;
                    tr.appendChild(total);

                    let obt = document.createElement("td")
                    obt.innerText = Number(data.eng) + Number(data.urd) + Number(data.mat) + Number(data.isl) + Number(data.sin);
                    tr.appendChild(obt);

                    let per = document.createElement("td")
                    per.innerText = (Number(obt.innerText) / 500 * 100).toFixed(2) + "%";
                    tr.appendChild(per);

                    let grade = document.createElement("td")
                    let percentage = per.innerText
                    let finalGrade = ""
                    if (percentage >= "80") {
                        finalGrade = "A+"
                    } else if (percentage >= "70") {
                        finalGrade = "A"
                    } else if (percentage >= "60") {
                        finalGrade = "B"
                    } else if (percentage >= "50") {
                        finalGrade = "C"
                    } else if (percentage >= "40") {
                        finalGrade = "D"

                    } else if (percentage >= "33") {
                        finalGrade = "E"

                    } else {
                        finalGrade = "Fail"
                    }

                    grade.innerText = finalGrade;
                    if (grade.innerText === "Fail") {
                        grade.style.color = "#e55865"
                    }
                    tr.appendChild(grade);

                    let buttons = document.createElement("td")
                    buttons.className += "row"

                    let edit = document.createElement("i")
                    edit.style.color = "#33b861"
                    edit.className += "bi bi-pencil-fill"
                    edit.addEventListener("click", function () {
                        editStudent(doc.id, data);
                    });
                    let del = document.createElement("i")
                    del.style.color = "#e55865"
                    del.className += "bi bi-trash-fill"
                    del.addEventListener("click", function () {
                        deleteStudent(doc.id);
                    });
                    buttons.appendChild(edit)
                    buttons.appendChild(del)
                    tr.appendChild(buttons);

                    tbody.appendChild(tr);
                });

                table.appendChild(tbody);
                container.appendChild(table);
            }
        })
        .catch(function (error) {
            console.error("Error getting documents: ", error);
        });
}

// delete

function deleteStudent(docId) {
    Swal.fire({
        title: 'Enter Password to Delete',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#15182b',
        cancelButtonColor: '#15182b',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        preConfirm: (password) => {
            const requiredPassword = '12345';

            if (password !== requiredPassword) {
                Swal.showValidationMessage('Invalid password');
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            db.collection("data").doc(docId).delete()
                .then(() => {
                    // console.log("Document deleted successfully.");
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Deleted Successfully'
                    })
                    renderStudent();
                })
                .catch((error) => {
                    console.error("Error deleting document: ", error);
                });
        }
    });
}

// edit

function editStudent(docId, currentData) {
    // console.log(currentData, docId)
    Swal.fire({
        title: 'Enter Password to Edit',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#15182b',
        cancelButtonColor: '#15182b',
        confirmButtonText: 'Edit',
        cancelButtonText: 'Cancel',
        preConfirm: (password) => {
            const requiredPassword = '12345';

            if (password !== requiredPassword) {
                Swal.showValidationMessage('Invalid password');
            } else {
                // Show the edit form with current data
                Swal.fire({
                    title: 'Edit Student',
                    html: `
                    <input placeholder="Name" id="editName" class="swal2-input" value="${currentData.name}" required>
                    <input placeholder="Father" id="editFather" class="swal2-input" value="${currentData.father}" required>
                    <input placeholder="Roll No" id="editRollNo" class="swal2-input" value="${currentData.rollNo}" type="number" required>
                    <input placeholder="English" id="editEng" class="swal2-input" value="${currentData.eng}" type="number" min="0" max="100" step="0.1" required>
                    <input placeholder="Urdu" id="editUrd" class="swal2-input" value="${currentData.urd}" type="number" min="0" max="100" step="0.1" required>
                    <input placeholder="Math" id="editMat" class="swal2-input" value="${currentData.mat}" type="number" min="0" max="100" step="0.1" required>
                    <input placeholder="Sindhi" id="editSin" class="swal2-input" value="${currentData.sin}" type="number" min="0" max="100" step="0.1" required>
                    <input placeholder="Islamiat" id="editIsl" class="swal2-input" value="${currentData.isl}" type="number" min="0" max="100" step="0.1" required>
                    `,
                    showCancelButton: true,
                    confirmButtonColor: '#15182b',
                    cancelButtonColor: '#15182b',
                    confirmButtonText: 'Save',
                    cancelButtonText: 'Cancel',
                    preConfirm: () => {
                        // Check for empty fields
                        const editName = document.getElementById('editName').value;
                        const editFather = document.getElementById('editFather').value;
                        const editRollNo = document.getElementById('editRollNo').value;
                        const editEng = parseFloat(document.getElementById('editEng').value);
                        const editUrd = parseFloat(document.getElementById('editUrd').value);
                        const editMat = parseFloat(document.getElementById('editMat').value);
                        const editSin = parseFloat(document.getElementById('editSin').value);
                        const editIsl = parseFloat(document.getElementById('editIsl').value);

                        // Validate subject marks to be within the range of 0 to 100
                        if (
                            editName.trim() === '' ||
                            editFather.trim() === '' ||
                            editRollNo.trim() === '' ||
                            isNaN(editEng) || editEng < 0 || editEng > 100 ||
                            isNaN(editUrd) || editUrd < 0 || editUrd > 100 ||
                            isNaN(editMat) || editMat < 0 || editMat > 100 ||
                            isNaN(editSin) || editSin < 0 || editSin > 100 ||
                            isNaN(editIsl) || editIsl < 0 || editIsl > 100 ||
                            editName.length > 10 || editName.length < 4 ||
                            editFather.length > 10 || editFather.length < 4 ||
                            editRollNo > 999999
                        ) {
                            Swal.showValidationMessage('Please fill in all fields with valid subject marks (0-100) and valid length of fields');
                            return false;
                        }

                        // Get the edited data from the form
                        const editedData = {
                            name: editName,
                            father: editFather,
                            rollNo: parseInt(editRollNo),
                            eng: editEng,
                            urd: editUrd,
                            mat: editMat,
                            sin: editSin,
                            isl: editIsl
                        };
                        // Update the data in Firestore
                        db.collection("data").doc(docId).update(editedData)
                            .then(() => {
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 1000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.addEventListener('mouseenter', Swal.stopTimer)
                                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                });

                                Toast.fire({
                                    icon: 'success',
                                    title: 'Edited Successfully'
                                });
                                renderStudent(); // Render the updated student list
                            })
                            .catch((error) => {
                                console.error("Error updating document: ", error);
                            });
                    }
                });
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderStudent();
});

function pictureInput(e) {

    e.preventDefault()

    let pictureInput = URL.createObjectURL(e.target.files[0])

    let selectedPicture = document.querySelector("#selectedPictureOutput")

    selectedPicture.src = pictureInput

    console.log("run");

}