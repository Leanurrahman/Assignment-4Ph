// ১. ইন্টারভিউ বাটনগুলো এবং কন্টেইনার ধরে আনা
const interviewButtons = document.querySelectorAll(".interview-btn"); // সব বাটন ধরবে
const historyContainer = document.getElementById("historyContainer");
const historySection = document.getElementById("history");

// ২. প্রতিটি বাটনের জন্য আলাদাভাবে ক্লিক ইভেন্ট সেট করা
interviewButtons.forEach(button => {
    button.addEventListener("click", function() {
        
        // এই বাটনটি কোন কার্ডের ভেতরে আছে, সেটা খুঁজে বের করা
        const jobCard = this.closest(".py-5.bg-base-100"); // কার্ডের মূল div
        
        if (!jobCard) return;

        // কার্ড থেকে প্রয়োজনীয় তথ্যগুলো সংগ্রহ করা
        const companyName = jobCard.querySelector("h3").innerText;
        const jobTitle = jobCard.querySelectorAll("p")[0].innerText;
        const jobDetails = jobCard.querySelectorAll("p")[1].innerText;
        const statusBadge = jobCard.querySelector("h2.inline-block").innerText; // "Not Applied" ইত্যাদি
        const description = jobCard.querySelectorAll("p")[3].innerText; // বিস্তারিত বর্ণনা
        const time = new Date().toLocaleString();

        // ৩. নতুন একটি div তৈরি করা (Transaction Card)
        const newHistory = document.createElement("div");
        
        // ৪. নতুন div-এর ভেতরে পুরো কার্ডের মতো করে HTML বসানো
        newHistory.innerHTML = `
            <div class="transaction-card p-5 bg-base-100 rounded-xl shadow-md space-y-4 border border-gray-100">
                <div class="flex justify-between items-start">
                    <h3 class="text-[#002C5C] font-black">${companyName}</h3>
                    <span class="text-xs text-gray-400">${time}</span>
                </div>
                <p class="text-[#64748B] font-semibold">${jobTitle}</p>
                <p class="text-[#64748B]">${jobDetails}</p>
                <h2 class="text-[#002C5C] bg-blue-100 px-5 py-2 rounded-lg font-semibold inline-block">
                    ${statusBadge}
                </h2>
                <p class="text-[#64748B] text-sm">
                    ${description}
                </p>
                <div class="pt-2 border-t border-gray-100">
                    <p class="text-green-600 font-bold text-sm">✓ Interview Added to History</p>
                </div>
            </div>
        `;

        // ৫. কন্টেইনারের মধ্যে নতুন কার্ডটি যোগ করা (Append)
        historyContainer.appendChild(newHistory);

        // ৬. গোপন সেকশনটি (`hidden` ক্লাস সরিয়ে) দেখানো
        if (historySection) {
            historySection.classList.remove("hidden");
        }
        
        // (অপশনাল) উপরের ইন্টারভিউ কাউন্টার বাড়ানো
        const interviewCountSpan = document.querySelector(".buttons div:nth-child(2) span");
        if(interviewCountSpan) {
            let currentCount = parseInt(interviewCountSpan.innerText);
            interviewCountSpan.innerText = currentCount + 1;
            interviewCountSpan.classList.add("text-green-500"); // রঙ পরিবর্তন
        }
    });
});