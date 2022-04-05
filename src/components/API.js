export class API {
    constructor(url, headers) {
        this._url = url;
        this._headers = headers;
    }
    getCards() {
        return this._makeRequest(fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        }))
    }
    _makeRequest(promise) {
        return promise.then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw "Request failed"
        })
    }
    postCard(item) {
        const promise = fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link,
            })
        });
        return this._makeRequest(promise)
    }
    deleteCard(id) {
        const promise = fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        });
        return this._makeRequest(promise)
    }
    getProfileInfo() {
        return this._makeRequest(fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).catch((err) => alert(`Request failed ${err.status}`)))
    }
    editProfileInfo(userData) {
        return this._makeRequest(fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.user,
                about: userData.profession,
            })
        }))
    }
    putLike(id) {
        return this._makeRequest(fetch(`${this._url}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }, ))
    }
    deleteLike(id) {
        return this._makeRequest(fetch(`${this._url}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }, ))
    }
    changeAvatar(avatar) {
        return this._makeRequest(fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }))
    }
}