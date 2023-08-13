const Validation = (values) => {

    let error={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(values.email === "") {
        error.email = "Email should not be empty"
    } else if(!email_pattern.test(values.email)) {
        error.email = "Please provide correct email format"
    } else {
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Password should not be empty"
    } else if(!password_pattern.test(values.password)) {
        error.password = "Please provide correct password format"
    } else {
        error.password = ""
    }

    return error
}

export default Validation