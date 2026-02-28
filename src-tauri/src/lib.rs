pub mod models;
pub mod commands;
pub mod repositories;

use commands::send_message::send_message;
use commands::get_messages::get_messages;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![send_message, get_messages])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
