use actix_cors::Cors;
use actix_web::{post, App, HttpResponse, HttpServer, Responder};
#[post("/")]
async fn index(req_body: String) -> impl Responder {
    let body = req_body;

    println!("Server received: {}", body);

    HttpResponse::Ok().body(body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::permissive();

        App::new().wrap(cors).service(index)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
