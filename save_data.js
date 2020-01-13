/*
 * Copyright (c) 2019.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */




let old_data = JSON.stringify(jsondata, null,2);
while (true){
    if (old_data !== JSON.stringify(jsondata, null,2)){
        console.log("new");
    }
    //Sleep(5000);
    //fs.writeFileSync("./data.json", JSON.stringify(jsondata, null,2));

}