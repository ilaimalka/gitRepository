var serverAddress = "http://draganddrop.hostoi.com/";

$(document).ready(
		function()
		{
			document.getElementById("Queries").style.display = "block";
			document.getElementById("Docs").style.display = "none";
			document.getElementById("bokeh").style.visibility="hidden";
		}
);

function showQueris()
{
	event.preventDefault();
	document.getElementById("Queries").style.display = "block";
	document.getElementById("Docs").style.display = "none";
	$( '#showLeft' ).removeClass('active');
	$( '#cbp-spmenu-s1' ).removeClass('cbp-spmenu-open');
}

function showDocs()
{
	event.preventDefault();
	document.getElementById("Docs").style.display = "block";
	document.getElementById("Queries").style.display = "none";
	$( '#showLeft' ).removeClass('active');
	$( '#cbp-spmenu-s1' ).removeClass('cbp-spmenu-open');
}

function toggle_menu()
{
	$( '#showLeft' ).toggleClass('active');
	$( '#cbp-spmenu-s1' ).toggleClass('cbp-spmenu-open');
}

function scroll_to_top()
{
	$('html, body').animate({ scrollTop: 0 }, 'fast');
	
	$('input[type="radio"]').each(function(){this.checked = false;});
}

function clean_form()
{
	event.preventDefault();
	document.getElementById("business_name").value = "";
	document.getElementById("classification").value = 1;
	document.getElementById("street_name").value = "";
	document.getElementById("street_num").value = "";
}

function clearTable()
{
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
			});

}

function load_doc(viewr, doc)
{
	document.getElementById(viewr).src = serverAddress+"ViewerJS/#../docs/"+doc;
}














