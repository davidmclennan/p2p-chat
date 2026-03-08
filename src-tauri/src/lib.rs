pub mod commands;
pub mod models;
pub mod repositories;

use anyhow::Result;
use commands::get_messages::get_messages;
use commands::get_user::get_user;
use commands::send_message::send_message;
use iroh::protocol::Router;
use iroh::Endpoint;
use iroh_gossip::net::Gossip;
use models::app_state::AppState;
use std::sync::Mutex;
use tauri::{Builder, Manager};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let id = tauri::async_runtime::block_on(async {
        match iroh_startup().await {
            Ok(id) => id,
            Err(e) => {
                eprintln!("iroh startup failed: {:#}", e);
                String::new()
            }
        }
    });

    Builder::default()
        .setup(move |app| {
            app.manage(Mutex::new(AppState { id: id.clone() }));
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            send_message,
            get_messages,
            get_user
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn iroh_startup() -> Result<String> {
    let endpoint = Endpoint::builder().bind().await?;

    println!("> our endpoint id: {}", endpoint.id());

    let gossip = Gossip::builder().spawn(endpoint.clone());

    let router = Router::builder(endpoint.clone())
        .accept(iroh_gossip::ALPN, gossip.clone())
        .spawn();

    router.shutdown().await?;

    Ok(endpoint.id().to_string())
}
