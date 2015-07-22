/**
 * Stop_timesController
 *
 * @description :: Server-side logic for managing stop_times
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
   var moment = require('moment');
module.exports = {
	
    
    TimeLab: function(req,res){
     
        var moment = require('moment');
 
        res.send( moment("03:55:00","HH:mm")) ;
    },
    
    LoopMe: function(req,res) {
     Loop() ; 
        res.send("GO GO GO ") ; 
    },
    	TimeSet: function(req, res) {
          //'2015-07-19T03:56:00-07:00',

        Stop_times.find({arrival_time_real:null}).limit(40).skip(1).exec (function(err,found){
      //    var moment = require('moment');
         //   res.send("going") ; 
            var arr = [] ; 
        for (i = 0; i < found.length; i++) { 
            
                var stop_time = found[i] ; 
         sails.log(  moment(stop_time.arrival_time,"hh:mm:ss").format()  );
              //  if(!stop.lat_numeric ){
          //  sails.log 
            stop_time.arrival_time_real  =   moment(stop_time.arrival_time,"hh:mm:ss").format()  ;
          //  sails.log(stop.lat_numeric) ;         
        //        stop.lon_numeric  =  parseFloat(stop.stop_lon) ;
            //stop.save() ; 
        /// sails.log(    parseFloat(stop.stop_lat)  + "Setting Float fields for : " +stop.stop_id  ) ; 
           
        /*   stop_time.save(
                function(err,s){
    sails.log( err + s ) ;
                });*/
                
        //        ) ; 
            arr.push(stop_time) ; 
              }
            //}
            console.log(arr[0]); 
           Stop_times.update(arr).exec(function(err, updated){
               sails.log(err) ;
             //  sails.log(updated) ; 
                res.send("done" + err) ; 
  if (err) {
    // handle error here- e.g. `res.serverError(err);`
    return;
  }

  console.log('Updated user to have name ' + updated[0].arrival_time_real);
});
          //  console.log(err) ; 
           // res.send(found) ;    
    
        
        
        
        
        
        });
     
    }
};


function Loop(){
          //'2015-07-19T03:56:00-07:00',

        Stop_times.find({arrival_time_real:null}).limit(4).skip(1).exec (function(err,found){
            if(found.length < 1 ) {
                return ; 
            }
       
         //   res.send("going") ; 
            var arr = [] ; 
        for (i = 0; i < found.length; i++) { 
            
                var stop_time = found[i] ; 
         sails.log(  moment(stop_time.arrival_time,"HH:mm").format()  );
              //  if(!stop.lat_numeric ){
          //  sails.log 
            stop_time.arrival_time_real  =   moment(stop_time.arrival_time,"HH:mm").format()  ;
          //  sails.log(stop.lat_numeric) ;         
        //        stop.lon_numeric  =  parseFloat(stop.stop_lon) ;
          //  stop_time.save() ; 
        /// sails.log(    parseFloat(stop.stop_lat)  + "Setting Float fields for : " +stop.stop_id  ) ; 
           
        /*   stop_time.save(
                function(err,s){
    sails.log( err + s ) ;
                });*/
                
        //        ) ; 
            arr.push(stop_time) ; 
              }
            //}
            console.log(arr[0]); 
           Stop_times.update(arr).exec(function(err, updated){
               
               Loop();
               sails.log(err) ;
               sails.log(updated) ; 
              //  res.send("done" + err) ; 
  if (err) {
    // handle error here- e.g. `res.serverError(err);`
    return;
  }

  console.log('Updated user to have name ' + updated[0].arrival_time_real);
});
          //  console.log(err) ; 
           // res.send(found) ;    
    
        
        
        
        
        
        });
     
    }

