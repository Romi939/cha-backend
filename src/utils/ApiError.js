class ApiError extends Error{
    constructor(
        statesCode,
        message= "Something went wrong",
        errors =[],
        statck=""
    ){
        super(message)  
        this.statusCode= statusCode
        this.date=null
        this.message= message
        this.success=false;
        this.errors=errors

        if(statck){
            this.stack =statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export{ApiError}