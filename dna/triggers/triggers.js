function genesis() {
  test();
  return true;
}

//Input : event{eventName:"",data:"",time:""}
function trigger(event) {

}

function test() {
  d = '2018-04-28T15:14:00';
  date = new Date();
  var eta = date.getTime() - Date.now();
  debug('Timese t:' + eta);

  //myVar = setTimeout(function () {debug("It's time!");}, eta);
  setInterval(function () {debug("It's time!");}, 2000);
}

function isErr(result) {
  return ((typeof result === 'object') && result.name == 'HolochainError');
}

// ===============================================================================
//   VALIDATION functions
// ===============================================================================

function validatePut(entry_type,entry,header,pkg,sources) {
  // debug('Anchors validatePut:' + sources)
  return validateCommit(entry_type,entry,header,pkg,sources);
}

function validateCommit(entry_type,entry,header,pkg,sources) {
  // debug('Anchors validatePut:' + sources)
  if (entry_type == 'anchor') {
    return true;
  }
  if (entry_type == 'anchor_link') {
    return true;
  }
  return false;
}

function validateLink(linkingEntryType,baseHash,linkHash,pkg,sources){
  // debug('Anchors validateLink:' + sources)
  return true;
}

function validateMod(entry_type,hash,newHash,pkg,sources){
  // debug('Anchors validateMod:' + sources)
  return true;
}

function validateDel(entry_type,hash,pkg,sources) {
  // debug('Anchors validateDel:' + sources)
  return true;
}

function validatePutPkg(entry_type) {
  // debug('Anchors validatePutPkg')
  return null;
}

function validateModPkg(entry_type) {
  debug('validate mod: ' + entry_type + ' header:' + JSON.stringify(header) + ' replaces:' + JSON.stringify(replaces));
  return null;
}

function validateDelPkg(entry_type) {
  // debug('Anchors validateDelPkg')
  return null;
}

function validateLinkPkg(entry_type) {
  // debug('Anchors validateLinkPkg')
  return null;
}
