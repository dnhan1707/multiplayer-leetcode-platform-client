export default function CreateRoom() {
    return (
        <div>
            <form>
                <h3>Create your own room</h3>
                <input
                    type="number"
                    placeholder="Room size"
                />

                <button type="submit">Create</button>
            </form>
        </div>
    )
}