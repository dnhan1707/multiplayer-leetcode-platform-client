import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";

export default function DashBoard() {
    return (
        <div className="flex flex-col">
            <h1>Hello</h1>
            <CreateRoom></CreateRoom>
            <JoinRoom></JoinRoom>
        </div>
    )
}