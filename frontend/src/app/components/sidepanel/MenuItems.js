import { faAddressCard, faBook, faBookmark, faHome, faKey, faLock, faMagnifyingGlass, faUserGroup } from '@fortawesome/free-solid-svg-icons'


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
    },
    {
        label : 'Add Students',
        icon : faUserGroup,
        redirect : '/admin/addstudent'
    },
    {
        label : 'Manage Resources',
        icon : faBook,
        redirect : '/admin/resource'
    },
    {
        label : 'Change Password',
        icon : faKey,
        redirect : '/admin/password'
    }
]

export {adminItems};