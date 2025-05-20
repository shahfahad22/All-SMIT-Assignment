let form = document.getElementById("searchForm")
let inp =document.getElementById("input")
let resultDiv = document.getElementById("result")
let postDiv = document.getElementById("posts-container")

let currentUSer = null;

form.addEventListener("submit", function(e){
e.preventDefault();
const userId = inp.value.trim();
resultDiv.innerHTML = "";
  postDiv.innerHTML = "";   
currentUSer = null;

if (userId === ""){

    resultDiv.innerHTML = `<pclass= "error"> Enter User Id</p>`;
    return;
}
inp.value = "";
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
.then((res)=>{
    if(!res.ok){
        throw new Error("User Not Found");
    }
    return res.json();
})
.then((user) =>{
    currentUSer = user;
    resultDiv.innerHTML = `
    <div class ="card"> 
    <p><strong>Name :</strong>${user.name}</p>
    <p><strong>Email :</strong>${user.email}</p>
    <p><strong>ID :</strong>${user.id}</p>
    <button id="getPost" >Get Post</button>
    </div>
    `;
    document.getElementById("getPost").addEventListener("click", fetchPost)
})
.catch((error) =>{
resultDiv.innerHTML = `<p class="error">${error.message}</p>`
});
});

function fetchPost(){
    if(!currentUSer) return;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${currentUSer.id}`)
    .then(res => res.json())
    .then( posts =>{
        postDiv.innerHTML = `<h3>Post By User:</h3>`
        posts.forEach((post) => {
            postDiv.innerHTML += `
            <div class="card">
            <h4>${post.title}</h4>
            <p>${post.body}</p>
            </div>
            `;
        });
    })

}