import { fetchApi } from "../config/axios"

import { IAddItem } from '../interfaces/items.interfaces'

export const add = async (item: IAddItem) => {
  const  resp =  fetchApi.post('/items', item)
  
  return resp
}