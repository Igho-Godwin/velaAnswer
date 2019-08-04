const { getTrips } = require('api');
const report = require('../fixtures/report.json');

/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */
async function analysis() {
  // Your code goes here

  var cashBilledTotal = parseFloat((report.reduce(function (sum, data) {
                        return (sum + data.totalCashAmount)
                     }, 0)).toFixed(1));
    
  var billedTotal = parseFloat(getBilledTotal(report).toFixed(2));
    
  
  var nonCashBilledTotal =  billedTotal - cashBilledTotal ;
      
  var noOfCashTrips = report.reduce(function (sum, data) {
                           return (sum + data.noOfCashTrips)
                         }, 0);
    
  var noOfNonCashTrips = report.reduce(function (sum, data) {
                              return (sum + (data.noOfTrips - data.noOfCashTrips))      
                         }, 0);
    
  var noOfDriversWithMoreThanOneVehicle = report.reduce(function (sum, data)                                         {
                                            if(data.vehicles.length > 1)
                                            {
                                                 return sum+1;    
                                            }
                                            
                                            return sum;
      
                                          }, 0);
    
  var highest_earning_arr = report;
    
  var most_trips_arr = report;
    
  highest_earning_arr.sort(function(a, b){return parseInt(b.totalAmountEarned) - parseInt(a.totalAmountEarned)});
    
  var highest_earning_driver_email = highest_earning_arr[0].fullName.toLowerCase().replace(/ /g,'')+'@example.com'; 
    
  var highest_earning_driver_name = highest_earning_arr[0].fullName;
    
  var highest_earning_driver_noOfTrips = highest_earning_arr[0].noOfTrips;
    
  var highest_earning_driver_phone = highest_earning_arr[0].phone;
    
  var highest_earning_driver_phone = highest_earning_arr[0].phone;
    
  var highest_earning_driver_totalAmount_Earned = highest_earning_arr[0].totalAmountEarned;
    
  most_trips_arr.sort(function(a, b){ return (a.fullName < b.fullName) ? -1 : (a.fullName > b.fullName) ? 1 : 0});
    
  most_trips_arr.sort(function(a, b){return parseInt(b.noOfTrips) - parseInt(a.noOfTrips)});
    
  var most_trips_driver_email = most_trips_arr[0].fullName.toLowerCase().replace(/ /g,'')+'@example.com'; 
 
  var most_trips_driver_name = most_trips_arr[0].fullName; 
    
  var most_trips_driver_noOfTrips = most_trips_arr[0].noOfTrips;
    
  var most_trips_driver_phone = most_trips_arr[0].phone;
    
  var most_trips_driver_totalAmount_Earned = most_trips_arr[0].totalAmountEarned;
  
  return getJsonResults(billedTotal,cashBilledTotal,highest_earning_driver_email,highest_earning_driver_name,highest_earning_driver_noOfTrips,highest_earning_driver_phone,highest_earning_driver_totalAmount_Earned,most_trips_driver_email,most_trips_driver_name,most_trips_driver_noOfTrips,most_trips_driver_phone,most_trips_driver_totalAmount_Earned,noOfCashTrips,noOfDriversWithMoreThanOneVehicle,noOfNonCashTrips,nonCashBilledTotal);  
  
  
}

// get final out put in json
 function getJsonResults(billedTotal,cashBilledTotal,highest_earning_driver_email,highest_earning_driver_name,highest_earning_driver_noOfTrips,highest_earning_driver_phone,highest_earning_driver_totalAmount_Earned,most_trips_driver_email,most_trips_driver_name,most_trips_driver_noOfTrips,most_trips_driver_phone,most_trips_driver_totalAmount_Earned,noOfCashTrips,noOfDriversWithMoreThanOneVehicle,noOfNonCashTrips,nonCashBilledTotal)
{
    return {
        billedTotal:billedTotal,
        cashBilledTotal:cashBilledTotal,
        highestEarningDriver:{
            
            email:highest_earning_driver_email,
            name:highest_earning_driver_name,
            noOfTrips:highest_earning_driver_noOfTrips,
            phone:highest_earning_driver_phone,
            totalAmountEarned:highest_earning_driver_totalAmount_Earned,
        },
        mostTripsByDriver:{
            
                email:most_trips_driver_email,
                name:most_trips_driver_name,
                noOfTrips:most_trips_driver_noOfTrips,
                phone:most_trips_driver_phone,
                totalAmountEarned:most_trips_driver_totalAmount_Earned,
        },
      
        noOfCashTrips:noOfCashTrips,
        noOfDriversWithMoreThanOneVehicle:noOfDriversWithMoreThanOneVehicle,
        noOfNonCashTrips:noOfNonCashTrips,
        nonCashBilledTotal:nonCashBilledTotal,
  };
}

// get total bill
function getBilledTotal(report)
{
    var billedTotal =0; var i=0; var j =0;
    
    for(i = 0;i<report.length;i++)
    {
       for(j= 0;j<report[i].trips.length;j++)
       {
         billedTotal+=  report[i].trips[j].billed; // suming trips bill
       }
      
    }
    
    return billedTotal;
}




module.exports = analysis;
