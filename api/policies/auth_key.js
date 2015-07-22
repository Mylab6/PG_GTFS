// auth_key needed to change data. 
// for the most part you shouldn't modify data in a GTFS database, since bizzare and weird things may happen
// but this is primary for my parse date/ parse float  code

 require('dotenv').load();
module.exports = function auth_key (req, res, next) {
    
    
    if( req.param('auth_key') === process.env.auth_key ){
        // auth key is valid , lets go
        next();
    }
    else{
     
        // the auth key is invalid, tell the user to get one 
        
        return  res.send("auth key invalid ") ;
    }
    
    ;
    
}