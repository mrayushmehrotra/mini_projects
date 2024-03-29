use gtk::prelude::*;
use gtk::{Button, Window, WindowType};
fn main() {
    gtk::init().expect("Failed to initialize GTK.");

    let window = Window::new(WindowType::Toplevel);
    window.set_title("Simple Rust GUI");
    window.set_default_size(200, 200);

    let button = Button::with_label("Click me!");
    button.connect_clicked(|_| {
        println!("Button clicked!");
    });

    window.add(&button);

    window.show_all();

    gtk::main();
}
