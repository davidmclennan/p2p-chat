use crate::models::message::Message;
use crate::repositories::message_repository::push_message;

#[tauri::command]
pub fn send_message(message: Message) -> Result<(), String> {
    push_message(message)
}
