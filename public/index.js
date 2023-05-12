var skill_count = 1;
$(".skills-button")[0].addEventListener("click", addSkillRow);
function addSkillRow(){
    skill_count+=1;
    $(".addmore-button")[0].insertAdjacentHTML("beforebegin",
        `<div class="row skill-row">
            <div class="col-lg-4">
                <input type="text" class="form-control" name="skill${skill_count}" placeholder="Skill-${skill_count}">
            </div>
        </div>
        <div class="row skill-row">
            <div class="col">
                <textarea type="text" class="form-control skill-des" name="skill${skill_count}-des" placeholder="Description"></textarea>
            </div>
        </div>`
    );
    if(skill_count==5){
        $(".skills-button")[0].disabled=true;
    }
}

var nextButtons = $(".next-button");
for (i=0; i<nextButtons.length; i++){
    nextButtons[i].addEventListener("click", moveToNextTab);
}

function moveToNextTab(){
    var presentButton;
    presentButton = this.id;
    if(presentButton==="about-next-button"){
        $(".nav-link")[0].classList.remove("active");
        $(".nav-link")[0].setAttribute("aria-selected", false);
        $(".tab-pane")[0].classList.remove("show");
        $(".tab-pane")[0].classList.remove("active");
        
        $(".nav-link")[1].classList.add("active");
        $(".nav-link")[1].setAttribute("aria-selected",true);
        $(".tab-pane")[1].classList.add("show");
        $(".tab-pane")[1].classList.add("active");
        var fname = document.getElementById("firstname").value;
        var lname = document.getElementById("lastname").value;
        var name = fname+"_"+lname;
        console.log(name);
        localStorage.setItem("username", name);
    }
    else if(presentButton==="skills-next-button"){
        $(".nav-link")[1].classList.remove("active");
        $(".nav-link")[1].setAttribute("aria-selected", false);
        $(".tab-pane")[1].classList.remove("show");
        $(".tab-pane")[1].classList.remove("active");
        
        $(".nav-link")[2].classList.add("active");
        $(".nav-link")[2].setAttribute("aria-selected",true);
        $(".tab-pane")[2].classList.add("show");
        $(".tab-pane")[2].classList.add("active");
        // var name = $("#firstname").value;
        // console.log($("#firstname").value);
        // localStorage.setItem("username", name)
    }
}