use std::fs;
use std::time::{Duration, Instant};

fn main() -> std::io::Result<()> {
    let now = Instant::now();
    fs::copy("target.mp4", "copy.mp4")?; // Copy foo.txt to bar.txt
    println!("{} second taken to copy", now.elapsed().as_secs());
    Ok(())
}
