

// Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// initializes the page with a default plot
function init(){

  // create the selector  
  d3.json(url).then(function(data) {
    // set the default is ID = 940 to plot into graph
    demographic_info("940");
    Barplot("940");
    Bubbleplot("940");
    Gaugeplot("940")

    // find the dropdown selector location in html
    let dropdown_selector = d3.select('#selDataset');
    // Use `.html("") to clear any existing metadata
    dropdown_selector.html("")
    // input the value from the data ["names"]
    for (let i = 0; i < data["names"].length; i++){
      // give 145 option with values
      let selector_options = dropdown_selector.append("option").property("value", data.names[i]);
      selector_options.text(`${data.names[i]}`);
    }
  });
}


function optionChanged(id){
    demographic_info(id)
    Barplot(id);
    Bubbleplot(id);
    Gaugeplot(id)}



// create the dempgraph_info summary function 
function demographic_info(id){

  // let demo_data = [];
  d3.json(url).then(function(data) {
    // create the demo_data 
    for (let i = 0; i < data["metadata"].length; i++){
      if(data["metadata"][i]["id"] == id){
        let demo_data = data["metadata"][i];
        let demo_info = d3.select('#sample-metadata');
        // Use `.html("") to clear any existing metadata
        demo_info.html("");
        // print the key and value from the demo_data
        Object.entries(demo_data).forEach(function([key, value]){
          row = demo_info.append("p");
          row.text(`${key}:${value}`);
        });
      }
    }
  });
}


// create a bar plot
function Barplot(id){
  d3.json(url).then(function(data) {
    for (let i = 0; i<data["samples"].length; i++){
      if(data["samples"][i]["id"] == id) {
        let bar_data = data["samples"][i];
        let trace1 = {
          x: bar_data["sample_values"].slice(0,10).reverse(),
          y: bar_data["otu_ids"].slice(0,10).map(i => `OTU ${i}`).reverse(),
          
          text: String(bar_data["otu_labels"].slice(0,10).reverse()),
          // name: bar_data["otu_ids"].slice(0,10).reverse(),
          type: "bar",
          orientation: "h",
          marker:{
            color: 'lightcoral',
            line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                  }
                }
        };
        let bar_trace = [trace1];
        let bar_layout = {
          margin: {
            l:100,
            r:100,
            t:100,
            b:100
          }
                };
        Plotly.newPlot('bar', bar_trace, bar_layout);
      }
    }
  });
}




// create the bubble plot
function Bubbleplot(id){
  d3.json(url).then(function(data) {
    for (let i = 0; i<data["samples"].length; i++){
      if(data["samples"][i]["id"] == id) {
        let bubble_data = data["samples"][i];
        console.log(bubble_data["otu_ids"]);
        console.log(bubble_data.otu_ids);
        let trace2 = {
          x: (bubble_data["otu_ids"]),
          y: bubble_data["sample_values"],
          text: bubble_data["otu_labels"],
          mode:"markers",
          marker:{
            color: bubble_data["otu_ids"],
            size: bubble_data["sample_values"]
          }
        };

        let bubble_trace = [trace2];
        let bubble_layout = {
          title: "",
          xaxis: {title: "OTU ID"}
          // yaxis: {title: "Sample Values"}
        };
        Plotly.newPlot('bubble', bubble_trace, bubble_layout);
      }
    }
  });
}



// create the gauge plot
function Gaugeplot(id){
  d3.json(url).then(function(data) {
    for (let i = 0; i<data["samples"].length; i++){
      if(data["samples"][i]["id"] == id) {
        let gauge_data = data["metadata"][i];

        var trace3 = [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: parseFloat(gauge_data["wfreq"]),
            title: { text: "Belly Button Washing Frequency" },
            subtitle: { text: "Scrubs per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: { axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                      bar: { color: "darkblue", thickness: 0},
                   steps: [
                    { range: [0, 1], color: "seashell"},
                    { range: [1, 2], color: "seashell"},
                    { range: [2, 3], color: "papayawhip" },
                    { range: [3, 4], color: "papayawhip" },
                    { range: [4, 5], color: "moccasin" },
                    { range: [5, 6], color: "moccasin" },
                    { range: [6, 7], color: "sandybrown" },
                    { range: [7, 8], color: "sandybrown" },
                    { range: [8, 9], color: "lightcoral" }
                  ],
                  lineWidth: 10,

  arrowWidth: 20,
  arrowColor:'#ccc',
  inset:true,
  value: 30


  }
          }
        ];

        // var theta = 93.5
        // var r = 0.7
        // var x_head = r * Math.cos(Math.PI/180*theta)
        // var y_head = r * Math.sin(Math.PI/180*theta)

        var layout = { width: 500, 
          height: 450, 
          margin: { t: 0, b: 0 }
          // xaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false},
          // yaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false},
          // showlegend: false,
          // annotations: [
          //   {
          //     // ax: 0.5,
          //     // ay: 0,
          //     // axref: 'x',
          //     // ayref: 'y',
          //     // x: parseFloat(gauge_data["wfreq"]),
          //     // y: y_head,
          //     // xref: 'x',
          //     // yref: 'y',
          //     showarrow: true,
          //     arrowhead: 4,
          //   }
          // ] 
        };
        Plotly.newPlot('gauge', trace3, layout);


      }
    }
  });
}



// Initialize the dashboard
init();


