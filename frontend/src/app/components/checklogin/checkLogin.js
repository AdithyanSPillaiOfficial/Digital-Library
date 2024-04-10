import Login from "@/app/login/page";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";

function checkLogin() {
    try {
        if (localStorage.getItem('isLogedIn')) {
            // setProfile(JSON.parse(sessionStorage.getItem('user')));
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

export default checkLogin;