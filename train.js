import { createChart, updateChart } from "./scatterplot.js"

//
// demo data
//
// const data = [
//         { horsepower: 130, mpg: 18 },
//         { horsepower: 165, mpg: 15 },
//         { horsepower: 225, mpg: 14 },
//         { horsepower: 97, mpg: 18 },
//         { horsepower: 88, mpg: 27 },
//         { horsepower: 193, mpg: 9 },
//         { horsepower: 80, mpg: 25 },
// ]

// const chartdata = data.map(car => ({
//         x: car.horsepower,
//         y: car.mpg,
//     }))
    
//     // kijk hoe de data eruit ziet
//     console.log(chartdata)
    
    // chartjs aanmaken
//createChart(chartdata, "Horsepower", "MPG")
//////
let nn

nn = ml5.neuralNetwork({ task: 'regression', debug: true })


function loadData(){
        Papa.parse("./data/mobilephones.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => 
            {
                console.log(results.data)
                // const chartdata = results.data.map(car => ({
                //         x: car.horsepower,
                //         y: car.mpg,
                //     }))

                //     createChart(chartdata, "Horsepower", "MPG")

                
                for (let phone of results.data) {
                      
                                const trainData= {
                                        sale: phone.sale,
                                        resoloution: phone.resoloution,
                                        battery: phone.battery,
                                        cores: phone.cores,
                                        cpu: phone.cpu,
                                        frontcam: phone.frontcam,
                                        memory: phone.memory,
                                        ppi: phone.ppi,
                                        rearcam: phone.rearcam,
                                        storage: phone.storage,
                                        cores: phone.cores       
                                }
                                nn.addData(trainData, { price: phone.price })
                        
                }
                        
                 nn.normalizeData()

                // const chartdata = results.data.map(car => ({
                //         x: car.horsepower,
                //         y: car.mpg,
                //     }))
                // createChart(chartdata, "Horsepower", "MPG") 
                //trainData()
                nn.train({ epochs: 10 }, () => finishedTraining())
                //nn.save("regression")
            }
             
        })
    }
     //nn.normalizeData();
//     function trainData() {
//         // console.table(data)
//         // console.log(data)
//         nn.train({ epochs: 10 }, () => finishedTraining())
//         //nn.train({ epochs: 10 }, finishedTraining())

//     }

     async function finishedTraining(){
        
        nn.save("my_model_cars")
        //let result = await  nn.predict({horsepower:90});   
        // let predictions = []
        // for (let hp = 40; hp < 250; hp += 2) {
        //         const pred = await nn.predict({horsepower: hp})
        //         predictions.push({x: hp, y: pred[0].mpg.toFixed(2)})
        //         console.log("Horsepower: "+hp+ " MPG: "+pred[0].mpg.toFixed(2))
        // }
        // updateChart("Predictions", predictions)

        //const results = await nn.predict({ horsepower: 70 })
        //console.log(`Geschat verbruik: ${results[0].mpg.toFixed(2)}`)// 
        //console.log(results)

        //console.log(results)
        //console.log("finished")
     }

loadData()
    
