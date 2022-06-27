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
    uid: string
    studentName: string
    mailAddress: string
}


export interface OrderData {
    id: string
    user: UserData
    totalPrice: number
    menu: MenuData[]
    isStatus: string
    date: Date
}

