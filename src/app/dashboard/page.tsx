import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";

export default function DashBoard() {
    return (
        <div className="flex flex-col">
            <CreateRoom></CreateRoom>
            <JoinRoom></JoinRoom>
        </div>
    )
}