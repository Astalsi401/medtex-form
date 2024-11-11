import { TeamInfo } from "@types";

class FetchData {
  errorHandler: (error: Error) => void;
  fetchWrapper: (url: string, options?: RequestInit) => Promise<any>;
  get: (url: string) => Promise<any>;
  post: (url: string, data?: any) => Promise<any>;
  constructor() {
    this.errorHandler = (error) => {
      console.error(error);
      return { error: error.message };
    };
    this.fetchWrapper = (url, options) =>
      fetch(url, options)
        .then((res) => (res.status === 201 ? { completed: true } : res.json()))
        .catch(this.errorHandler);
    this.get = (url: string) => this.fetchWrapper(url);
    this.post = (url: string, data = {}) => this.fetchWrapper(url, { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(data) });
  }
}
export const fetchData = new FetchData();
export const getTeamInfo: (teamId: string, lang: string) => Promise<TeamInfo> = async (teamId, lang) => (["localhost", "astalsi401.github.io"].includes(window.location.hostname) ? await fetchData.get(`${import.meta.env.BASE_URL}json/${teamId}-${lang}.json`) : await fetchData.get(`https://api.taiwan-healthcare.org/api/v1/team/${teamId}?lang=${lang}`).then((res: TeamInfo) => ({ ...res, coreProducts: res.coreProducts.map((prod) => ({ ...prod, progress: Number(prod.progress) })) })));
export const getSearchParam = (name: string) => new URLSearchParams(window.location.search).get(name);
export const submitForm = async (url: string, data: any) => await fetchData.post(url, data);
