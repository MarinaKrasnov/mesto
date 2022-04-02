export class UserInfo {
    constructor(
        name,
        profession, avatar, id
    ) {
        this._name = document.querySelector(name);
        this._profession = document.querySelector(profession);
        this._avatar = document.querySelector(avatar);
        this._id = id;
    }
    getUserInfo() {
        return {
            user: this._name.textContent,
            profession: this._profession.textContent,
        };
    }
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._profession.textContent = data.about;
        this._avatar.style.backgroundImage = `url(${data.avatar})`;
    }
}