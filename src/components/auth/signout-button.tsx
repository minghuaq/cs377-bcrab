// "use server"
// import { signOut } from "@/auth"

import { Button } from "../ui/button";
import { signOut } from "./authentication";

export function SignOut() {
    return (
        <form
            action={ signOut }
        >
            {/* <Button type="submit" variant="secondary">Sign Out</Button> */}
            <button type="submit">Sign Out</button>
        </form>
    )
}