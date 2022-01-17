const logger = (req, res, next) => {
    console.log(req.method, req.url);
    // res.json({ res: "Response from the middleware" })
    next();
}


const catchAsyncErrors = (handler) => {
    return async (req, res, next) => {
        try {
            //throw new Error("error")
            await handler(req,res,next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { logger,catchAsyncErrors }