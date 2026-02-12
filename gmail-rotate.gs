var senders = [
  'some@email.com'
  ];

var keepDays = 30;
var searchMaxTreads = 100;
var sendersDict = {};


var notificationBody = '';

function main() {
  beginTime = +new Date();
  notificationBody+= 'Script started: ' + new Date().toJSON().slice(0,19) + '\n\n';
  //var filter = combineFilter();
  //notificationBody+= 'Search filter: ' + filter + '\n\n';
  //cleanMessages('label:inbox older_than:1m', GmailApp.getUserLabelByName('@Next'));
  cleanMessages('label:some-label older_than:1m', GmailApp.getUserLabelByName('Some/Label'));
  
  //printSortedSenders(sendersDict);
  notificationBody+= '\nScript ended: ' + new Date().toJSON().slice(0,19) + '\n';
  endTime = +new Date();
  runningTime = endTime - beginTime;
  notificationBody+= 'Script was rinning for : ' + runningTime + ' ms';
  //MailApp.sendEmail(Session.getEffectiveUser().getEmail(),'Script run status',notificationBody);
}

function combineFilter() {
  var filter = '';
  senders.forEach(function(sender) {
    filter += 'OR from:' + sender + ' ';
  });
  filter+= 'older_than:' + keepDays + 'd';
  return filter;
}

function printSortedSenders(senders) {
  var sendersArray = [];
  for (var key in senders) {
    sendersArray.push({'sender':key,'count':sendersDict[key]});
  }
  sendersArray.sort(function(a, b) {
    return b.count - a.count;
  })
  //Logger.log(sendersArray);
  sendersArray.forEach(function(n) {
    Logger.log(n.sender + ': ' + n.count);
});
}

function cleanMessages(filter, label) {
  var cleanedSendersDict = {};
  var cleanedSendersArray = [];
  var threads = findThreads(filter);

  for (var x in threads) {
   var thread = threads[x];
   thread.removeLabel(label);
   //Logger.log(label.getName());
   //Logger.log(thread.getLabels()[0].getName());
 }
  
  /*var messages = getMessagesForFilteredThread(filter, threads);
  var messagesToRemovePacks = [];
  messagesToRemovePacks.push([]);
  var i = 0;
  
  notificationBody += 'Total messages found for ' + searchMaxTreads + ' threads: ' + messages.length + '\n\n';
  
  messages.forEach(function(message) {
    var re = /^(.*<)?(.*@.+\.\w+)(>.*)?$/;
    var sender = message.getFrom();
    var match = re.exec(sender);
    var senderEmail = match[2];
    if (senders.indexOf(senderEmail) != -1 && messagesToRemovePacks.length <= 2) {
      if (!cleanedSendersDict.hasOwnProperty(senderEmail)) {
        cleanedSendersDict[senderEmail] = 1;
      } else {
        cleanedSendersDict[senderEmail]++;
      }
      messagesToRemovePacks[i].push(message);
      //message.moveToTrash();
    }
    if (messagesToRemovePacks[i].length == 100) {
      messagesToRemovePacks.push([]);
      i++
    }
  });

  for (var key in cleanedSendersDict) {
    cleanedSendersArray.push({'sender':key,'count':cleanedSendersDict[key]});
  }
  cleanedSendersArray.sort(function(a, b) {
    return b.count - a.count;
  })
  
  notificationBody += 'Cleaned senders:\n';
  cleanedSendersArray.forEach(function(n) {
    notificationBody += n.sender + ': ' + n.count + ' times\n';
  });
  //messagesToRemovePacks.forEach(function(messagesToRemovePack) {
  //GmailApp.moveMessagesToTrash(messagesToRemovePacks[0]);
  //GmailApp.moveMessagesToTrash(messagesToRemovePacks[1]);
  //GmailApp.moveThreadsToArchive(threads);
  //});
  */
}

function getMessagesForFilteredThread(filter, threads) {
  //var messages = [1];
  var messagesArray = GmailApp.getMessagesForThreads(threads);
  var messages = [].concat.apply([], messagesArray);
  //for (var i = 0, messagesArrayLength = messagesArray.length; i < messagesArrayLength; i++) {
    //messages.concat([1]);
    //Logger.log(messages.length);
    //Logger.log(messagesArray[i].length);
    //for (j = 0, messagesLength = messages.length; j < messagesLength; j++) {
      //var sender = messages[j].getFrom();
      //if (!sendersDict.hasOwnProperty(sender)) {
        //sendersDict[sender] = 1;
      //} else {
        //sendersDict[sender]++;
      //}
      //Logger.log(sender);
    //}
  //}
  return messages;
}

function findThreads(filter, start) {
  start = typeof start !== 'undefined' ? start : 0;
  var threads = GmailApp.search(filter, start, searchMaxTreads);
  //Logger.log(threads);
  //if (threads.length == searchMaxTreads) {
  //  threads.concat(findThreads(filter, start + searchMaxTreads));
  //}
  return threads;
}
