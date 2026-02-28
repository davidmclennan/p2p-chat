use std::sync::{Mutex, OnceLock};
use crate::models::message::Message;

fn get_messages_lock() -> &'static Mutex<Vec<Message>> {
    static MESSAGES: OnceLock<Mutex<Vec<Message>>> = OnceLock::new();
    MESSAGES.get_or_init(|| Mutex::new(Vec::new()))
}

pub fn push_message(message: Message) -> Result<(), String> {
    get_messages_lock()
        .lock()
        .map_err(|_| "Failed to lock messages".to_string())?
        .push(message);
    Ok(())
}

pub fn get_messages() -> Result<Vec<Message>, String> {
    get_messages_lock()
        .lock()
        .map_err(|_| "Failed to lock messages".to_string())
        .map(|msgs| msgs.clone())
}
