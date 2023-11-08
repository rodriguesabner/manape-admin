interface MenuItems {
    id: number;
    name: string;
    description: string;
}

interface MenuList {
    date: string;
    items: MenuItems[];
    active: boolean
}

