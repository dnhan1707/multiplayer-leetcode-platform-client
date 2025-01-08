import Logout from "../components/Logout";
import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";

export default function DashBoard() {
    return (
        <div className="flex flex-col">
            <h1>Hello</h1>
            <Logout></Logout>
            <CreateRoom></CreateRoom>
            <JoinRoom></JoinRoom>
        </div>
    )
}