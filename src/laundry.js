/**
 * This is the entry point to your program
 *
 * Question 2
 *
 * @param {number} noOfWashes The number of washes the machine can wash
 * @param {number[]} cleanPile Array containing the number of clean socks
 * @param {number[]} dirtyPile Array containing the number of dirty socks
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  // Your code goes here
    var new_arr = []; var arr = [...new Set(cleanPile)];//Get unique colour tags in clean pile
    
    var count =0; var val=''; var no_of_pairs = 0;
    
    cleanPile.sort(function(a, b){return parseInt(a) - parseInt(b)});
    
    dirtyPile.sort(function(a, b){return parseInt(a) - parseInt(b)});
      
    var result = countAllCleanPairs(arr,cleanPile);
    
    no_of_pairs = result.no_of_pairs;
    cleanPile = result.cleanPile;
    
    if(noOfWashes == 0)
    {
        return no_of_pairs;
    }
    
    var washes_count =0;

    result = countPairsOfDirtyAndCleanPiles(cleanPile,dirtyPile,washes_count,no_of_pairs,noOfWashes);
    
    if(result.final == 1){
        return result.no_of_pairs;
    }
    
    dirtyPile = result.dirtyPile;
    washes_count = result.washes_count;
    no_of_pairs = result.no_of_pairs;
    
    arr = [...new Set(dirtyPile)];//Get unique colour tags in dirty pile
    
    result = countDirtyPilesPairs(arr,dirtyPile,no_of_pairs,washes_count,noOfWashes);
    
    return result.no_of_pairs;

}

//Count Pairs that exist in dirty pairs array
function countDirtyPilesPairs(arr,dirtyPile,no_of_pairs,washes_count,noOfWashes)
{
    var count =0; 
    
    for (var i = 0; i < arr.length; i++) {
        
        count = 0;
        
        for (var j = 0; j < dirtyPile.length; j++) {
            
            if(arr[i] == dirtyPile[j] ){
                
               count++;//count identical values or colour tags
                 
               if(count == 2)
               {
                   
                   // Remove Pairs
                   dirtyPile.splice(j-1, 1);//remove identical value 1
                   dirtyPile.splice(j-1, 1);//remove identical value 2
                   
                   no_of_pairs++; //count pairs
                   
                   j-=2;
                   washes_count+=2; //count washes;
                   count = 0;    
               }
                
               if(washes_count == noOfWashes || washes_count+2 > noOfWashes ){
                       return {no_of_pairs};
               }
                           
            }
            
        }
        
        
    }
    
    return {no_of_pairs};
    
}

//Counts Pairs that exist in dirty and clean piles

function  countPairsOfDirtyAndCleanPiles(cleanPile,dirtyPile,washes_count,no_of_pairs,noOfWashes)
{
      var count =0; var final =0;//detects an immediate return
    
      for (var j = 0; j < cleanPile.length; j++) {
        
        count = 1;
        
        for(var i =0; i < dirtyPile.length; i++)
        {
            if(cleanPile[j] == dirtyPile[i])
            {
                count++;
                if(count == 2)
                {
                    no_of_pairs++;
                    washes_count++;
                    dirtyPile.splice(i, 1);// remove a possible pair value
                    
                }
            }
            
            if(washes_count == noOfWashes ){
                final =1;
                return {no_of_pairs,final};
            }
        }
                     
     }
    
    return {washes_count,dirtyPile,no_of_pairs,final};
    
}

// Count all Pairs in Clean Pile

function countAllCleanPairs(arr,cleanPile)
{
    
     var count = 0;var no_of_pairs=0;
    
     for (var i = 0; i < arr.length; i++) {
        
        count = 0;
        
        for (var j = 0; j < cleanPile.length; j++) {
            
            if(arr[i] == cleanPile[j] ){
                
               count++;
                
               if(count == 2)
               {
                  
                   cleanPile.splice(j-1, 1);
                   cleanPile.splice(j-1, 1);
                   no_of_pairs++;
               
                   j-=2;
                   count = 0; 
               }
                   
            }
            
        }
        
        
    }
    
    return {cleanPile,no_of_pairs};
   
}

module.exports = getMaxPairs;
