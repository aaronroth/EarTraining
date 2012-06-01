var chordArray = ['A', 'E', 'D'];
var decisionTime = 8;
var practiceArray = [];
var practiceCount = 1;

$(document).ready(function() {
  make_practice_array();
  practice();
  $('#check').live('click', function() {
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
    
    if (chordPlayed == answerGiven) {
      $(grades.get(i)).text('correct');
    } else {
      $(grades.get(i)).text('incorrect');
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
    $('body').append(html);
    
    var timeoutID = window.setTimeout(practice, decisionTime * 1000);
  } else {
    var html = '<div id="check">check</div>';
    
    $('body').append(html);
  }
}