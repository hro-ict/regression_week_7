let nn;
nn = ml5.neuralNetwork({ task: 'regression', debug: true })



$.fn.serializeObject = function() {
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(Number(this.value));
       } else {
           o[this.name] = Number(this.value);
       }
   });
   return o;
};




$("form").on("submit", function(event){
   event.preventDefault();
   let jsonData= $("form").serializeObject()
   console.log(jsonData)
   // let jsonData2= JSON.parse(jsonData)
   //load model
   nn.load('./model/my_model_cars.json', modelLoaded)
   async function modelLoaded (){
      const result=  await nn.predict(jsonData)
      console.log(result[0].price)
      Swal.fire('Price: '+result[0].price.toFixed(2)+" Euro")

     }
})

// {battery: 2610,
//    cores: 2,cpu: 1.35,
//    frontcam: 3,memory: 8,ppi: 555,
//    rearcam: 5,resoloution: 5.2,sale: 10,
//    storage: 1}