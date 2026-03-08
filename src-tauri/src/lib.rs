pub mod commands;
pub mod models;
pub mod repositories;

use anyhow::Result;
use commands::get_messages::get_messages;
use commands::send_message::send_message;
use iroh::protocol::Router;
use iroh::Endpoint;
use iroh_gossip::net::Gossip;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::async_runtime::block_on(async {
        if let Err(e) = iroh_startup().await {
            eprintln!("iroh startup failed: {:#}", e);
        }
    });

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![send_message, get_messages])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn iroh_startup() -> Result<()> {
    let endpoint = Endpoint::builder().bind().await?;

    println!("> our endpoint id: {}", endpoint.id());

    let gossip = Gossip::builder().spawn(endpoint.clone());

    let router = Router::builder(endpoint.clone())
        .accept(iroh_gossip::ALPN, gossip.clone())
        .spawn();

    router.shutdown().await?;

    Ok(())
}
