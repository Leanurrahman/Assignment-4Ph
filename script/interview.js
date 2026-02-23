let interviewlist = [];
let rejectlist = [];
let currentstatus = 'all';

let total = document.getElementById("total");
let InterviewCount = document.getElementById("interview");
let RejectCount = document.getElementById("reject");

const allfilterBtn = document.getElementById("all-filter-btn");
const interviewfilterBtn = document.getElementById("Interview-filter-btn");
const rejectfilterBtn = document.getElementById("reject-filter-btn");

const allCardSection = document.getElementById("allcards");

// console.log(allCardSection.children.length);
// interviewlist.push({name: 'plant 1' },{name: 'plant 1' })

const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");

function calculateCount() {
  total.innerText = allCardSection.children.length;
  InterviewCount.innerText = interviewlist.length;
  RejectCount.innerText = rejectlist.length;
}
calculateCount();

// toggle function

function Togglestyle(id) {
  //adding white bg for all
  allfilterBtn.classList.add("bg-gray-300", "text-black");
  interviewfilterBtn.classList.add("text-black");
  rejectfilterBtn.classList.add("text-black");

  //remove previous blue
  allfilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  interviewfilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  rejectfilterBtn.classList.remove("bg-[#3B82F6]", "text-white");

  const activeBtn = document.getElementById(id);
  currentstatus = id;
  //adding blue bg for current button
  activeBtn.classList.remove("bg-gray-300", "text-black");
  activeBtn.classList.add("bg-[#3B82F6]", "text-white");

  if(id == 'Interview-filter-btn'){
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
  }else if(id == 'all-filter-btn'){
    allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
  }else if(id == 'reject-filter-btn'){
        allCardSection.classList.add('hidden');
          filterSection.classList.remove('hidden');
          renderReject();

  }
}

mainContainer.addEventListener("click", function (event) {
    console.log(event.target.classList.contains("interview-btn"));
    
  if (event.target.classList.contains("interview-btn")) {

    const parentNode = event.target.parentNode.parentNode.parentNode;
    const Mobile = parentNode.querySelector(".mobile").innerText;
    const React = parentNode.querySelector(".react").innerText;
    const Salary = parentNode.querySelector(".amount").innerText;
    const NOTapplied = parentNode.querySelector(".NOTapplied").innerText;
    const Notes = parentNode.querySelector(".notes").innerText;

    parentNode.querySelector('.NOTapplied').innerText = 'INTERVIEW'

    const cardinfo = {
      Mobile,
      React,
      Salary,
      NOTapplied: 'INTERVIEW',
      Notes,
    };

    const Mobileexist = interviewlist.find(item => item.Mobile == cardinfo.Mobile);

    if (!Mobileexist) {
      interviewlist.push(cardinfo);
    }

    rejectlist = rejectlist.filter(item => item.Mobile != cardinfo.Mobile);
  
  calculateCount();
  if(currentstatus == 'reject-filter-btn'){
    renderReject();
  }

  } else if (event.target.classList.contains("reject-btn")) {

    const parentNode = event.target.parentNode.parentNode.parentNode;

    const Mobile = parentNode.querySelector(".mobile").innerText;
    const React = parentNode.querySelector(".react").innerText;
    const Salary = parentNode.querySelector(".amount").innerText;
    const NOTapplied = parentNode.querySelector(".NOTapplied").innerText;
    const Notes = parentNode.querySelector(".notes").innerText;

    parentNode.querySelector('.NOTapplied').innerText = 'REJECTED'

    const cardinfo = {
      Mobile,
      React,
      Salary,
      NOTapplied: 'REJECTED',
      Notes,
    };

    const Mobileexist = rejectlist.find(item => item.Mobile == cardinfo.Mobile);

    if (!Mobileexist) {
      rejectlist.push(cardinfo);
    }
  
    //removing the card from interviewlist
        interviewlist = interviewlist.filter(item => item.Mobile != cardinfo.Mobile);

  // //   console.log(interviewlist);

   if(currentstatus=="Interview-filter-btn"){
    renderInterview();
   }
  
  calculateCount();


  }
});



function renderInterview() {
  filterSection.innerHTML = "";
  
  if (interviewlist.length === 0) {
filterSection.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20 bg-base-100 rounded-xl border-2 border-dashed border-blue-200">
      
        <img src="ass_4.png" alt="No jobs available" class="w-40 h-40 object-contain mb-6">
       
        <h3 class="text-xl font-bold text-gray-700">No jobs available</h3>
        
        <p class="text-gray-400 text-sm mt-1">Check back soon for new job opportunities</p>
    </div>
`;
    return;
  }

  for (let interview of interviewlist) {
    let div = document.createElement("div");
    div.className = "mx-auto w-full lg:w-[1110px] mt-4 space-y-7";
    
  
    div.innerHTML = `
    <div class="py-5 bg-base-100 rounded-xl shadow-md items-start p-8 mt-4">
            <div class="flex justify-between">
                <h3 class="mobile text-[#002C5C] font-black mt-2.5">${interview.Mobile}</h3>
                <button class="border-gray-300 border rounded-full py-2 px-3 text-center delete-btn">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
            <div class="space-y-5">
              
                <p class="react text-[#64748B]">${interview.React}</p> 
                
               
                <p class="amount text-[#64748B]">${interview.Salary}</p>
            
                <h2 class="NOTapplied text-[#002C5C] bg-green-100 px-5 py-2 rounded-lg font-semibold inline-block mb-3">
                    ${interview.NOTapplied}
                </h2>
             
                <p class="notes text-[#64748B]">${interview.Notes}</p>
                
                <div class="flex gap-3">
                    <button class="btn btn-outline btn-success interview-btn">interview</button>
                    <button class="btn btn-outline btn-error reject-btn">Rejected</button>
                </div>
            </div>
        </div>
  `;
  filterSection.appendChild(div);
  }
}

function renderReject() {
  filterSection.innerHTML = "";
  
  if (rejectlist.length === 0) {
    filterSection.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20 bg-base-100 rounded-xl border-2 border-dashed border-blue-200">
      
        <img src="ass_4.png" alt="No jobs available" class="w-40 h-40 object-contain mb-6">
       
        <h3 class="text-xl font-bold text-gray-700">No jobs available</h3>
        
        <p class="text-gray-400 text-sm mt-1">Check back soon for new job opportunities</p>
    </div>
`;
    return;
  }

  for (let reject of rejectlist) {
    let div = document.createElement("div");
    div.className = "mx-auto w-full lg:w-[1110px] mt-4 space-y-7";
    
    div.innerHTML = `
    <div class="py-5 bg-base-100 rounded-xl shadow-md items-start p-8 mt-4">
            <div class="flex justify-between">
                <h3 class="mobile text-[#002C5C] font-black mt-2.5">${reject.Mobile}</h3>
                <button class="border-gray-300 border rounded-full py-2 px-3 text-center delete-btn">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
            <div class="space-y-5">
                <p class="react text-[#64748B]">${reject.React}</p>
                <p class="amount text-[#64748B]">${reject.Salary}</p>
            <h2 class="NOTapplied text-[#002C5C] bg-red-100 px-5 py-2 rounded-lg font-semibold inline-block mb-3">
                    ${reject.NOTapplied}
                </h2>
                <p class="notes text-[#64748B]">${reject.Notes}</p>
                <div class="flex gap-3">
                    <button class="btn btn-outline btn-success interview-btn">interview</button>
                    <button class="btn btn-outline btn-error reject-btn">Rejected</button>
                </div>
            </div>
        </div>
  `;
  filterSection.appendChild(div);
  }
}