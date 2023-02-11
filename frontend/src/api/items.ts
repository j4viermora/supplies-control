import { fetchApi } from "../config/axios"

import { IAddItem, IItemsReponse } from '../interfaces/items.interfaces'

export const add = async (item: IAddItem) => {
  const  resp =  fetchApi.post('/items', item)
  
  return resp
}

export const get  = async () => {
  const resp  = fetchApi.get<IItemsReponse>(`/items/company`)
  return resp
}

export const getOne = async (id: string) => {
  const resp = fetchApi.get(`/items/${id}`)
  return resp
}

export const update = async (id: string, item: IAddItem) => {
  const resp = fetchApi.patch(`/items/${id}`, item)
  return resp
}

export const remove = async (id: string) => {
  const resp = fetchApi.delete(`/items/${id}`)
  return resp
}