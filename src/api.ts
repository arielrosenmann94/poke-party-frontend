import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function ping() {
  const { data } = await api.get("/ping");
  return data;
}

export async function getRandomByType(type: string) {
  const { data } = await api.get("/pokemon", { params: { type } });
  return data;
}

export async function addToParty(pokemon: any) {
  const { data } = await api.post("/party", pokemon);
  return data as {
    success: boolean;
    placed: "party" | "box";
    party: any[];
    box: any[];
  };
}

export async function getParty() {
  const { data } = await api.get("/party");
  return data;
}

export async function getBox() {
  const { data } = await api.get("/box");
  return data;
}

export async function moveToBox(id: number) {
  const { data } = await api.post(`/box/${id}`);
  return data;
}

export async function moveToParty(id: number) {
  const { data } = await api.post(`/party/${id}/move`);
  return data;
}

export async function getPartySorted(sort: string, order: "asc" | "desc") {
  const { data } = await api.get("/party", {
    params: { sort, order },
  });
  return data;
}

export async function optimizeParty() {
  const { data } = await api.post("/party/optimize");
  return data;
}
