export class UserInfo {
    constructor(
        name,
        profession
    ) {
        this._name = document.querySelector(name);
        this._profession = document.querySelector(profession);
    }
    getUserInfo() {
        return {
            name: this._name.textContent,
            profession: this._profession.textContent
        };
    }
    setUserInfo(data) {
        console.log(data.name);
        console.log(this._name);
        this._name.textContent = data.name;
        this._profession.textContent = data.profession;

    }
}