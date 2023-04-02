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
        Papa.parse("./data/cars2.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => 
            {
                
                results.data.forEach(item => {
                        const inputs = {
                        horsepower: item.horsepower
                        };
                        const output = {
                        mpg: item.mpg
                        };
                        console.log("Horsepower: ",item.horsepower)
                //        console.log(item.mpg)
                        nn.addData(inputs, output);
                       
                      });
                // const chartdata = results.data.map(car => ({
                //         x: car.horsepower,
                //         y: car.mpg,
                //     }))
                // createChart(chartdata, "Horsepower", "MPG") 
                nn.normalizeData()
                trainData()
            }
             
        })
    }
//     nn.normalizeData();
    function trainData(data) {
        // console.table(data)
        // console.log(data)
        nn.train({ epochs: 10 }, () => finishedTraining())

    }

     async function finishedTraining(){
         let result = await nn.predict({horsepower:90});                // 
         
        console.log(result)
        console.log("finished")
     }

loadData()
    
