const express = require('express');
const querystring = require('querystring');

const url = require('url');
// const {PythonShell} =require('python-shell');


// PythonShell.run('/Healthcare-Cohort-Builder-main/Healthcare-Cohort-Builder-main/', options, function (err, result){
//   if (err) throw err;
//   // result is an array consisting of messages collected
//   //during execution of script.
//   console.log('result: ', result.toString());
//   res.send(result.toString())
// });

const {spawn} = require('child_process');
 
const childPython =spawn('python',['c:\\Users\\198809\\Downloads\\Healthcare-Cohort-Builder-main\\Healthcare-Cohort-Builder-main\\healthapiv2\\HealthAPIv2.py']);

childPython.stdout.on('data',(data)=>{
  console.log(`stdout: ${data}`);
});

childPython.stderr.on('data',(data)=>{
  console.log(`stderr: ${data}`);
});

childPython.on('close',(code)=>{
  console.log(`child process exited with code ${code}`);
});
// const grid1 = require("./mockData/grid1.json");
// const grid2 = require("./mockData/grid2.json");
// const grid3 = require("./mockData/grid2.json");

// const asthma_grid_1 = require("./mockData/asthma_grid_1_Diseases.json");
// const asthma_grid_2 = require("./mockData/asthma_grid_2_ConceptIDs.json");
// const asthma_grid_3 = require("./mockData/asthma_grid_3_AsthmaPrescriptionCount.json");
// const asthma_grid_4 = require("./mockData/asthma_grid_4_NDCs.json");

// const diabetics_grid_1 = require("./mockData/diabetics_grid_1_Diseases.json");
// const diabetics_grid_2 = require("./mockData/diabetics_grid_2_ConceptIDs.json");
// const diabetics_grid_3 = require("./mockData/diabetics_grid_3_AsthmaPrescriptionCount.json");
// const diabetics_grid_4 = require("./mockData/diabetics_grid_4_NDCs.json");

const { ids } = require('webpack');

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(process.cwd()+"/my-app/dist/angular-nodejs-example/"));

// app.get("/api/drugInfo/:id", (req, res) => {
//   let parsedUrl = url.parse(req.url);
//   let parsedQs = querystring.parse(parsedUrl.query);
//   let disease = parsedQs.searchText || 'astma';
//   let gridCount = req.params.id || "1";
//   if (["asthma", "astma" ,"astmma"].includes(disease.toLowerCase())) {
//     switch (gridCount) {
//       case "1":
//         res.json(asthma_grid_1);
//         break;
//       case "2":
//         res.json(asthma_grid_2);
//         break;
//       case "3":
//         res.json(asthma_grid_3);
//         break;
//       case "4":
//         res.json(asthma_grid_4);
//         break;
//       default:
//         res.json(asthma_grid_4);
//     }
//   } else if (["diabetics", "diabetic" ,"diabeteic","diabetes type 2", "type 2 diabetes" , "diabetes","diabetestype2", "type2diabetes"].includes(disease.toLowerCase())) {
//     switch (gridCount) {
//       case "1":
//         res.json(diabetics_grid_1);
//         break;
//       case "2":
//         res.json(diabetics_grid_2);
//         break;
//       case "3":
//         res.json(diabetics_grid_3);
//         break;
//       case "4":
//         res.json(diabetics_grid_4);
//         break;
//       default:
//         res.json(diabetics_grid_1);
//     }
//   }
// });
 

// app.get('/api/drugInfo/2', (req, res) => {
//   res.json(grid2);
// });

// app.get('/api/drugInfo/3', (req, res) => {
//   res.json(grid3);
// });

// app.post('/api/user', (req, res) => {
//   const user = req.body.user;
//   users.push(user);
//   res.json("user addedd");
// });

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/my-app/src/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
