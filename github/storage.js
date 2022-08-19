class Storage{
    static getSearhedUsersFromStorage(){
        //tüm kullanıcıları alacak
        let users;
        if(localStorage.getItem("searched")===null){
            users=[];
        }
        else{
            users= JSON.parse(localStorage.getItem("searched"));
        }
        return users;

    }
    static addSearchedUsersToStorage(username){
        //var olan kullanıcıyı sorgulayacak olmayanları ekleyecek
        let users= this.getSearhedUsersFromStorage();

        if(users.indexOf(username)===-1){
            users.push(username);
        }
        //else kontrol etmeye gerek yok eğer burada user bulunursa zaten eklenmeyecek
        localStorage.setItem("searched", JSON.stringify(users));

    }
    static clearAllSearchedFromStorage(){
        //tüm kullanıcıları silecek
        localStorage.removeItem("searched");

    }
}