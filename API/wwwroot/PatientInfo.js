

  $(document).ready(function() {
    
    $('#date-of-birth').change(function() {
      var dob = new Date($(this).val());
      var today = new Date();
      var age = today.getFullYear() - dob.getFullYear();
      var monthDifference = today.getMonth() - dob.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      $('#age').val(age);
    });
  


  $('#patient-form').submit(function(event) {
    event.preventDefault();

    
    var patientData = {
      nationalNumber: $('#national-number').val(),
      englishName: $('#english-name').val(),
      firstArabicNameLName: $('#Arabic-First-Name').val(),
      secondArabicNameTName: $('#Arabic-Second-Name').val(),
      thirdArabicNameSName: $('#Arabic-Third-Name').val(),
      lastArabicNameFName: $('#Arabic-Last-Name').val(),
      phoneNumber: $('#phone-number').val(),
      telephone: $('#telephone').val(),
      patientEmail: $('#email').val(),
      password: $('#password').val(),
      maritalStatus: $('#marital-status').val(),
      discount: $('#discount').val(),
      country: $('#country').val(),
      age: $('#age').val(),
      dateOfBirth: $('#date-of-birth').val(),
      gender: $('#gender').val()
    };

    console.log("Patient Data:", patientData); 

    // إرسال البيانات إلى واجهة API باستخدام AJAX
    $.ajax({
      url: 'https://localhost:5001/api/patients', 
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(patientData),
      success: function(response) {
        console.log("API Response:", response); 
        alert('Patient added successfully!');
        $('#patient-form')[0].reset(); 
      },
      error: function(xhr, status, error) {
        console.log("Error Status:", status); 
        console.log("Error Details:", error);
        console.log("XHR Object:", xhr); 
        console.log("Response Text:", xhr.responseText); 
        alert('Error adding patient: ' + xhr.responseText);
      }
    });
  });
});
