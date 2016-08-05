JsonMLtoTree = function (jml) {
	var node = {};
	node.tagName = jml[0];
	node.attributes = {};
	node.children = [];
	if (Array.isArray(jml[1])) {
		if (node.tagName === "") {
			node.text = "Root node";
		}
		console.log(node);
		for (var i = jml.length - 1; i >= 1; i--) {
			if (Array.isArray(jml[i])) {
				node.children.push(JsonMLtoTree(jml[i]));
			}
			else {
				node.children.push(jml[i]);
			}
		};		
	}
	else if (typeof jml[1] === "string") {
		node.text = jml[1];
		console.log("this is a string");
		console.log(node);
		for (var i = jml.length - 1; i >= 1; i--) {
			if (Array.isArray(jml[i])) {
				node.children.push(JsonMLtoTree(jml[i]));
			}
			else {
				node.children.push(jml[i]);
			}
		};
	}
	else {
		node.attributes = jml[1];
		
		if (node.attributes.id) {
			node.text = node.attributes.id;
		}
		else if (node.attributes['class']){
			node.text = node.tagName + "." + node.attributes['class'];
		}
		else if (node.tagName === "") {
			node.text = "Root node";
		}
		else node.text = node.tagName;
		console.log(node);
		for (var i = jml.length - 1; i >= 2; i--) {
			if (Array.isArray(jml[i])) {
				node.children.push(JsonMLtoTree(jml[i]));
			}
			else {
				node.children.push(jml[i]);
			}
		};
	}
	return node;
};