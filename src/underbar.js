(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val; 
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n > array.length) {
      return array;
    }
    return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length)
  
  }

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      };
    } else {
      for(let key in collection){
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    let result = -1;

    _.each(array, (item, index) => {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    let newArray = []; 
    //should return all even numbers in an array 
    //should return all odd numbers in an array 
    //loop through collection array 
    _.each(collection, (e, i, collection) =>{
      let result = test(e, i, collection); 
      if(result === true){
        newArray.push(e)
      }


    });
    return newArray; 
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    let newArray = []
    _.each(collection, (e, i, collection) =>{
      let result = test(e, i, collection); 
    if(result !== true){
        newArray.push(e)
      }


    });
    return newArray; 
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {

    let uniqueArray = []
    let emptyArr = []

    if (isSorted === true){
      for(let i = 0; i < array.length; i++){
        if(!emptyArr.includes(iterator(array[i]))){
          emptyArr.push(iterator(array[i]))
          uniqueArray.push(array[i])
          
        }
      }
      return uniqueArray; 
    } 

   

     if(isSorted === undefined){
      for(let i = 0; i < array.length; i++){
        if(!uniqueArray.includes(array[i])){
          uniqueArray.push(array[i])
           
        }
      }
      return uniqueArray; 
    }
    
    

}; 
   
    


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let newArray = []; 
    _.each(collection, (e, i, collection) => {
        let result = iterator(e, i, collection)
        newArray.push(result)
    })
    return newArray;

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, (item) => {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   const numbers = [1,2,3];
  //   const sum = _.reduce(numbers, (total, number) => {
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   const identity = _.reduce([5], (total, number) => {
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(array, func, seed) {
    let previousResult;
    //create an if/else chain to determine if seed is given or not (undefined)
    if (seed !== undefined) {
    //if seed is given let it equal previousResult 
        previousResult = seed;
    //call the each function 
    //each will pass every value in the array thru our reducer function (func)
    _.each(array, function(e,i,a) {
        previousResult = func(previousResult, e, i, a);
    });
    //if seed is not given, set it equal to the first value in the array
    } else {
        previousResult = array[0];
    //instead of using each, use a for loop to iterate over the array
        for (let i = 1; i < array.length; i++) {
            previousResult = func(previousResult, array[i], i, array);
            }
        } 
        return previousResult;
    

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, (wasFound, item) => {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;
    return _.reduce(collection, function(isTrue, item){
      return isTrue && Boolean(iterator(item));
    }, true); 
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity
    //will still iterate whether its true or false 
    return !_.every(collection, function(item){
      return !iterator(item)
    })
    
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   const obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          obj[key] = source[key];
        }
      }
    }
    return obj;
  
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (!(key in obj)) {
            obj[key] = source[key];
          }
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
  
    //create two variables
    //set a variable for the function and make it equal to false
    var prevCall = false;
    //create another variable to return the results
    var result;

    //now use scope and closure so that the function can only get called one time 
   
    return function() {
      //if prevCall is true then we run the function call 
      if (!prevCall) {
        
        //we assign the function call to result 
        //we want to pass everything into the function call 
        result = func.apply(this, arguments);
        prevCall = true;
      }
      //now we return the result of the function call and it will only
      // be returned once since it is in a scope
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    
    //create an empty object 
    let memo = {};

    //create a function to be returned 
    return function() {
      //method converts a JavaScript object or value to a JSON string
      //optionally replacing values if a replacer function is specified 
    
      let memoResult = JSON.stringify(arguments);
      
      //create an object with the memo variable 
      //assign the variable used to covert the argument to a string and pass it into the key of the object that we are creating
      //based on the results you will either apply the function or convert the object or value to a string and return the results 
      return memo[memoResult] = memo[memoResult] || func.apply(this, arguments);


    };
    
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //create a new variable 
    // var arg = [];
    // //create a conditional to compare the length of the arguments 
    // if (arguments.length > 2) {
    //   //create a for loop to loop through the arguments 
    //   //start off at index 2 when looping 
    //   for (var i = 2; i < arguments.length; i++) {
    //     arg[i - 2] = arguments[i];
    //   }
    //   setTimeout(func.apply(this,arg), wait);
    // }
    // else {
    //   setTimeout(func, wait);

   // }

   //create a variable to store results 
   var args = _.map(arguments, item => item).slice(2);
   
   //call the setTimeout function to be invoked
   setTimeout(function(){
     func.apply(this, args);
   }, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //create three variables 
    //slice array
    var duplicate = array.slice(0,array.length)
    //create an empty variable to store results 
    var mixedArray = [];
    var index;
    //loop through the array
    for (var i = 0; i < array.length; i++) {
      //call the math function to randomize array 
      index = Math.floor(Math.random()*duplicate.length);
      //push the results into the empty array 
      mixedArray.push(duplicate[index]);
      //slice it 
      duplicate.splice(index,1);
    }
    //return it 
    return mixedArray;
  };


  /**
   * ADVANCED
   * =================
   *
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    //call the map function 
    return _.map(collection, function(item) {
      //create an empty variable to assign the results too 
      var func;
      //use a conditional to check if functionOrKey is a string or not 
      if(typeof functionOrKey === 'string') {
        //then since it passed assign it to the variable 
        func = item[functionOrKey];
      } else {
        //if it doesnt't pass then assign ot to the variable 
        func = functionOrKey;
      }
      //then use apply to return it 
      return func.apply(item, args);
      });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if(typeof iterator === 'function') {
      return collection.sort( function(a, b) {
        return iterator(a) - iterator(b);
      });
     } else if (typeof iterator === 'string') {
        return collection.sort( function(a, b) {
          if (a[iterator] < b[iterator]) {
            return -1;
          }
          if (a[iterator] > b[iterator]) {
            return 1;
          }
          return 0;
        });
       } else {
        return null;
      }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    //create an empty array to store results 
    var newArr = [];

    //create a function to pull together the different array lengths 
    function findLongest() {
      //create an empty variable 
      var longest = 0;
      //create a for loop to loop through the argument
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i].length > longest) {
          //assign all of the lengths greater than longest to the longest variable 
          longest = arguments[i].length;
       }
      }
      //return longest 
      return longest;
    }

    //create another variable to access the results from the findLongest function 
    var longestArr = findLongest(arguments);
    //loop through the longestArr variable 
    for (var i = 0; i < longestArr; i++) {
      //create an empty variable to push results into 
      var arr1 = [];
      for (var a = 0; a < arguments.length; a++) {
        //push the results into the empty array 
        arr1.push(arguments[a][i]);
      }
      //push those results into the newArr variable created at the begining of the function 
      newArr.push(arr1);
    }
    //return result 
    return newArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var newArr = [];
    _.each(nestedArray, function(item) {
      if (Array.isArray(item)) {
        newArr = newArr.concat(_.flatten(item));
      } else {
        newArr.push(item);
      }
    });
    return newArr;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(a1, a2) {
    let newArr = [];
     for (var i = 0; i < a1.length; i++){
    if(a2.includes(a1[i])){
      newArr.push(a1[i])
    }
  }

  return newArr; 
   
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function( a1, ...a2) {
    
    let newArr = []
  let diff = []

  for (var i = 0; i < a1.length; i++){
    if(!a2.includes(a1[i])){
      newArr.push(a1[i])
    }
  }

 if(newArr.length === 3){
   diff.push(newArr[0])
   diff.push(newArr[2])
   return diff
 } else if( newArr.length > 3){
   diff.push(newArr[2])
   diff.push(newArr[3])
   return diff; 

 }

 


  return newArray; 
   
    
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    //create a variable 
    var start = false;

    //implement a return function 
    return function() {
      //if start is not equal to true then we assign it to be true 
      if (start !== true) {
        //assign start to be true so the function can pass 
        start = true;
        //we use apply to apply the function to the arguments 
        func.apply(Array.prototype.slice.apply(arguments));

        //call the setTimeout function so that it can  evaluate the expression 
        setTimeout(function() {
          start = false;
        }, wait);
      }
    };
  
  };
  
  
}());
