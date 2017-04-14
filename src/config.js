
export default (function () {
 
  // Instance stores a reference to the Singleton
  var instance
  
  const defaultOptions = {
    reducerKey   : 'user',
    firebasePath : 'user',
    firebase     : undefined // REQUIRED
  }
 
  return {
 
    // Create the Singleton instance if no instance exists
    // or update the existing Singleton
    setConfig: function (options) {
      
      if (!instance) {
        instance = { ...defaultOptions, ...options }
      }
      else {
        instance = { ...instance, ...options }
      }
      
      if (!instance.firebase) {
        console.warn("NO FIREBASE REF PASSED TO USER MODULE")
      }
 
      return instance
    },
    
    // return the Singleton
    getConfig: function () {
      
      if(!instance){
        console.warn("NO USER MODULE INSTANCE CREATED YET")
      }
      
      return instance
    }
 
  };
 
})();