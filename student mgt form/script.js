/* Beginning of navbar page */

const toggleBtn = document.querySelector(".toggleBtn");
const navMenu = document.querySelector(".nav-menu");

toggleBtn.addEventListener("click", bond);

function bond(){
    toggleBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
}

// Registration Page begins here

function validate(){

    if( document.StudentRegistration.textnames.value == "" )
    {
      alert( "Please provide your Name!" );
      document.StudentRegistration.textnames.focus() ;
      return false;
    }
 
    if( document.StudentRegistration.fathername.value == "" )
    {
      alert( "Please provide your Father Name!" );
      document.StudentRegistration.fathername.focus() ;
      return false;
    }
    
    if( document.StudentRegistration.paddress.value == "" )
    {
      alert( "Please provide your Postal Address!" );
      document.StudentRegistration.paddress.focus() ;
      return false;
    }
 
    if( document.StudentRegistration.personaladdress.value == "" )
    {
      alert( "Please provide your Personal Address!" );
      document.StudentRegistration.personaladdress.focus() ;
      return false;
    }
 
    if ( ( StudentRegistration.sex[0].checked == false ) && ( StudentRegistration.sex[1].checked == false ) )
    {
    alert ( "Please choose your Gender: Male or Female" );
    return false;
    }
 
   
 
    if( document.StudentRegistration.Course.value == "-1" )
    {
      alert( "Please provide your Course!" );
     
      return false;
    } 
      
   
 
  var email = document.StudentRegistration.emailid.value;
   atpos = email.indexOf("@");
   dotpos = email.lastIndexOf(".");
  if (email == "" || atpos < 1 || ( dotpos - atpos < 2 )) 
  {
      alert("Please enter correct email ID")
      document.StudentRegistration.emailid.focus() ;
      return false;
  }
 
   if( document.StudentRegistration.mobileno.value == "" ||
            isNaN( document.StudentRegistration.mobileno.value) ||
            document.StudentRegistration.mobileno.value.length != 10 )
    {
      alert( "Please provide a Mobile No in the format 123." );
      document.StudentRegistration.mobileno.focus() ;
      return false;
    }
    return( true );
 }

//  registration ends here

// attendance begins here

(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());