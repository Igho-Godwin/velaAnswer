/**
 * This is the entry point to the program
 *
 * Question 1
 * @param {any} input2 Array of student objects
 */
function classifier(input) {
  // Your code goes here
  if((!input) || (!Array.isArray(input)))
  {
      throw "Incorrect Value";
  }
  else if(input.length > 0)
  {
      
    var input2 = sortInput(input);      
      
    var year = getCurrentYear();
      
    var first_date = getFirstDate(input2);
      
    var results = processFactory(input2,year,first_date); 
   
    return JSON.parse('{'+results.results+',"noOfGroups":'+results.total_no_of_groups+'}');

  }
  else
  {
       return {"noOfGroups": 0};
  }

}



//Sorts the input in descending order by date of birth (dob)
function sortInput(input){
    
    var input2 = input.slice();
    input2.sort(function(a, b){return parseInt(b.dob.toString().substr(0,4)) - parseInt(a.dob.toString().substr(0,4))});
    return input2;
}

// returns The current Year we are in
function getCurrentYear()
{
    var d = new Date();
    var year = parseInt(d.getFullYear());
    
    return year;
}

// Returns First group  date to compare with other dates (making sure they are within the 5 years range)

function getFirstDate(input2)
{
    var val = input2[0].dob.toString();
    var d = new Date(val);
      
    var val = parseInt(d.getFullYear());
    var first_date = val;
    
    return first_date;
}

// Gets the year of the current Date of Birth in process factory loop
function getCurrentDobYear(value)
{
     var val = value.dob.toString();
     var d = new Date(val);
     val = parseInt(d.getFullYear());
    
     return val;
}

// Processes data
function processFactory(input2,year,first_date)
{
    
    var x = 0; var j=0; var count=0; var results ='';
    var members = []; var age = 0; var ages = []; var regNos=[];
    var f= 0; var val=''; var regNos2=[];
    
    for(var i=0;i<input2.length;i++)
    {
       
       x++;f=0;age=0;
          
       val = getCurrentDobYear(input2[i]); 
            
       if((first_date - val) <= 5 )
       {
          
           age = parseInt(year) - val;
          members.push('{"age":'+age+',"dob":"'+input2[i].dob.toString()+'","name":"'+input2[i].name+'","regNo":"'+input2[i].regNo+'"}');
           
           ages.push(age);
           
           regNos.push(input2[i].regNo);
           
           count++;
       }
       
       if( ((first_date - val) > 5) || (i == (input2.length-1))  )  
       {
           x=3;f=1;
       }
         
       if(x == 3){
           
           var age_sum = ages.reduce(getSum, 0);
           
           var oldest =  getOldestMemberAge(ages);
           
           regNos2 = getRegNos(regNos);
           
           var data=[]; var grp_no = j+1;
    
           results+=   '"group'+grp_no.toString()+'":{'+'"members":['+members+'],"oldest":'+oldest+',"regNos":['+regNos2+'],"sum":'+age_sum+'},';
           
           x=0; j++; members=[]; ages=[]; regNos=[]; regNos2=[]; count=0;
           
           if(f == 1){
             
              first_date = val;
               
              age = parseInt(year) - val;
              members.push('{"age":'+age+',"dob":"'+input2[i].dob.toString()+'","name":"'+input2[i].name+'","regNo":"'+input2[i].regNo+'"}');
               
              ages.push(age);
               
              regNos.push(input2[i].regNo);
               
              count++;
               
              x++;    
           }
           else if(input2[i+1]){
               
              first_date = getCurrentDobYear(input2[i+1]);
               
           }
           
       }
       
    }
    
    results = results.substr(0,results.length-1);
    var total_no_of_groups = j;
    return {results,total_no_of_groups};
}

// Get current oldest member age for group
function getOldestMemberAge(ages)
{
    var new_ages = ages;
           
    new_ages.sort(function(a, b){return parseInt(b) - parseInt(a)});
           
    var oldest = new_ages[0];
    
    return oldest;
}

// This function sorts and parses reg no to integer
function getRegNos(regNos)
{
    regNos.sort(function(a, b){return parseInt(a) - parseInt(b)});
           
    var regNos2 = regNos.map(function (x) { 
        return parseInt(x, 10); 
    });
    
    return regNos2;
}

//calculates sum of ages
function getSum(total, num) {
  return total + num;
}


module.exports = classifier;
