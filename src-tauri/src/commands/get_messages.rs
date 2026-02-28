use crate::models::message::Message;
use crate::repositories::message_repository::get_messages as get_repo_messages;

#[tauri::command]
pub fn get_messages() -> Result<Vec<Message>, String> {
    get_repo_messages()
}
