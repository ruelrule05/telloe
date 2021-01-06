var token;
var socket;
var ice;
var pcs = {};
var localUsername;
function displayMessage(message) {
	$('#messages')[0].innerHTML += message + '<br>';
}

function openSocket(r) {
	var host = JSON.parse(r).v;
	socket = new WebSocket(host + '/v2/' + token);
	socket.addEventListener('message', onSocketMessage);
}
function onSocketMessage(evt) {
	var data = JSON.parse(evt.data);
	var option;
	var pc;
	var selectElement = $('#usersSelect')[0];
	switch (data.m.o) {
		case 'peers':
			var users = data.p.users;
			for (i = 0; i < users.length; i++) {
				displayMessage('user in chat:' + users[i]);
			}
			break;
		case 'peer_connected':
			var f = data.m.f.split('/');
			var joining = f[f.length - 1];
			displayMessage('new user joined: ' + joining);
			callPeer(joining);
			break;
		case 'message':
			switch (data.p.msg.type) {
				case 'offer':
					var desc = new RTCSessionDescription(data.p.msg);
					var f = data.m.f.split('/');
					var sender = f[f.length - 1];
					pc = createNewPeerConnection(sender);
					pc.setRemoteDescription(desc);
					pc.createAnswer().then(d => onCreateAnswer(d, sender));
					break;
				case 'answer':
					var desc = new RTCSessionDescription(data.p.msg);
					var f = data.m.f.split('/');
					var sender = f[f.length - 1];
					pcs[sender].pc.setRemoteDescription(desc);
					break;
				case 'candidate':
					var f = data.m.f.split('/');
					var sender = f[f.length - 1];
					var candidate = new RTCIceCandidate(data.p.msg);
					pcs[sender].pc.addIceCandidate(candidate);
			}
	}
}
function callPeer(peer) {
	var pc = createNewPeerConnection(peer);
	var dataChannel = pc.createDataChannel('data');
	pcs[peer].dc = dataChannel;
	setDataChannelHandlers(dataChannel);
	pc.createOffer().then(d => onCreateOffer(d, peer));
}
function onCreateOffer(d, peer) {
	pcs[peer].pc.setLocalDescription(d);
	var pkt = { t: 'u', m: { f: 'SampleAppChannel/' + localUsername, o: 'message', t: peer }, p: { msg: d } };
	socket.send(JSON.stringify(pkt));
}
function onCreateAnswer(d, peer) {
	pcs[peer].pc.setLocalDescription(d);
	var pkt = { t: 'u', m: { f: 'SampleAppChannel/' + localUsername, o: 'message', t: peer }, p: { msg: d } };
	socket.send(JSON.stringify(pkt));
}
function onIceCandidate(evt) {
	var remoteUsername = getUsernameByRemoteDescription(evt.target.remoteDescription.sdp);
	var candidate = evt.candidate;
	if (candidate != null && remoteUsername != null) {
		var cPkt = { type: 'candidate', sdpMLineIndex: candidate.sdpMLineIndex, sdpMid: candidate.sdpMid, candidate: candidate.candidate };
		var pkt = {
			t: 'u',
			m: {
				f: 'SampleAppChannel/' + localUsername,
				o: 'message',
				t: remoteUsername
			},
			p: { msg: cPkt }
		};
		socket.send(JSON.stringify(pkt));
	}
}
function setDataChannelHandlers(dc) {
	dc.onmessage = evt => onDataMessage(evt);
	dc.onopen = evt => onDataChannelOpen(evt);
}
function onDataChannelOpen(evt) {
	$('#newMessage')[0].disabled = false;
	$('#sendButton')[0].disabled = false;
}

function onDataChannel(evt) {
	var dataChannel = evt.channel;
	var keys = Object.keys(pcs);
	var comp;
	var localDescription;
	var remoteDescription;
	for (var i = 0; i < keys.length; i++) {
		comp = pcs[keys[i]];
		if (evt.currentTarget.localDescription.sdp == comp.pc.localDescription.sdp) {
			comp.dc = dataChannel;
		}
	}
	setDataChannelHandlers(dataChannel);
}
function send() {
	var messageElement = $('#newMessage')[0];
	displayMessage('you said: ' + messageElement.value);
	var message = { f: localUsername, msg: messageElement.value };
	messageElement.value = '';
	var dataChannel;
	var keys = Object.keys(pcs);
	var comp;
	for (var i = 0; i < keys.length; i++) {
		comp = pcs[keys[i]];
		dataChannel = comp.dc;
		dataChannel.send(JSON.stringify(message));
	}
}
function onDataMessage(evt) {
	var messageObj = JSON.parse(evt.data);
	displayMessage(messageObj.f + ' said: ' + messageObj.msg);
}
function createNewPeerConnection(username) {
	var pc = new RTCPeerConnection(ice);
	pc.addStream(localStream);
	pc.onaddstream = evt => onAddStream(evt);
	pc.ondatachannel = evt => onDataChannel(evt);
	pc.onicecandidate = candidate => onIceCandidate(candidate);
	pcs[username] = { pc: pc, dc: null, s: null, v: null };
	return pc;
}
function getUsernameByRemoteDescription(sdp) {
	var keys = Object.keys(pcs);
	var pc;
	for (var i = 0; i < keys.length; i++) {
		pc = pcs[keys[i]].pc;
		if (pc.remoteDescription.sdp == sdp) {
			return keys[i];
		}
	}
	return null;
}
function onAddStream(evt) {
	var pc = evt.target;
	var stream = evt.stream;
	var peer = getUsernameByRemoteDescription(pc.remoteDescription.sdp);
	pcs[peer].s = stream;
	var v = addNewVideo(stream);
	pcs[peer].v = v;
}
function addNewVideo(stream) {
	var vid = document.createElement('video');
	$('#videos')[0].appendChild(vid);
	vid.srcObject = stream;
	return vid;
}
