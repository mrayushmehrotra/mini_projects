use actix_web::{web, App, HttpResponse,HttpServer, Responder};

async fn homepage() -> impl Responder {
    HttpResponse::Ok().body("Hello world asdasdactix_web")
}

#[actix_web::main]
async fn main(){
    let addr = "localhost:8000";
    let server = HttpServer::new(move || {
        App::new()
            .route("/", web::get().to(homepage))
    })
    .bind(addr)
    .unwrap()
    .run();
    println!("Server is on http://{}", addr);
    server.await.unwrap();
}
