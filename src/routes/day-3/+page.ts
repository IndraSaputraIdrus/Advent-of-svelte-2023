import type { PageLoad } from "./$types";

export type Presents = {
  name: string
  weight: number
}

export const load: PageLoad = async ({ fetch }) => {
  async function getData(): Promise<Presents[]> {
    const res = await fetch("https://advent.sveltesociety.dev/data/2023/day-three.json")
    return res.json()
  }

  return {
    presents: await getData()
  }
}
