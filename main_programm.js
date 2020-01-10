/*
 * Copyright (c) 2019.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */

const pm2 = require('pm2');

let exec = require('child_process').exec;

const proc_name = "CBA";

pm2.connect(function(err) {
  
  try {
    pm2.stop(proc_name, function(err) {});
  } catch (e) {
    
  }
  
  pm2.start({
    script    : 'bot.js',         // Script to be run
    name: proc_name,
    /*exec_mode : 'cluster',        // Allows your app to be clustered*/
    /*instances : 4,                // Optional: Scales your app by 4*/
    watch: true,
    ignore_watch : ["pm2.log", 'export/']
    /*max_memory_restart : '100M'   // Optional: Restarts your app if it reaches 100Mo*/
  }, function(err, apps) {
    pm2.disconnect();   // Disconnects from PM2
    if (err) throw err
  });
  exec(`pm2 logs ${proc_name} --json >> pm2.log`);
});