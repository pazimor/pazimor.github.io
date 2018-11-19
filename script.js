/* partie modal */
var modal1 = document.getElementById('myModal');
var modal2 = document.getElementById('myModal2');
var modal3 = document.getElementById('myModal3');

var btn3 = document.getElementById("contact");
var btn2 = document.getElementById("projets");
var btn1 = document.getElementById("cv");
var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
var span3 = document.getElementsByClassName("close")[2];

btn3.onclick = function() {
    document.getElementById("img").style.marginTop = "1000px";
    modal1.style.display = "block";
    modal2.style.display = "none";
    modal3.style.display = "none";
}

btn2.onclick = function() {
    document.getElementById("img").style.marginTop = "1000px";
    modal2.style.display = "block";
    modal1.style.display = "none";
    modal3.style.display = "none";
}

btn1.onclick = function() {
    document.getElementById("img").style.marginTop = "1000px";
    modal3.style.display = "block";
    modal2.style.display = "none";
    modal1.style.display = "none";
}

span1.onclick = function() {
    document.getElementById("img").style.marginTop = "0";
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
}

span2.onclick = function() {
    document.getElementById("img").style.marginTop = "0";
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
}

span3.onclick = function() {
    document.getElementById("img").style.marginTop = "0";
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        document.getElementById("img").style.marginTop = "0";
        modal1.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
    }
}
