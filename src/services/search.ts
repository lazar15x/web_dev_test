export default class SearchService {
  /**Fetch search repositories  */
  static async fetchSearch(query: string) {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${query}`
    );
    return res.json();
  }
}
