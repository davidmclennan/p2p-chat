use serde::Serialize;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Message {
    pub username: String,
    pub message_body: String,
}
