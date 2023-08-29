class Api {
  constructor({ serverUrl, headers }) {
    this.serverUrl = serverUrl;
    this.headers = headers;
  }

  _sendRequest(way, options) {
    return fetch(`${this.serverUrl}${way}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (!res.ok) {
        return Promise.reject(res.status);
      }
    });
  }

  getUserInfo() {
    return this._sendRequest(`/users/me`, {
      headers: this.headers,
    });
  }

  sendUserInfo(data) {
    return this._sendRequest(`/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.profession,
      }),
    });
  }

  sendUserAvatar(data) {
    return this._sendRequest(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: data.link }),
      headers: this.headers,
    });
  }

  getCards() {
    return this._sendRequest(`/cards`, {
      method: "GET",
      headers: this.headers,
    });
  }

  addCard(card) {
    return this._sendRequest(`/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
      headers: this.headers,
    });
  }

  addLike(id) {
    return this._sendRequest(`/cards/likes/${id}`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  deleteLike(id) {
    return this._sendRequest(`/cards/likes/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  deleteCard(id) {
    return this._sendRequest(`/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}

const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "0d9e5e06-5fb6-4948-aef4-c066b6b409b2",
    "Content-Type": "application/json",
  },
});

export default api;
