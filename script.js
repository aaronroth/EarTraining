var chordArray = ['A', 'E', 'D'];
var decisionTime = 1;
var practiceArray = [];
var practiceCount = 1;

$(document).ready(function() {
  make_practice_array();
  practice();
  $('#check-button').live('click', function() {
    check_answer();
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
function check_answer() {
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
    } else if (answerGiven == '') {
      $(grades.get(i)).text('incomplete');
      $(grades.get(i)).css('color', '#fe2020');
      $(grades.get(i)).css('font-weight', 'bold');
    } else {
      $(grades.get(i)).text('incorrect');
      $(grades.get(i)).css('color', '#fe2020');
      $(grades.get(i)).css('font-weight', 'bold');
    }
  }
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
    var sourceURL = 'http://findaaron.nfshost.com/EarTraining/chords/' + 
                     chord + '.mp3';
    
    var html = '<div class="container">' +
                  '<audio autoplay="autoplay" controls="controls"' +
                         'src="' + sourceURL +'"></audio>' +
                  '<input class="answers" type="text" />' +
                  '<div class="grades"></div>' +
               '</div>';  
    $('#main-container').append(html);
    
    var timeoutID = window.setTimeout(practice, decisionTime * 1000);
  } else {
    var html = '<div id="check-button">check</div>';
    
    $('#main-container').append(html);
  }
}