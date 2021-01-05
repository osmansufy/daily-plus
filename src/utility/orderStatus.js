

export const statusOrder=(action)=>{
    switch (action) {
      case 6 :
        return  "cancelled"
      
      case 5 :
        return  "complete"
      
      case 4 :
        return  "on-the-way"
      
      case 3 :
        return  "processing"
      
      case 2 :
        return  "confirmed"
      case 1 :
        return  "pending"
      
    
      default:
        throw new Error('Should not get there!');
    }
  }