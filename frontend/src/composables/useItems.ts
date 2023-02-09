import * as items from '../api/items'

export const useItems  = () => {
    const addItems = async (item: {name:string, quantity :number, description:string, brand:string}) => {
            try{
              await items.add({
                    ...item,
                })
            }catch{
                return {
                    message: 'Error adding item'
                }
            }
    }   
    return {
        addItems,
    }
}