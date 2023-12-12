import Cookies from "universal-cookie";

export function useSsid() {
    const cookies = new Cookies()

    const session_id = cookies.get("session_id");

    

    const setSsid = (value: any) => {
        cookies.set("session_id", value,)
    }

    const resetSsid = () => {
        cookies.set("session_id", undefined)
    }

    return {
        session_id,
        setSsid,
        resetSsid,
    };
}