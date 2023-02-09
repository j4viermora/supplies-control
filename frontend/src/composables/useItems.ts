import ColumnGroup from 'ant-design-vue/lib/vc-table/sugar/ColumnGroup'
import * as items from '../api/items'

export const useItems  = () => {
    const addItems = async (item: {name:string, quantity :number, description:string, brand:string}) => {
            try{

                items.add({
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