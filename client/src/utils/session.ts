
export function getSessionId(): string {
    let id = localStorage.getItem("lumio_session_id");
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("lumio_session_id", id);
    }
    return id;
}
