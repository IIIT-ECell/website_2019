$(() => {
	$.ajax({
	  url: '../assets/ca/leader.csv',
	  dataType: 'text',
	}).done(generaterows);
})

generaterows = (file) => {
  var allRows = file.split(/\r?\n|\r/);

  var table = '';

  for (var i = 0; i < allRows.length; i++) {

  	table += '<tr>';
  	table += '<th scope="row">' + (i+1) + '</th>'; 

    var rowCells = allRows[i].split(',');

    for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
        table += '<td>';
        table += rowCells[rowCell];
        table += '</td>';
    }

    table += '</tr>';
  } 
  
  $('#leaderboard').append(table);
}