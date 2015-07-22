/**
 * StopsController
 *
 * @description :: Server-side logic for managing stops
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// generate radius query , thanks GTFS-Node !
   var moment = require('moment');

function GenerateQuery( Lat, Lon, Radius) {
 //
    var query ={};

     var radiusInDegrees = Math.round(Radius / 69 * 100000) / 100000;
    // check if this is invalid
    if( isNaN(radiusInDegrees) || isNaN(Lat) || isNaN(Lon) )
    {
     return null ;
    }
    else {
     // query time !
        // { date: { '>': new Date('2/4/2014'), '<': new Date('2/7/2014') } }
    query.lat_numeric = {'<': Lat + radiusInDegrees , '>':Lat - radiusInDegrees} ;
      query.lon_numeric =   {'<': Lon + radiusInDegrees , '>':Lon - radiusInDegrees} ;
        return query ;
    }



}



function StopQueryBuild(time){
 // since horrible things keep happening when trying to cast strings to times
    // lets do something else
    // will fix this later, once I figure out how to bach import times
    var query = {} ;
  //  var time = moment().format('hh') + ":";
    time = time||"07:"
    sails.log( "Getting times for " + time ) ;
    query.where = {} ;
    query.where.arrival_time = {'startsWith' : time} ;
    query.where.limit = 5 ;
    return query ;
}

module.exports = {

    PopulateLab: function (req,res) {

      Stops.find().limit(4).populate('stop_times',  {limit:4} )
        // Populates are basically joins

      .then(function(found){

          res.send(found) ;
      }).catch(function(error){

res.send(error) ;

      });

      // body...
    },

    FixHeading: function(req,res) {
                Stops.find({stop_desc:null}).limit(1000).populate('stop_times',  {limit:1} )
          // I want to return the stop time according to what's happening soonest
          // but it's not practical right now.
          .then(function(found){

                     var len = found.length ;

                    var updateUs = [] ;
              for (i = 0; i < len; i++) {
                // found[i] ;
                  sails.log(i) ;

                  if(found[i].stop_times[0]  === undefined){
                      sails.log("No stop time, for this stop ");
                  }
                  else{

                  found[i].stop_desc = found[i].stop_times[0].stop_headsign ;
                  }
                      sails.log(found[i] ) ;

                 // var updatedOne = found[i] ;

                  //updatedOne.stop_times[0] = null ;
                  //updateUs.push(updatedOne )  ;
                 found[i].save(

                     function(err,record){
                  sails.log(err + record  + i );



                 }

                 );
              }
                    res.send("done");


                    /*Stops.update(updateUs).then(function(updated){
                        res.send(updated[0]);
                    })

                    .catch(function(error){
                     res.send(error) ;
                    });  */


                   // stop_desc
            //  res.send(found) ;
          })

    },

    SearchRaduis: function(req,res){
        var hour = req.param('hour') ;
        var lat =  parseFloat(req.param('lat') ) ;
        var lon =  parseFloat(req.param('lon') ) ;
        var radius = parseFloat(req.param('radius') ) ;

        if( radius > 1 ) {
            // We don't want to tie up the DB for too long with massive queries
            res.statusCode = 503 ;

         res.send(" Radius is limited to 1 mile, please use a value less than 1 ")
        return ;

        }

        var queryF = GenerateQuery( lat,lon, radius) ;

        if(queryF === null ) {
            var errorMessage = process.env.invalid_value_error || "Invalid query , please check lat , lon and radius fields" ;
         sails.log(errorMessage)     ;
                   res.send(errorMessage) ;
            return ;
        }

        sails.log(queryF  ) ;
        sails.log( "With Raduis of: " + radius +" miles")
        // we limit the  populate query , just to make sure we can process everything in a reasonable amount of time
        // this also cuts back on memory usage.
        // Generally you don't need to get every single time for a day for each stop.


        var done = false ;
        // for performance reasons( mainly you don't want to run out of ram on heroku ), I just cram the
        // first stop time headsign data into the stop_desc, if need be this can be changed later

          Stops.find(queryF)//.populate('stop_times',  {limit:1} )
          // I want to return the stop time according to what's happening soonest
          // but it's not practical right now.
          .then(function(found){

              res.send(found) ;
          })

         /* .then(function(found){

              var GoodResults = found ;

              var len = found.length ;
              for (i = 0; i < len; i++) {
                // make sure every single one has a record , if not just return the first
                var stop_time_look = found[i] ;
              sails.log("stopsArray") ;
                  if(stop_time_look.stop_times.length < 1 ) {

                      sails.log("returning ");
                   return ;
                  }
              }

              done = true ;
              res.send(found);

             // res.send(GoodResults) ;

           // sails.log( "Setting Float fields for : " +stop.stop_id ) ;
            //stop.lat_numeric  =  parseFloat(stop.stop_lat) ;

                //stop.lon_numeric  =  parseFloat(stop.stop_lon) ;
               // stop.save() ;



            //  res.send(found) ;
          }).then(function(found){


                            if(!done) {
                     Stops.find(queryF).populate('stop_times',{limit:1} ).exec(function(err,foundb){
                        sails.log("non-sense") ;
                         if(err) {
                         res.send(err) ;
                         return ;
                         }

                         res.send(foundb) ;


                     });

                            }

          })*/

          .catch(function(err) {
             res.send(err) ;
          });


    },

	Lp: function(req, res) {
     Stops.find().limit(2).skip(1).exec (function(err,found){
     var Ff = found[0];
         Stop_times.find({stop_id:found[0].stop_id}).exec (function(err,found){
        Ff.times = found ;
             sails.log(Ff) ;
    res.send(Ff) ;

         });

});

    } ,

    Jerry: function(req, res) {
        Stops.find().skip(1).exec (function(err,found){


        for (i = 0; i < found.length; i++) {

                var stop = found[i] ;

           // sails.log( "Setting Float fields for : " +stop.stop_id ) ;
            //stop.lat_numeric  =  parseFloat(stop.stop_lat) ;

                //stop.lon_numeric  =  parseFloat(stop.stop_lon) ;
               // stop.save() ;
            }
            console.log(err) ;
            res.send(found) ;
        });

    },

	LatLonFix: function(req, res) {
        Stops.find({lat_numeric:null}).limit(100).skip(1).exec (function(err,found){

         //   res.send("going") ;
            var arr = [] ;
        for (i = 0; i < found.length; i++) {

                var stop = found[i] ;

              //  if(!stop.lat_numeric ){
            stop.lat_numeric  =  parseFloat(stop.stop_lat) ;
            sails.log(stop.lat_numeric) ;
                stop.lon_numeric  =  parseFloat(stop.stop_lon) ;
            stop.save() ;
        /* sails.log(    parseFloat(stop.stop_lat)  + "Setting Float fields for : " +stop.stop_id  ) ;
                stop.save(
                function(err,s){
    sails.log( err + s ) ;
      }*/

        //        ) ;
            arr.push(stop) ;
           //     }
            }
            console.log(arr[0]);
           Stops.update(arr).exec(function afterwards(err, updated){
                res.send("done" + err) ;
  if (err) {
    // handle error here- e.g. `res.serverError(err);`
    return;
  }

  console.log('Updated user to have name ' + updated[0].lon_numeric);
});
          //  console.log(err) ;
           // res.send(found) ;






        });

    }
};
