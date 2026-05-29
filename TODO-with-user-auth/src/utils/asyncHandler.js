const asynchandler = (routeHandler) => {
    return async (req, res, next) => {
        Promise.resolve(routeHandler(req, res, next)).catch(next);
    }
}

module.exports = asynchandler;

    
// controller function chalega
// agar success -> response
// agar error -> next(error)