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
            user: this._name.textContent,
            profession: this._profession.textContent
        };
    }
    setUserInfo(data) {
        this._name.textContent = data.user;
        this._profession.textContent = data.profession;
    }
}