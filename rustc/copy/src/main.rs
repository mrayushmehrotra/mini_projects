use std::env;
use std::fs;
use std::time::Instant;

fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();

    if args.len() != 3 {
        println!("Usage: <filename> <copy_name>");
        return Ok(());
    }

    let file_name = &args[1];
    let destination = &args[2];

    let now = Instant::now();

    let src_len = fs::metadata(file_name)?.len();
    let mb_len = src_len / 1024;
    fs::copy(file_name, destination)?;

    println!(
        "{} seconds taken to copy a file of size {} mb",
        now.elapsed().as_secs(),
        mb_len
    );

    Ok(())
}
