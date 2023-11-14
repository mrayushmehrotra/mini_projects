use validator::validate_email;
use dns_lookup::lookup_host;

fn check_email_existence(email: &str) -> bool {
    // Check email syntax using the validator crate
    if !validate_email(email) {
        println!("Invalid email syntax");
        return false;
    }

    // Extract domain from the email address
    let domain: Vec<&str> = email.split('@').collect();
    if domain.len() != 2 {
        println!("Invalid email address");
        return false;
    }

    let domain = domain[1];

    // Perform DNS query to check the existence of the email domain
    match dns_lookup::lookup_host(domain) {
        Ok(_) => {
            println!("Domain exists");
            true
        }
        Err(_) => {
            println!("Domain does not exist");
            false
        }
    }
}

fn main() {
    let email = "bokacghda@gmali.com";

    if check_email_existence(email) {
        println!("Email address exists (syntax and domain are valid)");
    } else {
        println!("Email address does not exist or has invalid syntax/domain");
    }
}
