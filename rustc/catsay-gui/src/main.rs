
use cursive::{self, views::{TextView, Dialog}};
fn main() {
    let mut siv = cursive::default();
    let cat_text = "Meow!
    \\
      \\
        /\\_/\\
       ( o o )
       =( I )=";
    
    siv.add_layer(
        Dialog::around(TextView::new(cat_text))
        .button("OK", |s| s.quit() )
   );
    siv.run();
}

