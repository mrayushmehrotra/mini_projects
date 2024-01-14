use std::env;
use std::error::Error;
use std::time::Instant;
use csv::ReaderBuilder;

fn read_from_file(path: &str) -> Result<(), Box<dyn Error>> {
    let mut reader = ReaderBuilder::new().from_path(path)?;

    for result in reader.records(){
        let record = result?;
        println!("{:?} ", record.iter().collect::<Vec<_>>().join(", "));
    }
    Ok(())
}

fn main(){
    let now = Instant::now();
    let args: Vec<String> = env::args().collect();

    if args.len() != 2 {
        eprintln!("Error: Please provide a CSV file path.");
        return;
    }

    let file_path = &args[1];
    if let Err(e) = read_from_file(file_path){
        eprintln!("{}", e);
    } else {
        let elapsed = now.elapsed();
        println!("{} seconds take to read csv", elapsed.as_secs());
    }
}