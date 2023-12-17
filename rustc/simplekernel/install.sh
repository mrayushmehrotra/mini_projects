
# Install nightly Rust
rustup toolchain install nightly

# Set the default toolchain to nightly
rustup default nightly

# Install the target for your kernel
rustup target add x86_64-unknown-none

# Compile the kernel
cargo build --target x86_64-unknown-none --release
