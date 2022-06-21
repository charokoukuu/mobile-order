export interface MenuData {
    title: string
    description: string
    price: number
    id: string
    image: string
    category: string
    isBigSize?: boolean
    isStatus: boolean
}

export interface UserData {
    uuid: string
    studentName: string
    mailAddress: string
    isMailAddressConfirmed: boolean
}


export interface OrderData {
    user: UserData
    totalPrice: number
    menu: MenuData
    isStatus: string
}


const menu: Array<MenuData> = [
    {
        title: 'うどん',
        description: 'scatslkcんks',
        price: 390,
        id: 'sdfvghj',
        image: '',
        category: '',
        isStatus: true,
        isBigSize: true
    },
    {
        title: '唐揚げ',
        description: '',
        price: 100,
        id: '',
        image: '',
        category: '',
        isStatus: true
    },
    {
        title: 'オレンジジュース',
        description: '',
        price: 100,
        id: '',
        image: '',
        category: '',
        isStatus: true
    },


]

console.log(menu)