const githubForm= document.querySelector("#github-form");
const nameInput= document.querySelector("#githubname");
const clearLastUsers= document.querySelector("#clear-last-users");
const lastUsers= document.querySelector("#last-users");
const github= new Github();
const ui= new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);

}
function getData(e){
    let username= nameInput.value.trim();
    if(username===""){
        alert("Geçerli bir kullanıcı adı girin!");
    }
    else{
        github.getGithubData(username)
        .then (response=> {
            if(response.user.message==="Not Found"){
                //hata mesajı
               ui.showError("Kullanıcı Bulunamadı!")

            }else{
                ui.addSearchedUsersToUI(username);//storagenin altına yazılırsa hata alır.İlk başta eklenip sonra test edecği için username storage eklendiği için eklemeyecek o yüzden storageden önce yazılmalı
                Storage.addSearchedUsersToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);

            }

        })
        .catch(err=> ui.showError(err));

    }
    ui.clearInput();  //input temizleme
    e.preventDefault();
}
function clearAllSearched(){
    //tüm arananları temizle
    if(confirm("Emin misin?")){
        Storage.clearAllSearchedFromStorage();//storagedan temizleyecek
        ui.clearAllSearchedFromUI();
    }

}
function getAllSearched(){
    //arananları storoge'dan al ve ui ya ekle
    let users= Storage.getSearhedUsersFromStorage();

    let result="";
    users.forEach(user=>{
        result+= `<li class="list-group-item">${user}</li> `


    });
    lastUsers.innerHTML=result;
}