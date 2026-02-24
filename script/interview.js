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

//job count er new variable decalred
const displayCountSpan = document.getElementById("display-count");
const totalTextSpan = document.getElementById("total-text");
const maxJobsSpan = document.getElementById("max-jobs");
let totalJobsCount = allCardSection.children.length;


//calculating card top card
function calculateCount() {
  total.innerText = allCardSection.children.length;
  InterviewCount.innerText = interviewlist.length;
  RejectCount.innerText = rejectlist.length;
 
}


function updateDisplayCount() {
  const appliedCount = interviewlist.length + rejectlist.length;
  
  if (appliedCount === 0) {
    displayCountSpan.innerText = totalJobsCount;
    totalTextSpan.classList.add('hidden'); 
  } else {
    displayCountSpan.innerText = appliedCount;
    totalTextSpan.classList.remove('hidden'); 
    maxJobsSpan.innerText = totalJobsCount;
  }
}


calculateCount();
updateDisplayCount(); //check korbe in page load

// toggle function
function Togglestyle(id) {
    // Reset all buttons style
    [allfilterBtn, interviewfilterBtn, rejectfilterBtn].forEach(btn => {
        btn.classList.add("bg-gray-200", "text-black");
        btn.classList.remove("bg-[#3B82F6]", "text-white");
    });

    const activeBtn = document.getElementById(id);
    currentstatus = id;
    
    // Set active button style
    activeBtn.classList.remove("bg-gray-200", "text-black");
    activeBtn.classList.add("bg-[#3B82F6]", "text-white");

    // Show/Hide sections
    if(id === 'Interview-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if(id === 'all-filter-btn'){
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if(id === 'reject-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderReject();
    }
    updateDisplayCount();
}

// delete function
function deleteJob(companyName, fromSection) {
    console.log(`Deleting: ${companyName} from ${fromSection}`);
    
    if (fromSection === 'all') {
        // All section theke specifid card delet kora
        const cards = Array.from(allCardSection.children); // HTML Collection to Array
        
        for (let card of cards) {
            const mobileElement = card.querySelector('.mobile');
            // nam mille delet kora
            if (mobileElement && mobileElement.innerText.trim() === companyName.trim()) {
                card.remove(); // DOM theke muche fela
                totalJobsCount--; // card reduce kora
                
                // list thekeo remove korbo
                interviewlist = interviewlist.filter(item => item.Mobile !== companyName);
                rejectlist = rejectlist.filter(item => item.Mobile !== companyName);
                
                break; // ekta card delet kore loop stop kore debo
            }
        }
        
        calculateCount();
        updateDisplayCount();
        
        // rerender from onno tab
        if(currentstatus === 'Interview-filter-btn') renderInterview();
        if(currentstatus === 'reject-filter-btn') renderReject();

    } else if (fromSection === 'interview') {
        // Interview list theke remove
        interviewlist = interviewlist.filter(item => item.Mobile !== companyName);
        renderInterview();
        calculateCount();
        updateDisplayCount();
        
    } else if (fromSection === 'rejected') {
        // Rejected list theke remove
        rejectlist = rejectlist.filter(item => item.Mobile !== companyName);
        renderReject();
        calculateCount();
        updateDisplayCount();
    }
}


mainContainer.addEventListener("click", function (event) {
    const target = event.target;

    const deleteBtn = target.closest('.delete-btn');
    if (deleteBtn) {
        const cardDiv = deleteBtn.closest('.py-5'); 
        if(cardDiv) {
            const Mobile = cardDiv.querySelector(".mobile").innerText.trim();
            let fromSection = 'all';
            if (filterSection.contains(cardDiv)) {
                const badge = cardDiv.querySelector('.NOTapplied');
                if(badge?.innerText.includes('INTERVIEW')) fromSection = 'interview';
                else if(badge?.innerText.includes('REJECTED')) fromSection = 'rejected';
            }
            
            deleteJob(Mobile, fromSection);
        }
        return; //function close eikhne
    }

    // interview button handle
    if (target.classList.contains("interview-btn")) {
        const cardDiv = target.closest('.py-5');
        const Mobile = cardDiv.querySelector(".mobile").innerText.trim();
        const React = cardDiv.querySelector(".react").innerText;
        const Salary = cardDiv.querySelector(".amount").innerText;
        const Notes = cardDiv.querySelector(".notes").innerText;

        //UI update hbe
        const badge = cardDiv.querySelector('.NOTapplied');
        badge.innerText = 'INTERVIEW';
        badge.className = 'NOTapplied text-[#002C5C] bg-green-100 px-5 py-2 rounded-lg font-semibold inline-block mb-3';

        // Data update hbe
        if (!interviewlist.find(item => item.Mobile === Mobile)) {
            interviewlist.push({ Mobile, React, Salary, NOTapplied: 'INTERVIEW', Notes });
        }
        rejectlist = rejectlist.filter(item => item.Mobile !== Mobile);

        calculateCount();
        updateDisplayCount();
        
        if(currentstatus === 'Interview-filter-btn') renderInterview();
        if(currentstatus === 'reject-filter-btn') renderReject();
        return;
    }
    // Reject button click handle
    if (target.classList.contains("reject-btn")) {
        const cardDiv = target.closest('.py-5');
        const Mobile = cardDiv.querySelector(".mobile").innerText.trim();
        const React = cardDiv.querySelector(".react").innerText;
        const Salary = cardDiv.querySelector(".amount").innerText;
        const Notes = cardDiv.querySelector(".notes").innerText;

        //ui update hbe
        const badge = cardDiv.querySelector('.NOTapplied');
        badge.innerText = 'REJECTED';
        badge.className = 'NOTapplied text-[#002C5C] bg-red-100 px-5 py-2 rounded-lg font-semibold inline-block mb-3';

        // data update hbe
        if (!rejectlist.find(item => item.Mobile === Mobile)) {
            rejectlist.push({ Mobile, React, Salary, NOTapplied: 'REJECTED', Notes });
        }
        interviewlist = interviewlist.filter(item => item.Mobile !== Mobile);

        if(currentstatus === 'Interview-filter-btn') renderInterview();
        
        calculateCount();
        updateDisplayCount();
        return;
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