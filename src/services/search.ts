export default class SearchService {
  static async fetchSearch(query: string, page: number) {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${query}`
    );
    return res.json();
  }
}
