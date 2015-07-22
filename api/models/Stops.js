/**
* Stops.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

      stop_id:{type:'string', primaryKey: true,  columnName : 'stop_id' 
              
              ,index: true
              },stop_code:{type:'string'},stop_name:{type:'string'},stop_desc:{type:'string'},stop_lat:{type:'string'},stop_lon:{type:'string'},stop_url:{type:'string'},location_type:{type:'string'},parent_station:{type:'string'},tpis_name:{type:'string'}, lat_numeric:{type:'float'},lon_numeric:{type:'float'}
, 
      
     /*id: {
      type: 'integer',
      primaryKey: true
    } */
      
   
     
      stop_times:{
          //  collection: 'stop_times',
          collection :'stop_times',
           via: 'stop_id'
        } 
            
  
  }
};

