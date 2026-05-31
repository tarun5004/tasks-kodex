const asyncHandler = (routeHandler) => {
    return async (req, res, next) => {
        Promise.resolve(routeHandler(req, res, next)).catch(next);
    }
}

export default asyncHandler;

    
// controller function chalega
// agar success -> response
// agar error -> next(error)
