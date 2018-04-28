function anchor(anchor) {
  var anchorType = { anchorType: anchor.anchorType, anchorText: '' };
  var rootAnchortype =  { anchorType: 'anchorTypes', anchorText: '' };
  var anchorHash = makeHash('anchor', anchor);
  var anchorGet = get(anchorHash);
  debug('<hammer>' + App.Agent.String + '->>DHT:Check to see if ' + anchor.anchorText + ' exists</hammer>');

  if(anchorGet === null) {
    var anchorType = { anchorType: anchor.anchorType, anchorText: '' };
    var rootAnchortype =  { anchorType: 'anchorTypes', anchorText: '' };
    var anchorTypeGet = get(makeHash('anchor', anchorType));
    debug('anchorTypeGet ' + JSON.stringify(anchorTypeGet));
    debug('<hammer>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorType + ' has been setup</hammer>');
    if(anchorTypeGet === null){
      var rootAnchorTypeHash = get(makeHash('anchor', rootAnchortype));
      debug('<hammer>' + App.Agent.String + '-->>DHT:Check to see if the Root of all anchors has been setup</hammer>');
      if (rootAnchorTypeHash === null){
        rootAnchorTypeHash = commit('anchor', rootAnchortype);
        debug('<hammer>' + App.Agent.String + '->>' + App.Agent.String + ':commit Root of all anchors to local chain</hammer>');
        debug('<hammer>' + App.Agent.String + '->>DHT:Publish Root of all anchors</hammer>');

      }
      debug('<hammer>DHT-->>' + App.Agent.String + ':Return the Root Anchor Type</hammer>');
      var anchorTypeHash = commit('anchor', anchorType);
      debug('<hammer>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorType + ' to local chain</hammer>');
      debug('<hammer>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorType + '</hammer>');

      commit('anchor_link', { Links:[{Base: rootAnchorTypeHash, Link: anchorTypeHash, Tag: anchorType.anchorType}]});
      debug('<hammer>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorType + ' to Root of all anchors</hammer>');

    } else {
      anchorTypeHash = makeHash('anchor', anchorType);
      debug('<hammer>DHT-->>' + App.Agent.String + ':Return the anchorType ' + anchor.anchorType + '</hammer>');
    }
    anchorHash = commit('anchor', anchor);
    debug('<hammer>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorText + ' has been setup</hammer>');
    debug('<hammer>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorText + '</hammer>');

    commit('anchor_link',  { Links:[{Base: anchorTypeHash, Link: anchorHash, Tag: anchor.anchorText}]});
    debug('<hammer>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorText + ' to ' + anchorType.anchorType + '</hammer>');
  }
  debug('<hammer>DHT-->>' + App.Agent.String + ':Return the anchor ' + anchor.anchorType + ' = ' + anchor.anchorText + '</hammer>');
  return anchorHash;
}

function exists(anchor){
  debug('<hammer>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorText + ' exists</hammer>');

  var key = get(makeHash('anchor', anchor));

  if(key !== null){
    debug('<hammer>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' exists</hammer>');
    return true;
  }
  debug('<hammer>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' does not exist</hammer>');
  return false;
}

function getAnchor(type){
  var links = getLinks(makeHash('anchor', {anchorType: type, anchorText: ''}), '');

  return links;
}

function genesis() {
  return true;
}

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
  // debug('Anchors validateModPkg')
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
