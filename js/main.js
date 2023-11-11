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

function enroll(event) {

    event.preventDefault()

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
    let timestamp = `${new Date()}`
    let status = "Pending"
    let img = document.querySelector("#picture").files[0]

    // validations


    if (
        email.trim() === ''
    ) {
        let validationMessage = "Please enter email"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    if (!email.endsWith("@gmail.com")) {
        let validationMessage = "Invalid Email"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    if (
        courseName.trim() === ''
    ) {
        let validationMessage = "Please select course"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    if (
        cityName.trim() === ''
    ) {
        let validationMessage = "Please Select City"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    if (
        fullName.trim() === '' || fullName.length < 5 || fullName.length > 20
    ) {
        let validationMessage = "Lengthen Full Name 5 to 20 characters"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    if (
        fatherName.trim() === ''
    ) {
        let validationMessage = "Lengthen Father Name 5 to 20 characters"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    if (
        phone.trim() === ''
    ) {
        let validationMessage = "Please enter Phone Number"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    const phoneRegex = /^03[0-9]{9}$/;

    if (!phoneRegex.test(phone)) {
        let validationMessage = "Invalid Phone Number"
        document.querySelector("#validationMessage").innerText = validationMessage
    }

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

    if (
        dateOfBirth.trim() === ''
    ) {
        let validationMessage = "Please Select Date Of Birth"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    if (
        gender.trim() === ''
    ) {
        let validationMessage = "Please Select Gender"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }


    if (
        lastQualification.trim() === ''
    ) {
        let validationMessage = "Please Select Last Qualifictaion"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    if (
        address.trim() === ''
    ) {
        let validationMessage = "Please emter your address"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    if (
        !img
    ) {
        let validationMessage = "Please select image"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    // file size validation

    if (img.size > 1000000) {
        let validationMessage = "Select image less than 1 MB"
        document.querySelector("#validationMessage").innerText = validationMessage
        return;
    }

    document.querySelector(".submit").innerHTML = `<span class="loader"></span>`

    // check if student already enrolled

    var isAlreadyEnrolled = false;

    db.collection("studentsData2023")
        .get()
        .then(function (querySnapshot) {
            if (querySnapshot.size !== 0) {

                querySnapshot.forEach(function (doc) {
                    let data = doc.data();

                    if (cnic === data.cnic || email === data.email) {
                        let validationMessage = "Student Already Enrolled"
                        document.querySelector("#validationMessage").innerText = validationMessage
                        document.querySelector(".submit").innerText = "+ Submit"
                        isAlreadyEnrolled = true
                        return;
                    }

                    if (!isAlreadyEnrolled) {

                        // image upload to firebase

                        let fileref = firebase.storage().ref().child(`/students/profilePicture/${img.filename}/${new Date().getTime()}`)
                        let uploadTask = fileref.put(img)

                        uploadTask.on('state_changed',
                            (snapshot) => {
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                // console.log('Upload is ' + progress + '% done');
                            },
                            (error) => {
                                console.log(error)
                            },
                            () => {
                                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                    // console.log('File available at', downloadURL);

                                    // add student to database

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
                                            image: downloadURL,
                                            status: status,
                                            rollNo: "",
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

                                            document.querySelector(".submit").innerText = "+ Submit"
                                            event.target.reset()
                                            document.querySelector("#selectedPictureOutput").src = "../assets/upload.PNG"

                                        })
                                        .catch(function (error) {
                                            console.error("Error adding document: ", error);
                                        });

                                });
                            }
                        );


                    }

                });

            }
        })
        .catch(function (error) {
            console.error("Error getting documents: ", error);
        });

}

function pictureInput(e) {

    e.preventDefault()

    let pictureInput = URL.createObjectURL(e.target.files[0])

    let selectedPicture = document.querySelector("#selectedPictureOutput")

    selectedPicture.src = pictureInput

}
