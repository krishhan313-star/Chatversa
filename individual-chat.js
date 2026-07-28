// Chatversa - Individual Chat

const friendsList = document.getElementById("friendsList");
const searchInput = document.getElementById("searchInput");

// Future: Firebase se friends yahan load honge
function loadFriends() {

    friendsList.innerHTML = `
        <div style="
            text-align:center;
            color:#94a3b8;
            margin-top:80px;
            font-size:16px;
        ">
            👥 No Friends Yet
            <br><br>
            Go to <b>Request Section</b> to add friends.
        </div>
    `;
}

// Search (Future Ready)
searchInput.addEventListener("input", function () {

    const value = this.value.toLowerCase();

    console.log("Searching:", value);

    // Future: Firebase search yahan add hogi

});

// Page Load
window.onload = function () {
    loadFriends();
};