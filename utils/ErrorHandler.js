//inherit error class

class ErrorHandler extends Error{

    //for initialisation of error
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports= ErrorHandler;