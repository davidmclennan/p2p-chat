use crate::models::user::User;
use crate::models::app_state::AppState;
use std::sync::Mutex;
use tauri::State;

#[tauri::command]
pub fn get_user(state: State<'_, Mutex<AppState>>) -> Result<User, String> {
    let state = state.lock().unwrap();

    let user = User {
        id: state.id.clone(),
    };

    Ok(user)
}
