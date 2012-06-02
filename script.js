var appendCount = 0;
var chordArray = [];
var decisionTime = 0;
var inputCordArray = ['A', 'D', 'E'];
var practiceArray = [];
var practiceCount = 0;

$(document).ready(function() {
  // Appends checkboxes.
  for (var i = 0; i < inputCordArray.length; i++) {
    $('#chords').append(
      '<label><span class="checkbox">' +
        '<input class="checkbox-input"' +
               'type="checkbox"' +
               'value="' + inputCordArray[i] + '" />' +
        '<span class="chord-type">' + inputCordArray[i] + '</span>' +
      '</span></label>');
  }
  
  $('.checkbox').live('mouseover', function() {
    $(this).css('background', '#dddddd');
  });
  
  $('.checkbox').live('mouseout', function() {
    $(this).css('background', '#ffffff');
  });
  
  $('#start-button').click(function() {
    var anyChecked = 0;
    var checkboxes = $('.checkbox-input');
    
    for (var i = 0; i < checkboxes.length; i++) {
      if ($(checkboxes.get(i)).attr('checked')) {
        anyChecked++;
      }
    }
    
    if (anyChecked > 0) {
      get_values();

      $('#main-container').empty();
      $('#main-container').css('padding','0px');
      $('#main-container').css('width','464px');

      make_practice_array();
      practice();
    } else {
      alert('Check some chords to practice!');
    }
  });
  
  $('#check-button').live('click', function() {
    check_answers();
  });
  
  $('#reset-button').live('click', function() {
    window.location.reload();
  });
});

// Adds shuffling functionality to arrays.
Array.prototype.shuffle = function() {
  for (var random, temp, i = this.length; i;
       random = parseInt(Math.random() * i),
       temp = this[--i],
       this[i] = this[random],
       this[random] = temp);
};

// Checks answer.
function check_answers() {
  var containers = $('.container');
  var answers = $('.answers');
  var grades = $('.grades');
  
  for (var i = 0; i < containers.length; i++) {
    var source = $(containers.get(i)).children().first().attr('src');  
    var chordPlayed = source.split('/').pop().split('.')[0];
    var answerGiven = $(answers.get(i)).val();
    
    if (chordPlayed == answerGiven ||
        chordPlayed.toLowerCase() == answerGiven) {
      $(grades.get(i)).text('correct');
      $(grades.get(i)).css('color', '#3fb126');
      $(grades.get(i)).css('font-weight', 'normal');
      $(grades.get(i)).css('font-style', 'normal');
    } else if (answerGiven == '') {
      $(grades.get(i)).text('incomplete');
      $(grades.get(i)).css('color', '#fe2020');
      $(grades.get(i)).css('font-weight', 'bold');
      $(grades.get(i)).css('font-style', 'normal');
    } else {
      $(grades.get(i)).text('incorrect');
      $(grades.get(i)).css('color', '#fe2020');
      $(grades.get(i)).css('font-weight', 'bold');
      $(grades.get(i)).css('font-style', 'normal');
    }
  }
}

// Retrieves values for practice session.
function get_values() {
  var checkboxes = $('.checkbox-input');
  
  // Gets chords to practice.
  for (var i = 0; i < checkboxes.length; i++) {
    if ($(checkboxes.get(i)).attr('checked')) {
      chordArray.push($(checkboxes.get(i)).val());
    }
  }
  
  practiceCount = $('#repetitions-input').val();
  decisionTime = $('#duration-input').val();
}

// Makes a chord practice sequence in an array.
function make_practice_array() {
  var loopLen = practiceCount;
  
  while (loopLen > 0) {
    for (var i = 0; i < chordArray.length; i++) {
      practiceArray.push(chordArray[i])
    }
    
    loopLen--;
  }
  
  practiceArray.shuffle();
}

// Main loop of practice session.
function practice() {
  if (practiceArray.length > 0) {
    var chord = practiceArray.pop();
    var sourceURL = 'http://findaaron.nfshost.com/EarTraining/' + 
                     chord + '.mp3';
    
    var html = '<div class="container">' +
                  '<audio autoplay="autoplay" controls="controls"' +
                         'src="' + sourceURL +'"></audio>' +
                  '<input class="answers" type="text" />' +
                  '<div class="grades">answer</div>' +
               '</div>';  
    $('#main-container').append(html);
    appendCount++;
    
    if (appendCount == 1) {
      var answers = $('.answers');
      $(answers.get(0)).focus();
    }
    
    var timeoutID = window.setTimeout(practice, decisionTime * 1000);
  } else {
    var resetButton = '<div id="reset-button">reset</div>';
    var checkButton = '<div id="check-button">check</div>';
    
    $('#main-container').append(resetButton);
    $('#main-container').append(checkButton);
  }
}