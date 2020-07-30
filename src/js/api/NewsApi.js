
export default class NewsApi {
  constructor (options,getData) {
    this.options = options;
    this.getData = getData;
  }
  getNews = (searchWord) => {
    const date = this.getData()
    return fetch(`${this.options.baseUrl}everything?q=${searchWord}&from=${date.dateWeekAgo}&to=${date.date}&language=ru&sortBy=popularity&pageSize=100&apiKey=${this.options.apiKey}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
