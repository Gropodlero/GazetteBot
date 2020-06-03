var version = "2.0"
var author = 'arnaud.davout@gmail.com'
var github = "https://github.com/Gropodlero/GazetteBot"
var changelog = "https://github.com/Gropodlero/GazetteBot/blob/master/CHANGELOG.md"
var reply_to = 'do-not-reply@gazettebot.com'
var label_name = "Gazette"
var signature = '<br><br><br>---<br>GazetteBot v' + version + ' | <a href=' + changelog + '>Changelog</a> | <a href=' + github + '>GitHub</a> | <a href=mailto:' + author + '>Contact</a>';

function JiMoins(day) 
{
  var subject = 'Rappel Gazette : J-'+day;
  var body = "Ceci est un mail automatique vous rappelant qu'il vous reste " + day + " jours pour écrire votre gazette !<br><br><b>Note:</b> vous n'auriez pas reçu ce mail si vous aviez envoyé votre gazette !";
  body += signature
  var adresses = getAdresses(gaz_sheet_id);
  SendRappel(adresses, subject, body);
}

function getAdresses(ss_id)
{
    var ss = SpreadsheetApp.openById(ss_id);
    var sheet = ss.getActiveSheet();
    var range = sheet.getDataRange(); 
    Logger.log('getAdresses data : '+range.getValues());
    return range.getValues();
}

function SendRappel(adresses, subject, body) 
{
  var label = GmailApp.getUserLabelByName(label_name);
  var threads = label.getThreads();  
  Logger.log('SendRappel subject : '+subject+'\n'+body);
  
  // For each thread
  var adresseOK = [];
  for (var i = 0; i < threads.length; i++) 
  {  
      var messages = threads[i].getMessages();  
      var message = messages[messages.length-1];
      var sender = message.getFrom();
      var sender_nor = sender.substring(sender.lastIndexOf("<")+1,sender.lastIndexOf(">"));

      adresseOK.push(sender_nor);
   }
   for(var i = 0;i<adresses.length;i++)
   {
     if (adresseOK.indexOf(adresses[i].toString()) == -1)
     {
        // GmailApp.sendEmail(adresses[i], subject, "",{htmlBody:body, replyTo:reply_to});
        Logger.log('SendRappel to '+ adresses[i] + ' index ' + i);
     }
   }
}
