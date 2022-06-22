export interface MenuData {
    title: string
    description: string
    price: number
    id: string
    image: string
    category: string
    isBigSize: boolean
    isStatus: boolean
}

export interface UserData {
    uuid: string
    studentName: string
    mailAddress: string
    isMailAddressConfirmed: boolean
}


export interface OrderData {
    id: string
    user: UserData
    totalPrice: number
    menu: MenuData[]
    isStatus: string
    date: Date
}

