const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data) {
    console.log(data);
  });



function buildBarChart(sample) {

    d3.json(url).then((data) => {

        let sampleInfo = data.samples;

        let value = sampleInfo.filter(result => result.id == sample);

        let valueData = value[0];

        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids,otu_labels,sample_values);

        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

       

        Plotly.newPlot("bar", [trace])
    });
};


function buildBubbleChart(sample) {

    d3.json(url).then((data) => {
        
        let sampleInfo = data.samples;

        let value = sampleInfo.filter(result => result.id == sample);

        let valueData = value[0];

        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;



        console.log(otu_ids,otu_labels,sample_values);
        


        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let layout = {
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        Plotly.newPlot("bubble", [trace1], layout)
    });
};

function buildMetadata(sample) {

    d3.json(url).then((data) => {

        let metadata = data.metadata;

        let value = metadata.filter(result => result.id == sample);

        console.log(value)

        let valueData = value[0];

        d3.select("#sample-metadata").html("");

        Object.entries(valueData).forEach(([key,value]) => {

            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};


  function init() {

    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        
        
        let names = data.names;

        names.forEach((id) => {

            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        let first = names[0];

        console.log(first);

        buildMetadata(first);
        buildBarChart(first);
        buildBubbleChart(first);
        buildGaugeChart(first);

    });
};

// 
//function x (sample) {
    //d3.json(url).then((data) => { 
        //let metadata = data.metadata;



//







//gauge 
// function buildGaugeChart(sample) {
    // d3.json(url).then((data) => { 
        // let metadata = data.metadata;
        // let fillt = metadata.filter((meta) => meta.id == selectedValue);
        // let fille = fillt[0]

      //  let trace = [{

//		domain: { x: [0, 1], y: [0, 1] },
//		value: fille.wfreq,
////		title: "Weekly Belly Button Washing Frequency",
 //       type: "indicator",
//        mode: "gauge+number",
 //       gauge: {
 //           axis: {range: [null, 10]}, 
  //          bar: {color: "rgb(68,166,198)"},
 //          steps: [
   //             { range: [0, 1], color: "rgb(234, 250, 241)" },
   //            { range: [1, 2], color: "rgb(213, 245, 227 )" },
       //         { range: [2, 3], color: "rgb(171, 235, 198)" },
      //          { range: [3, 4], color: "rgb(130, 224, 170)" },
       //         { range: [4, 5], color: "rgb(88, 214, 141)" },
      //          { range: [5, 6], color: "rgb(46, 204, 113)" },
     //           { range: [6, 7], color: "rgb(40, 180, 99)" },
     //           { range: [7, 8], color: "rgb(35, 155, 86)" },
      //          { range: [8, 9], color: "rgb(29, 131, 72)" },
      //          { range: [9, 10], color: "rgb(98,180,207)" }
//
      //      ]
     //   }
	//}

//}];

//Plotly.newPlot("gauge", trace);
//});
// }//



    
//];

//var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//Plotly.newPlot('myDiv', data, layout);



   // });


        

//};


function optionChanged(value) { 

    console.log(value); 

    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
   // buildGaugeChart(value);
};





init();

