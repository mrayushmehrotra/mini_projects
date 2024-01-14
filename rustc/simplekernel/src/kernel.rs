// kernel.rs

#![no_std]
#![no_main]
#![feature(asm)]

// Define the VGA text mode buffer.
const VGA_BUFFER: *mut u8 = 0xb8000 as *mut u8;

// Function to print a string to the screen.
fn print_string(s: &str) {
    let mut buffer_ptr = VGA_BUFFER;

    for byte in s.bytes() {
        unsafe {
            // Write the character to the VGA buffer.
            buffer_ptr.write(byte);

            // Move to the next VGA character cell.
            buffer_ptr = buffer_ptr.add(1);

            // Set the attribute byte (white text on black background).
            buffer_ptr.write(0x07);

            // Move to the next VGA character cell.
            buffer_ptr = buffer_ptr.add(1);
        }
    }
}

// Kernel entry point.
#[no_mangle]
pub extern "C" fn _start() -> ! {
    // Call the print_string function to display the message.
    print_string("Hello, World!");

    // Halt the processor.
    loop {
        unsafe {
            asm!("hlt");
        }
    }
}
