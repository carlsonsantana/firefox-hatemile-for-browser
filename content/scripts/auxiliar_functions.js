function getFileContent(file) {
	var ioService = Components.classes['@mozilla.org/network/io-service;1']
			.getService(Components.interfaces.nsIIOService);
	var scriptableStream = Components.classes['@mozilla.org/scriptableinputstream;1']
			.getService(Components.interfaces.nsIScriptableInputStream);
	var channel = ioService.newChannel('chrome://hatemile/content/' + file, null, null);
	var input = channel.open();
	scriptableStream.init(input);
	var content = scriptableStream.read(input.available());
	scriptableStream.close();
	input.close();
	return content;
}

function loadScript(doc, file, beforeAllScripts) {
	writeScript(doc, getFileContent(file), beforeAllScripts);
}

function writeScript(doc, content, beforeAllScripts) {
	var scriptTag, identifier;
	
	if (beforeAllScripts) {
		identifier = 'hatemile-script-before';
	} else {
		identifier = 'hatemile-script-after';
	}
	if (!doc.getElementById(identifier)) {
		if ((doc.createElement) && (doc.createTextNode)) {
			scriptTag = doc.createElement('script');
			scriptTag.appendChild(doc.createTextNode(content));
		} else {
			scriptTag = document.createElement('script');
			scriptTag.appendChild(document.createTextNode(content));
		}
		
		scriptTag.setAttribute('type', 'text/javascript');
		scriptTag.setAttribute('id', identifier);
		
		if (!doc.head) {
			doc.documentElement.appendChild(scriptTag);
		} else if ((doc.head.children.length == 0) || (!beforeAllScripts)) {
			doc.head.appendChild(scriptTag);
		} else {
			doc.head.insertBefore(scriptTag, doc.head.children[0]);
		}
	} else {
		doc.getElementById(identifier).appendChild(doc.createTextNode(content));
	}
}

function loadStyle(doc, file, identifier) {
	writeStyle(doc, getFileContent(file), identifier);
}

function writeStyle(doc, content, identifier) {
	var styleTag, textNode;
	if (!doc.getElementById(identifier)) {
		if ((doc.createElement) && (doc.createTextNode)) {
			styleTag = doc.createElement('style');
			textNode = doc.createTextNode(content);
		} else {
			styleTag = document.createElement('style');
			textNode = document.createTextNode(content);
		}
		styleTag.setAttribute('rel', 'stylesheet');
		styleTag.setAttribute('type', 'text/css');
		styleTag.setAttribute('id', identifier);
		styleTag.appendChild(textNode);
		doc.documentElement.appendChild(styleTag);
	}
}

function getPreference(preferencesBranch, name) {
	return preferencesBranch.getComplexValue(name, Components.interfaces.nsIPrefLocalizedString).data;
}

function getAccessibleDisplayCSS() {
	var preferencesBranch = Components.classes['@mozilla.org/preferences-service;1']
			.getService(Components.interfaces.nsIPrefService)
			.getBranch('extensions.hatemile.');
	
	var content = getFileContent('styles/accessibledisplay.mustache');
	content = Mustache.render(content, {
		'aria-grabbed-true-before': getPreference(preferencesBranch, 'aria.grabbed.true.before')
		, 'aria-grabbed-true-after': getPreference(preferencesBranch, 'aria.grabbed.true.after')
		, 'aria-grabbed-false-before': getPreference(preferencesBranch, 'aria.grabbed.false.before')
		, 'aria-grabbed-false-after': getPreference(preferencesBranch, 'aria.grabbed.false.after')
		, 'aria-label-prefix-before': getPreference(preferencesBranch, 'aria.label.prefix.before')
		, 'aria-label-suffix-before': getPreference(preferencesBranch, 'aria.label.suffix.before')
		, 'aria-label-prefix-after': getPreference(preferencesBranch, 'aria.label.prefix.after')
		, 'aria-label-suffix-after': getPreference(preferencesBranch, 'aria.label.suffix.after')
		, 'aria-dropeffect-copy-before': getPreference(preferencesBranch, 'aria.dropeffect.copy.before')
		, 'aria-dropeffect-copy-after': getPreference(preferencesBranch, 'aria.dropeffect.copy.after')
		, 'aria-dropeffect-move-before': getPreference(preferencesBranch, 'aria.dropeffect.move.before')
		, 'aria-dropeffect-move-after': getPreference(preferencesBranch, 'aria.dropeffect.move.after')
		, 'aria-dropeffect-link-before': getPreference(preferencesBranch, 'aria.dropeffect.link.before')
		, 'aria-dropeffect-link-after': getPreference(preferencesBranch, 'aria.dropeffect.link.after')
		, 'aria-dropeffect-execute-before': getPreference(preferencesBranch, 'aria.dropeffect.execute.before')
		, 'aria-dropeffect-execute-after': getPreference(preferencesBranch, 'aria.dropeffect.execute.after')
		, 'aria-dropeffect-popup-before': getPreference(preferencesBranch, 'aria.dropeffect.popup.before')
		, 'aria-dropeffect-popup-after': getPreference(preferencesBranch, 'aria.dropeffect.popup.after')
		, 'attribute-download-before': getPreference(preferencesBranch, 'attribute.download.before')
		, 'attribute-download-after': getPreference(preferencesBranch, 'attribute.download.after')
		, 'attribute-target-blank-before': getPreference(preferencesBranch, 'attribute.target.blank.before')
		, 'attribute-target-blank-after': getPreference(preferencesBranch, 'attribute.target.blank.after')
		, 'attribute-title-prefix-before': getPreference(preferencesBranch, 'attribute.title.prefix.before')
		, 'attribute-title-suffix-before': getPreference(preferencesBranch, 'attribute.title.suffix.before')
		, 'attribute-title-prefix-after': getPreference(preferencesBranch, 'attribute.title.prefix.after')
		, 'attribute-title-suffix-after': getPreference(preferencesBranch, 'attribute.title.suffix.after')
		, 'attribute-accesskey-prefix-before': getPreference(preferencesBranch, 'attribute.accesskey.prefix.before')
		, 'attribute-accesskey-suffix-before': getPreference(preferencesBranch, 'attribute.accesskey.suffix.before')
		, 'attribute-accesskey-prefix-after': getPreference(preferencesBranch, 'attribute.accesskey.prefix.after')
		, 'attribute-accesskey-suffix-after': getPreference(preferencesBranch, 'attribute.accesskey.suffix.after')
		, 'attribute-draggable-before': getPreference(preferencesBranch, 'aria.grabbed.false.before')
		, 'attribute-draggable-after': getPreference(preferencesBranch, 'aria.grabbed.false.after')
		, 'attribute-dropzone-copy-before': getPreference(preferencesBranch, 'aria.dropeffect.copy.before')
		, 'attribute-dropzone-copy-after': getPreference(preferencesBranch, 'aria.dropeffect.copy.after')
		, 'attribute-dropzone-move-before': getPreference(preferencesBranch, 'aria.dropeffect.move.before')
		, 'attribute-dropzone-move-after': getPreference(preferencesBranch, 'aria.dropeffect.move.after')
		, 'attribute-dropzone-link-before': getPreference(preferencesBranch, 'aria.dropeffect.link.before')
		, 'attribute-dropzone-link-after': getPreference(preferencesBranch, 'aria.dropeffect.link.after')
	});
	return content;
}

function getAccessibleFormDisplayCSS() {
	var preferencesBranch = Components.classes['@mozilla.org/preferences-service;1']
			.getService(Components.interfaces.nsIPrefService)
			.getBranch('extensions.hatemile.');
	
	var content = getFileContent('styles/accessibleformdisplay.mustache');
	content = Mustache.render(content, {
		'attribute-title-prefix-before': getPreference(preferencesBranch, 'attribute.title.prefix.before')
		, 'attribute-title-suffix-before': getPreference(preferencesBranch, 'attribute.title.suffix.before')
		, 'attribute-title-prefix-after': getPreference(preferencesBranch, 'attribute.title.prefix.after')
		, 'attribute-title-suffix-after': getPreference(preferencesBranch, 'attribute.title.suffix.after')
		, 'attribute-accesskey-prefix-before': getPreference(preferencesBranch, 'attribute.accesskey.prefix.before')
		, 'attribute-accesskey-suffix-before': getPreference(preferencesBranch, 'attribute.accesskey.suffix.before')
		, 'attribute-accesskey-prefix-after': getPreference(preferencesBranch, 'attribute.accesskey.prefix.after')
		, 'attribute-accesskey-suffix-after': getPreference(preferencesBranch, 'attribute.accesskey.suffix.after')
		, 'aria-required-true-before': getPreference(preferencesBranch, 'aria.required.true.before')
		, 'aria-required-true-after': getPreference(preferencesBranch, 'aria.required.true.after')
		, 'aria-value-maximum-prefix-before': getPreference(preferencesBranch, 'aria.value.maximum.prefix.before')
		, 'aria-value-maximum-suffix-before': getPreference(preferencesBranch, 'aria.value.maximum.suffix.before')
		, 'aria-value-maximum-prefix-after': getPreference(preferencesBranch, 'aria.value.maximum.prefix.after')
		, 'aria-value-maximum-suffix-after': getPreference(preferencesBranch, 'aria.value.maximum.suffix.after')
		, 'aria-value-minimum-prefix-before': getPreference(preferencesBranch, 'aria.value.minimum.prefix.before')
		, 'aria-value-minimum-suffix-before': getPreference(preferencesBranch, 'aria.value.minimum.suffix.before')
		, 'aria-value-minimum-prefix-after': getPreference(preferencesBranch, 'aria.value.minimum.prefix.after')
		, 'aria-value-minimum-suffix-after': getPreference(preferencesBranch, 'aria.value.minimum.suffix.after')
		, 'attribute-data-invalid-url-before': getPreference(preferencesBranch, 'attribute.data.invalid.url.before')
		, 'attribute-data-invalid-url-after': getPreference(preferencesBranch, 'attribute.data.invalid.url.after')
		, 'attribute-data-invalid-email-before': getPreference(preferencesBranch, 'attribute.data.invalid.email.before')
		, 'attribute-data-invalid-email-after': getPreference(preferencesBranch, 'attribute.data.invalid.email.after')
		, 'attribute-data-invalid-range-before': getPreference(preferencesBranch, 'attribute.data.invalid.range.before')
		, 'attribute-data-invalid-range-after': getPreference(preferencesBranch, 'attribute.data.invalid.range.after')
		, 'attribute-data-invalid-length-before': getPreference(preferencesBranch, 'attribute.data.invalid.length.before')
		, 'attribute-data-invalid-length-after': getPreference(preferencesBranch, 'attribute.data.invalid.length.after')
		, 'attribute-data-invalid-pattern-before': getPreference(preferencesBranch, 'attribute.data.invalid.pattern.before')
		, 'attribute-data-invalid-pattern-after': getPreference(preferencesBranch, 'attribute.data.invalid.pattern.after')
		, 'attribute-data-invalid-required-before': getPreference(preferencesBranch, 'attribute.data.invalid.required.before')
		, 'attribute-data-invalid-required-after': getPreference(preferencesBranch, 'attribute.data.invalid.required.after')
		, 'attribute-data-invalid-date-before': getPreference(preferencesBranch, 'attribute.data.invalid.date.before')
		, 'attribute-data-invalid-date-after': getPreference(preferencesBranch, 'attribute.data.invalid.date.after')
		, 'attribute-data-invalid-time-before': getPreference(preferencesBranch, 'attribute.data.invalid.time.before')
		, 'attribute-data-invalid-time-after': getPreference(preferencesBranch, 'attribute.data.invalid.time.after')
		, 'attribute-data-invalid-datetime-before': getPreference(preferencesBranch, 'attribute.data.invalid.datetime.before')
		, 'attribute-data-invalid-datetime-after': getPreference(preferencesBranch, 'attribute.data.invalid.datetime.after')
		, 'attribute-data-invalid-month-before': getPreference(preferencesBranch, 'attribute.data.invalid.month.before')
		, 'attribute-data-invalid-month-after': getPreference(preferencesBranch, 'attribute.data.invalid.month.after')
		, 'attribute-data-invalid-week-before': getPreference(preferencesBranch, 'attribute.data.invalid.week.before')
		, 'attribute-data-invalid-week-after': getPreference(preferencesBranch, 'attribute.data.invalid.week.after')
	});
	return content;
}

function getConfiguration() {
	var preferencesBranch = Components.classes['@mozilla.org/preferences-service;1']
			.getService(Components.interfaces.nsIPrefService)
			.getBranch('extensions.hatemile.');
	
	return {
		'prefix-generated-ids': 'id-hatemile-firefox-' + Math.random().toString(36).substring(7)
		, 'attribute-longdescription-prefix-before': getPreference(preferencesBranch, 'attribute.longdescription.prefix.before')
		, 'attribute-longdescription-suffix-before': getPreference(preferencesBranch, 'attribute.longdescription.suffix.before')
		, 'attribute-longdescription-prefix-after': getPreference(preferencesBranch, 'attribute.longdescription.prefix.after')
		, 'attribute-longdescription-suffix-after': getPreference(preferencesBranch, 'attribute.longdescription.suffix.after')
		, 'elements-heading-before': getPreference(preferencesBranch, 'elements.heading.before')
		, 'elements-heading-after': getPreference(preferencesBranch, 'elements.heading.after')
	};
}

function getSkippers() {
	var preferencesBranch = Components.classes['@mozilla.org/preferences-service;1']
			.getService(Components.interfaces.nsIPrefService)
			.getBranch('extensions.hatemile.');
	
	return {
		'selector': '#container-heading'
		, 'description': getPreference(preferencesBranch, 'skipper.tableofcontents')
		, 'shortcut': '0'
	};
}
