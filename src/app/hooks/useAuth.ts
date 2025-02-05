import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export const useAuth = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        fetch("http://localhost:4000/check", {
            credentials: "include",
        }).then((res) => {
            if(!res.ok) {
                throw new Error("Unauthorized")
            }
            return res.json();
        }).then((data) => {
            console.log("Authenticated User", data.user);
            setAuthenticated(true);
            setLoading(false)
        }).catch((error) => {
            console.error("Auth Check Failed:", error);
            router.push("/login");
        })
    }, [router])

    return { loading, authenticated }
}
