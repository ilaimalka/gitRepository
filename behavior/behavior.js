var serverAddress = "http://draganddrop.hostoi.com/";

var queriesScroll;
var acViewerId = 0;
var betAppendix;
var homasAppendix;

$(document).ready(
		function()
		{
			queriesScroll = new IScroll('#Queries', { mouseWheel: true, click: true, zoom:true });
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			document.getElementById("bokeh").style.visibility="hidden";
			
			$("#btnGetResults").on('touchstart', function(e) {
				e.stopPropagation();
				});
		}
);

function scroll_to_top()
{
	queriesScroll.scrollToElement(".cbp-mc-form");
}

function scroll_to_table()
{
	queriesScroll.scrollToElement("#btnBetAppendix");
}

function scroll_to_document()
{
	queriesScroll.scrollToElement("#ac-viewer");
}

function clean_form()
{
	event.preventDefault();
	document.getElementById("bokeh").style.visibility="visible";
	document.getElementById("business_name").value = "";
	document.getElementById("classification").value = "";
	document.getElementById("street_name").value = "";
	document.getElementById("street_num").value = "";
	document.getElementById("bokeh").style.visibility="hidden";
}

function get_results()
{
	event.preventDefault();
	document.getElementById("bokeh").style.visibility="visible";
	var business_name = document.getElementById("business_name").value? document.getElementById("business_name").value : undefined;
	var classification = document.getElementById("classification").value? document.getElementById("classification").value : undefined;
	var street_name = document.getElementById("street_name").value? document.getElementById("street_name").value : undefined;
	var street_num = document.getElementById("street_num").value? document.getElementById("street_num").value : undefined;
	
	var sendInfo = {"business_name":business_name, "classification":classification, "street_name":street_name, "street_num":street_num};
	$.ajax({
		url: serverAddress+"php/FireArea.php",
		type: "GET",
		dataType: 'jsonp',
		jsonpCallback: "Callback",
		data: sendInfo,
		success: function( results ) 
		{
			var acViewer = document.getElementById("ac-viewer");
			acViewer.innerHTML = "";
			
			acViewerId = 0;
			
			var table = document.getElementById("fire_area_tbody");
			if(results)
			{
				if(results.status == 1)
				{
					var tbody = "";
					for(var i = 0; i < results.rows.length; i++)
					{
						tbody += "<tr id='tr"+results.rows[i].id+"'>";
						tbody += "<td style='visibility:hidden'>"+results.rows[i].id+"</td>";
						tbody += "<td style='visibility:hidden'>"+results.rows[i].bet_appendix+"</td>";
						tbody += "<td style='visibility:hidden'>"+results.rows[i].homas_appendix+"</td>";
						tbody += "<td>"+results.rows[i].business_name+"</td>";
						tbody += "<td>"+results.rows[i].classification+"</td>";
						tbody += "<td>"+results.rows[i].street_name + " " + results.rows[i].street_num+"</td>";
						tbody += "</tr>";
					}
					table.innerHTML = tbody;
					
					$(table).children().each(function(){
						var trid = this.id;
						$(this).click(function(){selectRecord(trid);});
					});
				}
				else
				{
					var tbody = "<tr>";
					tbody += "<td style='visibility:hidden'></td>";
					tbody += "<td style='visibility:hidden'></td>";
					tbody += "<td style='visibility:hidden'></td>";
					tbody += "<td colspan='3'>לא נמצאו תוצאות</td>";
					tbody += "</tr>";
					table.innerHTML = tbody;
			
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
			queriesScroll = new IScroll('#Queries', { mouseWheel: true, click: true, zoom:true });
			queriesScroll.scrollToElement(table);
		},
		error: function()
		{
			document.getElementById("bokeh").style.visibility="hidden";
			queriesScroll = new IScroll('#Queries', { mouseWheel: true, click: true, zoom:true });
			alert("הפעלה לא הצליחה. נא נסה שוב");
		}
	})

}

function load_doc(type)
{
	event.preventDefault();
	document.getElementById("bokeh").style.visibility="visible";
	var acViewer = document.getElementById("ac-viewer");
	if(acViewerId != 0)
	{
		if(type == 'homasAppendix')
			acViewer.innerHTML = "<iframe src = '"+mContext.getFilesDir()+"ViewerJS/#../docs/homas/"+homasAppendix+".odt' width='300' height='500'></iframe>";
		else
			acViewer.innerHTML = "<iframe src = '"+mContext.getFilesDir()+"ViewerJS/#../docs/bet/"+betAppendix+".odt' width='300' height='500'></iframe>";	
	}
	else
	{
		acViewer.innerHTML = "<label style='color:red'>יש לבחור שורה מהטבלה</label>";
	}
	queriesScroll = new IScroll('#Queries', { mouseWheel: true, click: true, zoom:true });
	queriesScroll.scrollToElement(acViewer);
	document.getElementById("bokeh").style.visibility="hidden";
}

function selectRecord(trid)
{
	acViewerId = $("#"+trid).children()[0].innerHTML;
	betAppendix = $("#"+trid).children()[1].innerHTML;
	homasAppendix = $("#"+trid).children()[2].innerHTML;
}














