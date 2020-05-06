function SaveGaz(adresses)
{
  var label = GmailApp.getUserLabelByName(label_name);  
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth()+1;
  var year = d.getFullYear();
  var folder = 'Gazette_'+year+'_'+month+'_'+day;
  
  // Create Folder
  DriveApp.createFolder(folder);
  var dir = DriveApp.getFoldersByName(folder).next();
  
  var GazTitle = '<font size="+3"><label style="color:firebrick;"><b>Gazette du '+day+'/'+month+'/'+year+'</b></label> </font><br><br><br>';
  var bodies = '';
  var list_name_ok = '';
  if(label == null)
  {
    GmailApp.createLabel('Gazette');
  }
  else
  {
    var threads = label.getThreads();
    Logger.log("SaveGaz threads size :"+threads.length);
    
    // For each thread
    for (var i = 0; i < threads.length; i++) 
    {  
      var messages = threads[i].getMessages();  
      var message = messages[messages.length-1];
      var body    = message.getBody();
      var subject = message.getSubject();
      var attachments = message.getAttachments();
      for (var j = 0; j < attachments.length; j++) 
      {
         dir.createFile(attachments[j]);
         Utilities.sleep(1000);
      }
      var sender = message.getFrom();
      var sender_name = sender.substring(0,sender.lastIndexOf("<"));
      sender_name = sender_name.replace('"','');
      sender_name = sender_name.replace('"','');
      list_name_ok += sender_name + '<br>';
      
      label.removeFromThread(threads[i]);
      bodies += '<b><label style="color:steelblue;">'+subject+'</label> </b><br>'+body+'<br><br>';
      Logger.log("SaveGaz attachments size:"+attachments.length);
    }
    
    // Gaz stats
    var GazMonthStat = (((threads.length)/(adresses.length))*100).toFixed(2)
    if (GazMonthStat< 34)
      var GazStats = '<b><label style="color:steelblue;">Taux de participation : </b></label><label style="color:#FF0000;">'+GazMonthStat+'%</label><br>';
    else if (GazMonthStat>34 && GazMonthStat<67)
      var GazStats = '<b><label style="color:steelblue;">Taux de participation : </b></label><label style="color:#FFA500;">'+GazMonthStat+'%</label><br>';
    else if (GazMonthStat>67 && GazMonthStat<100)
      var GazStats = '<b><label style="color:steelblue;">Taux de participation : </b></label><label style="color:#FFFF00;">'+GazMonthStat+'%</label><br>';
    else
      var GazStats = '<b><label style="color:steelblue;">Taux de participation : </b></label><label style="color:#008000;">'+GazMonthStat+'%</label><br>';
    Logger.log("SaveGaz GazStats : "+threads.length + '/' + adresses.length);
    Logger.log("SaveGaz GazStats (%) : "+GazMonthStat);
      
    // Contributor name list
    Logger.log("list_name_ok:"+list_name_ok);
    var GazNameList = '<br><b><label style="color:steelblue;">Contributeurs : <br></b></label><i>'+list_name_ok+'</i><br><br><br>'
    Logger.log("SaveGaz GazNameList:"+GazNameList);
    
    // Create an HTML File from the Message Body
    var bodydochtml = dir.createFile('Gazette_'+year+'_'+month+'_'+day+'.html', GazTitle+GazStats+GazNameList+bodies, "text/html");
    var bodyId=bodydochtml.getId();
    
    // Convert the HTML to PDF
    var bodydocpdf = bodydochtml.getAs('application/pdf');
    
    dir.createFile(bodydocpdf);
    
     // Delete html file
    DriveApp.getFileById(bodyId).setTrashed(true);
    
  }  
}
