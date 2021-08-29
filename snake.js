const arr=["Andrew","Dara","christian","Zaffke", "Joe","Sink", "Ryan-Cranney","Zach", "Wade","Dallas", "JustinJoyLife","Humps"]
const num =16
const snake=(tList,rounds)=>{
    let order = [];
    // console.log(tList)
    
    let list1=tList
    // console.log(list1,list2);
    for (let i = 1; i <= rounds; i++) {
      if (i % 2 !== 0) {
        //   console.log(list1)
        list1.forEach((team) => order.push(team));

        // console.log(i,list1)
      } else if (i % 2 === 0) {
        let rOrder=list1.reverse()
        // console.log(rOrder)
        rOrder.forEach((team) => order.push(team));
        // return
         rOrder=list1.reverse()
      }
    }
    return order;
}
// console.log(snake(arr,num))
console.dir(snake(arr,num), {"maxArrayLength": null});
[
    "Andrew", "Dara",          "christian",     "Zaffke",
    "Joe",    "Sink",          "Ryan-Cranney",  "Zach",
    "Wade",   "Dallas",        "JustinJoyLife", "Humps",
    "Humps",  "JustinJoyLife", "Dallas",        "Wade",
    "Zach",   "Ryan-Cranney",  "Sink",          "Joe",
    "Zaffke", "christian",     "Dara",          "Andrew",
    "Andrew", "Dara",          "christian",     "Zaffke",
    "Joe",    "Sink",          "Ryan-Cranney",  "Zach",
    "Wade",   "Dallas",        "JustinJoyLife", "Humps",
    "Humps",  "JustinJoyLife", "Dallas",        "Wade",
    "Zach",   "Ryan-Cranney",  "Sink",          "Joe",
    "Zaffke", "christian",     "Dara",          "Andrew",
    "Andrew", "Dara",          "christian",     "Zaffke",
    "Joe",    "Sink",          "Ryan-Cranney",  "Zach",
    "Wade",   "Dallas",        "JustinJoyLife", "Humps",
    "Humps",  "JustinJoyLife", "Dallas",        "Wade",
    "Zach",   "Ryan-Cranney",  "Sink",          "Joe",
    "Zaffke", "christian",     "Dara",          "Andrew",
    "Andrew", "Dara",          "christian",     "Zaffke",
    "Joe",    "Sink",          "Ryan-Cranney",  "Zach",
    "Wade",   "Dallas",        "JustinJoyLife", "Humps",
    "Humps",  "JustinJoyLife", "Dallas",        "Wade",
    "Zach",   "Ryan-Cranney",  "Sink",          "Joe",
    "Zaffke", "christian",     "Dara",          "Andrew",
    "Andrew", "Dara",          "christian",     "Zaffke",
    "Joe",    "Sink",          "Ryan-Cranney",  "Zach",
    "Wade",   "Dallas",        "JustinJoyLife", "Humps",
    "Humps",  "JustinJoyLife", "Dallas",        "Wade",
    "Zach",   "Ryan-Cranney",  "Sink",          "Joe",
    "Zaffke", "christian",     "Dara",          "Andrew",
    "Andrew", "Dara",          "christian",     "Zaffke",
    "Joe",    "Sink",          "Ryan-Cranney",  "Zach",
    "Wade",   "Dallas",        "JustinJoyLife", "Humps",
    "Humps",  "JustinJoyLife", "Dallas",        "Wade",
    "Zach",   "Ryan-Cranney",  "Sink",          "Joe",
    "Zaffke", "christian",     "Dara",          "Andrew",
    "Andrew", "Dara",          "christian",     "Zaffke",
    "Joe",    "Sink",          "Ryan-Cranney",  "Zach",
    "Wade",   "Dallas",        "JustinJoyLife", "Humps",
    "Humps",  "JustinJoyLife", "Dallas",        "Wade",
    "Zach",   "Ryan-Cranney",  "Sink",          "Joe",
    "Zaffke", "christian",     "Dara",          "Andrew",
    "Andrew", "Dara",          "christian",     "Zaffke",
    "Joe",    "Sink",          "Ryan-Cranney",  "Zach",
    "Wade",   "Dallas",        "JustinJoyLife", "Humps",
    "Humps",  "JustinJoyLife", "Dallas",        "Wade",
    "Zach",   "Ryan-Cranney",  "Sink",          "Joe",
    "Zaffke", "christian",     "Dara",          "Andrew"
  ]