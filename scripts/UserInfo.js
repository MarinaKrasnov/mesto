import {
    title,
    subtitle,
    popupTitle,
    popupSubtitle
} from './index.js';
export class UserInfo {
    constructor({
        name,
        profession
    }) {
        this._name = name;
        this._profession = profession;
    }
    getUserInfo() {
        popupTitle.value = title.textContent;
        popupSubtitle.value = subtitle.textContent;
    }
    setUserInfo() {
        title.textContent = popupTitle.value;
        subtitle.textContent = popupSubtitle.value;
    }
}