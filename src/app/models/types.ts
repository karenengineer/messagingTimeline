
export type User = {
  name?: string | null,
  id?: number | undefined
}

export type ServerResponse = {
  data: any,
  result?: any,
  status: number
}
