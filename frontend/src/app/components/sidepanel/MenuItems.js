import { faAddressCard, faBookmark, faHome, faLock, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const userItems = [
    {
        label : 'Home',
        icon : faHome,
        redirect : '/'

    },
    {
        label : 'Search',
        icon : faMagnifyingGlass,
        redirect : '/search'
    },
    {
        label : 'Saved',
        icon : faBookmark,
        redirect : '/saved'
    }
]

export {userItems}

const adminItems = [
    {
        label : 'Home',
        icon : faHome,
        redirect : '/'

    },
    {
        label : 'Add User',
        icon : faAddressCard,
        redirect : '/admin/adduser'
    }
]

export {adminItems};