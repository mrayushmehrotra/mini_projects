package main

import (
	"fmt"
	"regexp"
)

// isValidEmail checks if an email address is valid
func isValidEmail(email string) bool {
	// Regular expression for a basic email validation
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

	// Compile the regular expression
	re := regexp.MustCompile(emailRegex)

	// Use the regular expression to check if the email is valid
	return re.MatchString(email)
}

func main() {
	email := "iameye@gmail.com"
	if isValidEmail(email) {
		fmt.Printf("%s is a valid email address\n", email)
	} else {
		fmt.Printf("%s is not a valid email address\n", email)
	}

	
}
