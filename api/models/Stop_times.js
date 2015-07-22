/**
* Stop_times.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
trip_id:{type:'string'},arrival_time:{type:'string'},departure_time:{type:'string'},
      
      departure_time_real:{type:'datetime'} ,
      arrival_time_real:{type:'datetime'},
      
      //stop_id:{type:'string'}
      
      stop_sequence:{type:'string'},stop_headsign:{type:'string'},pickup_type:{type:'string'},drop_off_type:{type:'string'},  
      
      id: {
      type: 'integer',
      primaryKey: true ,
          index: true
    }
  
  
 ,
  stop_id:{
            model :'stops'
     // , via : 'stop_times'
        } 
  
  }, 
autoCreatedAt:false ,
    autoUpdatedAt :false
    
};

