function SendGaz(adresses) 
{
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth()+1;
  var year = d.getFullYear();
  var subject = 'Gazette du '+day+'/'+month+'/'+year;
  var folder = 'Gazette_'+year+'_'+month+'_'+day;
  var dir = DriveApp.getFoldersByName(folder).next();

  // Fill email body.
  var body = 'Voici la gazette du '+day+'/'+month+'/'+year;
  body += signature
  
  // Get attachments
  var files = dir.getFiles();
  var i=0;
  var file = new Array();
  while (files.hasNext()) 
  {
    file[i] = files.next();
    i++;
  }
  Logger.log("taille de files :"+file.length);

  // Send Email
  if(file.length>0) 
  {
    for(var i = 0;i<adresses.length;i++)
    {
      GmailApp.sendEmail(adresses[i], subject, "",{attachments: file, htmlBody:body, replyTo:reply_to});
    }
  }
  else
  {
    Logger.log("Pas de fichier présent dans le dossier");
  }
}
