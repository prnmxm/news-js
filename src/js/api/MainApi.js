export default class MainApi {
  constructor(url) {
    this.url = url;
  }
  signUp = (data) => {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
      })
    }).then(e=> {
      if(e.ok) {
        return e.json();
      }
      let json = e.json();
      return json.then(Promise.reject.bind(Promise));
    }).catch(e=> Promise.reject(e))
  }
   signIn = (data) => {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then(e=> {
      if(e.ok) {
        return e.json();
      }
      let json = e.json();
      return json.then(Promise.reject.bind(Promise));
    }).catch(e=> Promise.reject(e))
  }
  getUserData = () => {
    return fetch(`${this.url}/users/me`, {
      credentials: 'include',
    }).then(e=> {
      if(e.ok) {
        return e.json();
      }
      return Promise.reject(e)
      }
    )
  }
  getArticles =() =>{
    return fetch(`${this.url}/articles`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    }).then(e=> {
        if(e.ok) {
          return e.json();
        }
        return Promise.reject(e)
      }
    ).catch(e=> console.log(e))
  }
  createArticle = (data) => {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
        body: JSON.stringify({
          keyword: data.keyword,
          title: data.title,
          text: data.text,
          date: data.date,
          source: data.source,
          link: data.link,
          image: data.image
        })
      }).then(e=> {
        if(e.ok) {
          return e.json();
        }
        return Promise.reject(e)
      }
    ).catch(e=> console.log(e))
  }
  exitUser = () => {
    return fetch(`${this.url}/logout`, {
      credentials: 'include',
    }).then(e=> {
        if(e.ok) {
          return e;
        }
        return Promise.reject(e)
      }
    ).catch(e=> console.log(e))
  }
  removeArticle (id) {
    return fetch(`${this.url}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    }).then(e=> {
        if(e.ok) {
          return e.json();
        }
        return Promise.reject(e)
      }
    ).catch(e=> console.log(e))
  }
}
