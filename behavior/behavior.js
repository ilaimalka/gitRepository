var serverAddress = "http://draganddrop.hostoi.com/";

var menuScroll;
var queriesScroll;
var docsScroll;

$(document).ready(
		function()
		{
			queriesScroll = new IScroll('#Queries', { mouseWheel: true, click: true });
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			document.getElementById("Menu").style.display = "none";
			document.getElementById("Queries").style.display = "block";
			document.getElementById("Docs").style.display = "none";
			document.getElementById("bokeh").style.visibility="hidden";
		}
);

function scroll_to_top()
{
	if(document.getElementById("Queries").style.display == "block")
	{
		queriesScroll.scrollToElement(".cbp-mc-form");
	}
	else if (document.getElementById("Docs").style.display == "block")
	{
		docsScroll.scrollToElement(".ac-container");
	}
}

function toggle_menu()
{
	event.preventDefault();
	document.getElementById("bokeh").style.visibility="visible";
	document.getElementById("Menu").style.display = "block";
	document.getElementById("Queries").style.display = "none";
	document.getElementById("Docs").style.display = "none";
	menuScroll = new IScroll('#Menu', { mouseWheel: true, click: true });
	document.getElementById("bokeh").style.visibility="hidden";
}

function showQueris()
{
	event.preventDefault();
	document.getElementById("bokeh").style.visibility="visible";
	document.getElementById("Menu").style.display = "none";
	document.getElementById("Queries").style.display = "block";
	document.getElementById("Docs").style.display = "none";
	queriesScroll = new IScroll('#Queries', { mouseWheel: true, click: true });
	document.getElementById("bokeh").style.visibility="hidden";
}

function showDocs()
{
	event.preventDefault();
	document.getElementById("bokeh").style.visibility="visible";
	document.getElementById("Menu").style.display = "none";
	document.getElementById("Queries").style.display = "none";
	document.getElementById("Docs").style.display = "block";
	docsScroll = new IScroll('#Docs', { mouseWheel: true, click: true });
	document.getElementById("bokeh").style.visibility="hidden";
}


function clean_form()
{
	event.preventDefault();
	document.getElementById("bokeh").style.visibility="visible";
	document.getElementById("business_name").value = "";
	document.getElementById("classification").value = 1;
	document.getElementById("street_name").value = "";
	document.getElementById("street_num").value = "";
	document.getElementById("bokeh").style.visibility="hidden";
}

function clearTable()
{
	event.preventDefault();
 var table = document.getElementById('fire_area_table');
 while ( table.rows.length > 1 )
 {
	 table.deleteRow(1);
 }
}

function get_results()
{
	event.preventDefault();
	document.getElementById("bokeh").style.visibility="visible";
	var business_name = document.getElementById("business_name").value? document.getElementById("business_name").value : undefined;
	var classification;
	switch(parseInt(document.getElementById("classification").value))
	{
	case 1:
		classification = undefined;
	  break;
	case 2:
		classification = "אולמות / גני אירועים";
	  break;
	case 3:
		classification = "בתי אבות";
	  break;
	case 4:
		classification = "מגורים";
	  break;
	case 5:
		classification = "מוסדות חינוך";
	  break;
	case 6:
		classification = "מסחר";
	  break;
	case 7:
		classification = "ציבורי";
	  break;
	case 8:
		classification = "קניונים";
	  break;
	case 9:
		classification = "תעשייה";
	  break;
	default:
		classification = undefined;
	}

	var street_name = document.getElementById("street_name").value? document.getElementById("street_name").value : undefined;
	var street_num = document.getElementById("street_num").value? document.getElementById("street_num").value : undefined;
	
	var sendInfo = {"business_name":business_name, "classification":classification, "street_name":street_name, "street_num":street_num};
	$.ajax({
		url: serverAddress+"php/FireArea.php",
		type: "GET",
		dataType: 'jsonp',
		jsonpCallback: "Callback",
		data: sendInfo
	}).done(function( results ) 
			{
				var table = document.getElementById("fire_area_tbody");
				clearTable();
				if(results)
				{
					if(results.status == 1)
					{
						for(var i = 0; i < results.rows.length; i++)
						{
							 var row = table.insertRow(table.rows.length);
							  var cell1 = row.insertCell();
							  cell1.innerHTML = results.rows[i].street_name + " " + results.rows[i].street_num;
							  var cell2 = row.insertCell();
							  cell2.innerHTML = results.rows[i].classification;
							  var cell3 = row.insertCell();
							  cell3.innerHTML = results.rows[i].business_name;

						}
					}
					else
					{
						var row = table.insertRow(table.rows.length);
						var cell1 = row.insertCell();
						cell1.innerHTML = "לא נמצאו תוצאות";
						cell1.colSpan = 3;
					}
				}
				else
				{
					var row = table.insertRow(1);
					var cell1 = row.insertCell();
					cell1.innerHTML = "לא נמצאו תוצאות";
					cell1.colSpan = 4;
				}
				document.getElementById("bokeh").style.visibility="hidden";
				queriesScroll = new IScroll('#Queries', { mouseWheel: true, click: true });
				queriesScroll.scrollToElement(table);
			});

}

function load_doc(doc)
{
	document.getElementById("bokeh").style.visibility="visible";
	var acViewer = document.getElementById("ac-viewer");
	acViewer.innerHTML = "<iframe src = '"+serverAddress+"ViewerJS/#../docs/"+doc+"' width='300' height='500'></iframe>";
	docsScroll = new IScroll('#Docs', { mouseWheel: true, click: true });
	docsScroll.scrollToElement(acViewer);
	document.getElementById("bokeh").style.visibility="hidden";
}














