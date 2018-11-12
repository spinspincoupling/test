//socket
    var socket = io.connect('http://localhost:3000');

//Query

var searchid = document.getElementById('studentID');
    btnSearch = document.getElementById('search');
    btnNew = document.getElementById('new');
    btnSubmit = document.getElementById('submitinput');
    inputdiv = document.getElementById('input');
    inputid = document.getElementById('inputID');
    inputname = document.getElementById('inputname');
    inputgender = document.getElementById('inputgender');
    inputyear = document.getElementById('inputyear');
    inputfaculty = document.getElementById('inputfaculty');
    display = document.getElementById('displaynew');
    studentinfor = document.getElementById('infor');


//Evets
btnSubmit.addEventListener('click',function(){
    inputdiv.style.display = "none";
    if(inputid.value === "" || inputname.value === ""){
        alert("StudentID and name cannot be empty");
        return;
    }
    if(isNaN(parseInt(inputid.value))) {
        alert("Invalid studentID!");
        return;
    }
    socket.emit('add', {
        id: inputid.value,
        name: inputname.value,
        gender: inputgender.value,
        faculty: inputfaculty.value,
        year: inputyear.value
    });
    
});


btnSearch.addEventListener('click', function(){
    console.log('Readsomething');
    studentinfor.innerHTML = "";
    socket.emit('search', {
        id: searchid.value
    });
});


btnNew.addEventListener('click', function(){
    if(inputdiv.style.display == "none") {
        inputdiv.style.display = "block";
    } else {
        inputdiv.style.display = "none";
    }
    
});


socket.on('add',function(data){
    display.innerHTML += '<p> New student added' + '<br/> StudentID: ' + data.id 
                        + '<br/> Name: ' + data.name + '<br/> Gender: ' + data.gender 
                        + '<br/> Faculty: ' + data.faculty + '<br/> Year: ' + data.year +'</p>' ;
    display.style.display = "block";
    inputid.value = "";
    inputname.value = "";
    inputfaculty.value = "";
    inputgender.value = "";
    inputyear.value ="";
    setTimeout(function () {
        display.innerHTML = "";
        display.style.display = "none";
    }, 3000);
});



socket.on('search',function(data){
    searchid.value = "";
    if(!data) {
        alert("ID not found!");
        return;
    }
    studentinfor.innerHTML += '<p> StudentID: ' + data.id + '<br/> Name: ' 
                              + data.name + '<br/> Gender: ' + data.gender 
                              + '<br/> Faculty: ' + data.faculty + '<br/> Year: ' + data.year +'</p>' ;
});
    




