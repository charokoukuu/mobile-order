export interface Menu {
    title: string
    description: string
    price: number
    id: string
    image: string
    category: string
    isBigSize?: boolean
    isStatus: boolean
}

export interface User {
    uuid: string
    studentName: string
    mailAddress: string
    isMailAddressConfirmed: boolean
}


export interface Order {
    user: User
    totalPrice: number
    menu: Menu
    isStatus: string
}


const menu: Array<Menu> = [
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