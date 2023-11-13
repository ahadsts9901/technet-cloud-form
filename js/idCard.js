const firebaseConfig = {
    apiKey: "AIzaSyCtn1vByh5Icc1u7SfpdUanh_M18V77GMg",
    authDomain: "resume-sts-17a3d.firebaseapp.com",
    projectId: "resume-sts-17a3d",
    storageBucket: "resume-sts-17a3d.appspot.com",
    messagingSenderId: "1084591198105",
    appId: "1:1084591198105:web:294ea8b0f70d8bce388d08",
    measurementId: "G-QPMRCNPQV5"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

function getCard(event) {

    event.preventDefault()

    let container = document.querySelector(".results");
    container.innerHTML = "";

    let cnic = document.querySelector("#cnic").value

    // validations

    if (
        cnic.trim() === ''
    ) {
        let validationMessage = "Please enter CNIC"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    if (
        cnic.length != 13
    ) {
        let validationMessage = "Invalid CNIC"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    document.querySelector(".submit").innerHTML = `<span class="loader"></span>`

    db.collection("studentsData2023")
        .get()
        .then(function (querySnapshot) {

            let isDataFound = false;

            querySnapshot.forEach(function (doc) {
                let data = doc.data();

                if (cnic === data.cnic) {

                    let table = document.createElement("table");
                    let thead = document.createElement("thead");
                    let trH = document.createElement("tr");
                    let sNoH = document.createElement("th");
                    sNoH.innerText = "No";
                    let thImage = document.createElement("th");
                    thImage.innerText = "Image";
                    let thName = document.createElement("th");
                    thName.innerText = "Name";
                    let thFather = document.createElement("th");
                    thFather.innerText = "Father";
                    let thRollNo = document.createElement("th");
                    thRollNo.innerText = "Roll No";
                    let thCNIC = document.createElement("th");
                    thCNIC.innerText = "CNIC";
                    let thCourse = document.createElement("th");
                    thCourse.innerText = "Course";
                    let thActions = document.createElement("th");
                    thActions.innerText = "Action";

                    trH.appendChild(sNoH)
                    trH.appendChild(thImage);
                    trH.appendChild(thName);
                    trH.appendChild(thFather);
                    trH.appendChild(thRollNo);
                    trH.appendChild(thCNIC);
                    trH.appendChild(thCourse);
                    trH.appendChild(thActions)
                    thead.appendChild(trH);
                    table.appendChild(thead);

                    let tbody = document.createElement("tbody");
                    let num = 1

                    isDataFound = true;

                    let validationMessage = "Student Found";
                    document.querySelector("#validationMessage").innerText = validationMessage;
                    document.querySelector(".submit").innerText = "+ Submit";

                    // console.log(data);

                    container.style.display = "flex"
                    document.querySelector(".center").style.display = "block"

                    // show student details

                    let tr = document.createElement("tr");

                    let sNo = document.createElement("td");
                    sNo.innerText = num++;
                    tr.appendChild(sNo);

                    let imgTD = document.createElement("td");
                    let img = document.createElement("img")
                    img.src = data.image
                    img.className += "tdImage"
                    imgTD.appendChild(img)
                    tr.appendChild(imgTD);

                    let name = document.createElement("td");
                    name.innerText = data.fullName;
                    tr.appendChild(name);

                    let father = document.createElement("td");
                    father.innerText = data.fatherName;
                    tr.appendChild(father);

                    let rollNo = document.createElement("td");
                    rollNo.innerText = data.rollNo || "";
                    tr.appendChild(rollNo);

                    let cnic = document.createElement("td");
                    cnic.innerText = data.cnic || "";
                    tr.appendChild(cnic);

                    let courseName = document.createElement("td");
                    courseName.innerText = data.courseName;
                    tr.appendChild(courseName);

                    let actions = document.createElement("td")

                    let downLoad = document.createElement("i")
                    downLoad.className += "bi bi-save"
                    downLoad.addEventListener("click", function () {
                        generateAndDownloadPDF(data)
                    });

                    function generateAndDownloadPDF(studentData) {
                        // Create an HTML element containing the student details
                        let cardContent = `
                            <div class="stdCard">
                                <p><strong>Name:</strong> ${studentData.fullName}</p>
                                <p><strong>Father:</strong> ${studentData.fatherName}</p>
                                <p><strong>Roll No:</strong> ${studentData.rollNo}</p>
                                <p><strong>Course:</strong> ${studentData.courseName}</p>
                                <!-- Add more details as needed -->
                            </div>
                        `;

                        // Convert HTML to PDF using html2pdf.js
                        html2pdf(cardContent, {
                            margin: 10,
                            filename: 'student_id_card.pdf',
                            image: { type: 'jpeg', quality: 0.98 },
                            html2canvas: { scale: 2 },
                            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                        }).then(function (pdf) {
                            // Automatically download the PDF
                            pdf.save();
                        });
                    }

                    // id card function

                    actions.appendChild(downLoad)
                    tr.appendChild(actions);

                    tbody.appendChild(tr);

                    table.appendChild(tbody);
                    container.appendChild(table);

                }
            });

            if (!isDataFound) {
                let validationMessage = "No Data Found";
                document.querySelector("#validationMessage").innerText = validationMessage;
                document.querySelector(".submit").innerText = "+ Submit";
            }
        })
        .catch(function (error) {
            console.error("Error getting documents: ", error);
        });

    event.target.reset()

}

window.addEventListener("load", function () {

    document.querySelector("#cnic").value = localStorage.getItem("techNetCLoudNicStd")

    setTimeout(() => {
        localStorage.removeItem("techNetCLoudNicStd")
    }, 10000)

})