var gaz_sheet_id = ''; // Enter adresses spreadsheet id here

function JiMoinsQuatre() 
{
  JiMoins(4);
}

function JiMoinsTrois() 
{ 
  JiMoins(3);
}

function JiMoinsDeux() 
{
  JiMoins(2);
}

function JiMoinsUn() 
{ 
  JiMoins(1);
}

function JiMoinsZero() 
{
  JiMoins(0);
}

function SendGazFromAdresseList() 
{
  var adresses = getAdresses(gaz_sheet_id);
  SendGaz(adresses)
}

function SaveGazAsPDF() 
{
  var adresses = getAdresses(gaz_sheet_id);
  SaveGaz(adresses)
}
