
function Errors(props){

    const errorNum = (number)=>{
        let error=""
        switch (props.errorCode){
            case 1:
                error = "User name is miss"
                break
            case 2:
                error = "Password is miss"
                break
            case 3:
                error = "Password is not equals"
                break
            case 4:
                error = "Password is short"
                break
            case 5:
                error = "User name is taken"
                break
            case 6:
                error = "Login is wrong"
                break
            case 7:
                error = "User not find"
                break
            case 8:
                error = "There is note like this"
                break
            default:
                break
        }
        return  error;
    }

    return(<div style={{color:"red"}}>
        There was an error: {errorNum(props.errorCode)}
    </div>)
}export default Errors;