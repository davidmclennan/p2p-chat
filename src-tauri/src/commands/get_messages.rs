use crate::models::message::Message;

#[tauri::command]
pub fn get_messages() -> Result<Vec<Message>, String> {
    let messages = vec![
        Message {
            username: String::from("Marge91"),
            message_body: String::from("From now on the baby sleeps in the crib."),
        },
        Message {
            username: String::from("Rod3"),
            message_body: String::from("Iron helps us play!"),
        },
        Message {
            username: String::from("clown_bed27"),
            message_body: String::from("HUHUHEHEHEHE"),
        },
        Message {
            username: String::from("grandmaflanders586"),
            message_body: String::from("Hello Joe!"),
        },
    ];

    Ok(messages)
}
