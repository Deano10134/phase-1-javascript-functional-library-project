// phase-1-javascript-functional-library-project 


// The first function myEach takes a collection (array or object) and a callback function.
function myEach(collection, callback) {
  if (Array.isArray(collection)) {
    collection.forEach(callback);
  } else if (typeof collection === 'object' && collection !== null) {
    Object.keys(collection).forEach(key => callback(collection[key]));
  } else {
    console.warn("Invalid input: Expected an array or an object");
  }
  return collection;
}

// the second function is call myMap, which applies a callback function to each element in a collection and returns a new array with the results.

function myMap(collection,callback) {
    let result = [];
    if (Array.isArray(collection)) {
        collection.forEach((item, index) => {
            result.push(callback(item, index, collection));
        });
    } else if (typeof collection === 'object' && collection !== null) {
        Object.keys(collection).forEach((key, index) => {
            result.push(callback(collection[key], key, collection));
        });
    } else {
        console.warn("Invalid input: Expected an array or an object");
    }
    return result;
}

// The third function is myReduce, which reduces a collection to a single value using a callback function.
function myReduce(collection, callback, initialValue) {
  let accumulator;
  if (Array.isArray(collection)) {
    let startIndex = 0;
    if (initialValue !== undefined) {
      accumulator = initialValue;
    } else {
      if (collection.length === 0) {
        throw new TypeError("Reduce of empty array with no initial value");
      }
      accumulator = collection[0];
      startIndex = 1;
    }
    for (let i = startIndex; i < collection.length; i++) {
      accumulator = callback(accumulator, collection[i], i, collection);
    }

  } else if (typeof collection === 'object' && collection !== null) {
    const keys = Object.keys(collection);
    if (initialValue !== undefined) {
      accumulator = initialValue;
      keys.forEach((key, index) => {
        accumulator = callback(accumulator, collection[key], key, collection);
      });
    } else {
      if (keys.length === 0) {
        throw new TypeError("Reduce of empty object with no initial value");
      }
      const [firstKey, ...restKeys] = keys;
      accumulator = collection[firstKey];
      restKeys.forEach((key, index) => {
        accumulator = callback(accumulator, collection[key], key, collection);
      });
    }

  } else {
    console.warn("Invalid input: Expected an array or an object");
    return initialValue;
  }

  return accumulator;
}

// third function is myFind, which finds the first element in a collection that satisfies a provided testing function.
function myFind(collection, callback) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (callback(collection[i], i, collection)) {
        return collection[i];
      }
    }
  } else if (typeof collection === 'object' && collection !== null) {
    for (const key in collection) {
      if (callback(collection[key], key, collection)) {
        return collection[key];
      }
    }
  } else {
    console.warn("Invalid input: Expected an array or an object");
  }
  return undefined;
}
// The fourth function is myFilter, which creates a new array with all elements that pass the test implemented by the provided function.
function myFilter(collection, callback) {
  let result = [];

  if (Array.isArray(collection)) {
    collection.forEach((item, index) => {
      if (callback(item, index, collection)) {
        result.push(item);
      }
    });
  } else if (typeof collection === 'object' && collection !== null) {
    Object.keys(collection).forEach((key, index) => {
      if (callback(collection[key], key, collection)) {
        result.push(collection[key]);
      }
    });
  } else {
    console.warn("Invalid input: Expected an array or an object");
  }

  return result;
}
// The fifth function is mySize, which returns the number of elements in a collection.
function mySize(collection) {
  if (Array.isArray(collection)) {
    return collection.length;
  } else if (typeof collection === 'object' && collection !== null) {
    return Object.keys(collection).length;
  } else {
    console.warn("Invalid input: Expected an array or an object");
    return 0;
  }
}

// The sixth function is myFirst, which returns the first element of a collection or the first n elements if a second argument is provided.
function myFirst(collection, n) {
  if (!Array.isArray(collection)) {
    console.warn("Invalid input: Expected an array");
    return n ? [] : undefined;
  }

  if (n === undefined) {
    return collection[0];
  }

  if (typeof n !== 'number' || n < 0) {
    console.warn("Invalid 'n' value: Expected a non-negative number");
    return [];
  }

  return collection.slice(0, n);
}
// The seventh function is myLast, which returns the last element of a collection or the last n elements if a second argument is provided.
function myLast(collection, n) {
  if (!Array.isArray(collection)) {
    console.warn("Invalid input: Expected an array");
    return n ? [] : undefined;
  }

  if (n === undefined) {
    return collection[collection.length - 1];
  }

  if (typeof n !== 'number' || n < 0) {
    console.warn("Invalid 'n' value: Expected a non-negative number");
    return [];
  }

  return collection.slice(-n);
}

// The eighth function is myKeys, which returns an array of the keys of an object.
function myKeys(collection) {
  if (typeof collection !== 'object' || collection === null || Array.isArray(collection)) {
    console.warn("Invalid input: Expected an object");
    return [];
  }
  return Object.keys(collection);
}

// The ninth function is myValues, which returns an array of the values of an object.
function myValues(collection) {
  if (typeof collection !== 'object' || collection === null || Array.isArray(collection)) {
    console.warn("Invalid input: Expected an object");
    return [];
  }
  return Object.values(collection);
}

//Bonus section added mySortBy, which sorts an array based on a callback function.
function mySortBy(array, callback) {
    if (!Array.isArray(array)) {
        console.warn("Invalid input: Expected an array");
        return [];
    }   
    return array.slice().sort((a, b) => {
        const aValue = callback(a);
        const bValue = callback(b);
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
    });
}

// next is myFlatten, which flattens a nested array into a single-level array.
function myFlatten(array ,shallow = false) {
    if (!Array.isArray(array)) {
        console.warn("Invalid input: Expected an array");
        return [];
    }

    if (shallow) {
        return array.flat();
    }

    return array.reduce((acc, val) => {
        if (Array.isArray(val)) {
            acc.push(...myFlatten(val));
        } else {
            acc.push(val);
        }
        return acc;
    }, []);
}