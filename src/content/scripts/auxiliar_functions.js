function getFileContent(file) {
    var ioService = Components.classes['@mozilla.org/network/io-service;1']
            .getService(Components.interfaces.nsIIOService);
    var scriptableStream = Components
            .classes['@mozilla.org/scriptableinputstream;1']
            .getService(Components.interfaces.nsIScriptableInputStream);
    var channel = ioService.newChannel('chrome://hatemile/content/' + file,
            null, null);
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
    return preferencesBranch.getComplexValue(name,
            Components.interfaces.nsIPrefLocalizedString).data;
}

function getConfiguration() {
    var preferencesBranch = Components
            .classes['@mozilla.org/preferences-service;1']
            .getService(Components.interfaces.nsIPrefService)
            .getBranch('extensions.hatemile.');
    
    return {
        'prefix-generated-ids': 'id-hatemile-firefox-' + Math.random()
                .toString(36).substring(7),
        'aria-autocomplete-both-before': getPreference(preferencesBranch,
                'aria.autocomplete.both.before'),
        'aria-autocomplete-both-after': getPreference(preferencesBranch,
                'aria.autocomplete.both.after'),
        'aria-autocomplete-inline-before': getPreference(preferencesBranch,
                'aria.autocomplete.inline.before'),
        'aria-autocomplete-inline-after': getPreference(preferencesBranch,
                'aria.autocomplete.inline.after'),
        'aria-autocomplete-list-before': getPreference(preferencesBranch,
                'aria.autocomplete.list.before'),
        'aria-autocomplete-list-after': getPreference(preferencesBranch,
                'aria.autocomplete.list.after'),
        'aria-busy-true-before': getPreference(preferencesBranch,
                'aria.busy.true.before'),
        'aria-busy-true-after': getPreference(preferencesBranch,
                'aria.busy.true.after'),
        'aria-checked-true-before': getPreference(preferencesBranch,
                'aria.checked.true.before'),
        'aria-checked-true-after': getPreference(preferencesBranch,
                'aria.checked.true.after'),
        'aria-checked-false-before': getPreference(preferencesBranch,
                'aria.checked.false.before'),
        'aria-checked-false-after': getPreference(preferencesBranch,
                'aria.checked.false.after'),
        'aria-checked-mixed-before': getPreference(preferencesBranch,
                'aria.checked.mixed.before'),
        'aria-checked-mixed-after': getPreference(preferencesBranch,
                'aria.checked.mixed.after'),
        'aria-dropeffect-copy-before': getPreference(preferencesBranch,
                'aria.dropeffect.copy.before'),
        'aria-dropeffect-copy-after': getPreference(preferencesBranch,
                'aria.dropeffect.copy.after'),
        'aria-dropeffect-move-before': getPreference(preferencesBranch,
                'aria.dropeffect.move.before'),
        'aria-dropeffect-move-after': getPreference(preferencesBranch,
                'aria.dropeffect.move.after'),
        'aria-dropeffect-link-before': getPreference(preferencesBranch,
                'aria.dropeffect.link.before'),
        'aria-dropeffect-link-after': getPreference(preferencesBranch,
                'aria.dropeffect.link.after'),
        'aria-dropeffect-execute-before': getPreference(preferencesBranch,
                'aria.dropeffect.execute.before'),
        'aria-dropeffect-execute-after': getPreference(preferencesBranch,
                'aria.dropeffect.execute.after'),
        'aria-dropeffect-popup-before': getPreference(preferencesBranch,
                'aria.dropeffect.popup.before'),
        'aria-dropeffect-popup-after': getPreference(preferencesBranch,
                'aria.dropeffect.popup.after'),
        'aria-expanded-true-before': getPreference(preferencesBranch,
                'aria.expanded.true.before'),
        'aria-expanded-true-after': getPreference(preferencesBranch,
                'aria.expanded.true.after'),
        'aria-expanded-false-before': getPreference(preferencesBranch,
                'aria.expanded.false.before'),
        'aria-expanded-false-after': getPreference(preferencesBranch,
                'aria.expanded.false.after'),
        'aria-grabbed-true-before': getPreference(preferencesBranch,
                'aria.grabbed.true.before'),
        'aria-grabbed-true-after': getPreference(preferencesBranch,
                'aria.grabbed.true.after'),
        'aria-grabbed-false-before': getPreference(preferencesBranch,
                'aria.grabbed.false.before'),
        'aria-grabbed-false-after': getPreference(preferencesBranch,
                'aria.grabbed.false.after'),
        'aria-haspopup-true-before': getPreference(preferencesBranch,
                'aria.haspopup.true.before'),
        'aria-haspopup-true-after': getPreference(preferencesBranch,
                'aria.haspopup.true.after'),
        'aria-invalid-true-before': getPreference(preferencesBranch,
                'aria.invalid.true.before'),
        'aria-invalid-true-after': getPreference(preferencesBranch,
                'aria.invalid.true.after'),
        'aria-label-prefix-before': getPreference(preferencesBranch,
                'aria.label.prefix.before'),
        'aria-label-suffix-before': getPreference(preferencesBranch,
                'aria.label.suffix.before'),
        'aria-label-prefix-after': getPreference(preferencesBranch,
                'aria.label.prefix.after'),
        'aria-label-suffix-after': getPreference(preferencesBranch,
                'aria.label.suffix.after'),
        'aria-level-prefix-before': getPreference(preferencesBranch,
                'aria.level.prefix.before'),
        'aria-level-suffix-before': getPreference(preferencesBranch,
                'aria.level.suffix.before'),
        'aria-level-prefix-after': getPreference(preferencesBranch,
                'aria.level.prefix.after'),
        'aria-level-suffix-after': getPreference(preferencesBranch,
                'aria.level.suffix.after'),
        'aria-orientation-vertical-before': getPreference(preferencesBranch,
                'aria.orientation.vertical.before'),
        'aria-orientation-vertical-after': getPreference(preferencesBranch,
                'aria.orientation.vertical.after'),
        'aria-orientation-horizontal-before': getPreference(preferencesBranch,
                'aria.orientation.horizontal.before'),
        'aria-orientation-horizontal-after': getPreference(preferencesBranch,
                'aria.orientation.horizontal.after'),
        'aria-pressed-true-before': getPreference(preferencesBranch,
                'aria.pressed.true.before'),
        'aria-pressed-true-after': getPreference(preferencesBranch,
                'aria.pressed.true.after'),
        'aria-pressed-false-before': getPreference(preferencesBranch,
                'aria.pressed.false.before'),
        'aria-pressed-false-after': getPreference(preferencesBranch,
                'aria.pressed.false.after'),
        'aria-pressed-mixed-before': getPreference(preferencesBranch,
                'aria.pressed.mixed.before'),
        'aria-pressed-mixed-after': getPreference(preferencesBranch,
                'aria.pressed.mixed.after'),
        'aria-required-true-before': getPreference(preferencesBranch,
                'aria.required.true.before'),
        'aria-required-true-after': getPreference(preferencesBranch,
                'aria.required.true.after'),
        'aria-selected-true-before': getPreference(preferencesBranch,
                'aria.selected.true.before'),
        'aria-selected-true-after': getPreference(preferencesBranch,
                'aria.selected.true.after'),
        'aria-selected-false-before': getPreference(preferencesBranch,
                'aria.selected.false.before'),
        'aria-selected-false-after': getPreference(preferencesBranch,
                'aria.selected.false.after'),
        'aria-sort-ascending-before': getPreference(preferencesBranch,
                'aria.sort.ascending.before'),
        'aria-sort-ascending-after': getPreference(preferencesBranch,
                'aria.sort.ascending.after'),
        'aria-sort-descending-before': getPreference(preferencesBranch,
                'aria.sort.descending.before'),
        'aria-sort-descending-after': getPreference(preferencesBranch,
                'aria.sort.descending.after'),
        'aria-sort-other-before': getPreference(preferencesBranch,
                'aria.sort.other.before'),
        'aria-sort-other-after': getPreference(preferencesBranch,
                'aria.sort.other.after'),
        'aria-value-maximum-prefix-before': getPreference(preferencesBranch,
                'aria.value.maximum.prefix.before'),
        'aria-value-maximum-suffix-before': getPreference(preferencesBranch,
                'aria.value.maximum.suffix.before'),
        'aria-value-maximum-prefix-after': getPreference(preferencesBranch,
                'aria.value.maximum.prefix.after'),
        'aria-value-maximum-suffix-after': getPreference(preferencesBranch,
                'aria.value.maximum.suffix.after'),
        'aria-value-minimum-prefix-before': getPreference(preferencesBranch,
                'aria.value.minimum.prefix.before'),
        'aria-value-minimum-suffix-before': getPreference(preferencesBranch,
                'aria.value.minimum.suffix.before'),
        'aria-value-minimum-prefix-after': getPreference(preferencesBranch,
                'aria.value.minimum.prefix.after'),
        'aria-value-minimum-suffix-after': getPreference(preferencesBranch,
                'aria.value.minimum.suffix.after'),
        'attribute-title-prefix-before': getPreference(preferencesBranch,
                'attribute.title.prefix.before'),
        'attribute-title-suffix-before': getPreference(preferencesBranch,
                'attribute.title.suffix.before'),
        'attribute-title-prefix-after': getPreference(preferencesBranch,
                'attribute.title.prefix.after'),
        'attribute-title-suffix-after': getPreference(preferencesBranch,
                'attribute.title.suffix.after'),
        'attribute-accesskey-default': getPreference(preferencesBranch,
                'attribute.accesskey.default'),
        'attribute-accesskey-prefix-before': getPreference(preferencesBranch,
                'attribute.accesskey.prefix.before'),
        'attribute-accesskey-suffix-before': getPreference(preferencesBranch,
                'attribute.accesskey.suffix.before'),
        'attribute-accesskey-prefix-after': getPreference(preferencesBranch,
                'attribute.accesskey.prefix.after'),
        'attribute-accesskey-suffix-after': getPreference(preferencesBranch,
                'attribute.accesskey.suffix.after'),
        'attribute-target-blank-before': getPreference(preferencesBranch,
                'attribute.target.blank.before'),
        'attribute-target-blank-after': getPreference(preferencesBranch,
                'attribute.target.blank.after'),
        'attribute-download-before': getPreference(preferencesBranch,
                'attribute.download.before'),
        'attribute-download-after': getPreference(preferencesBranch,
                'attribute.download.after'),
        'attribute-draggable-before': getPreference(preferencesBranch,
                'attribute.draggable.before'),
        'attribute-draggable-after': getPreference(preferencesBranch,
                'attribute.draggable.after'),
        'attribute-dropzone-copy-before': getPreference(preferencesBranch,
                'attribute.dropzone.copy.before'),
        'attribute-dropzone-copy-after': getPreference(preferencesBranch,
                'attribute.dropzone.copy.after'),
        'attribute-dropzone-move-before': getPreference(preferencesBranch,
                'attribute.dropzone.move.before'),
        'attribute-dropzone-move-after': getPreference(preferencesBranch,
                'attribute.dropzone.move.after'),
        'attribute-dropzone-link-before': getPreference(preferencesBranch,
                'attribute.dropzone.link.before'),
        'attribute-dropzone-link-after': getPreference(preferencesBranch,
                'attribute.dropzone.link.after'),
        'attribute-data-invalid-url-before': getPreference(preferencesBranch,
                'attribute.data.invalid.url.before'),
        'attribute-data-invalid-url-after': getPreference(preferencesBranch,
                'attribute.data.invalid.url.after'),
        'attribute-data-invalid-email-before': getPreference(preferencesBranch,
                'attribute.data.invalid.email.before'),
        'attribute-data-invalid-email-after': getPreference(preferencesBranch,
                'attribute.data.invalid.email.after'),
        'attribute-data-invalid-range-before': getPreference(preferencesBranch,
                'attribute.data.invalid.range.before'),
        'attribute-data-invalid-range-after': getPreference(preferencesBranch,
                'attribute.data.invalid.range.after'),
        'attribute-data-invalid-length-before': getPreference(preferencesBranch,
                'attribute.data.invalid.length.before'),
        'attribute-data-invalid-length-after': getPreference(preferencesBranch,
                'attribute.data.invalid.length.after'),
        'attribute-data-invalid-pattern-before': getPreference(
                preferencesBranch, 'attribute.data.invalid.pattern.before'),
        'attribute-data-invalid-pattern-after': getPreference(preferencesBranch,
                'attribute.data.invalid.pattern.after'),
        'attribute-data-invalid-required-before': getPreference(
                preferencesBranch, 'attribute.data.invalid.required.before'),
        'attribute-data-invalid-required-after': getPreference(
                preferencesBranch, 'attribute.data.invalid.required.after'),
        'attribute-data-invalid-date-before': getPreference(preferencesBranch,
                'attribute.data.invalid.date.before'),
        'attribute-data-invalid-date-after': getPreference(preferencesBranch,
                'attribute.data.invalid.date.after'),
        'attribute-data-invalid-time-before': getPreference(preferencesBranch,
                'attribute.data.invalid.time.before'),
        'attribute-data-invalid-time-after': getPreference(preferencesBranch,
                'attribute.data.invalid.time.after'),
        'attribute-data-invalid-datetime-before': getPreference(
                preferencesBranch, 'attribute.data.invalid.datetime.before'),
        'attribute-data-invalid-datetime-after': getPreference(
                preferencesBranch, 'attribute.data.invalid.datetime.after'),
        'attribute-data-invalid-month-before': getPreference(preferencesBranch,
                'attribute.data.invalid.month.before'),
        'attribute-data-invalid-month-after': getPreference(preferencesBranch,
                'attribute.data.invalid.month.after'),
        'attribute-data-invalid-week-before': getPreference(preferencesBranch,
                'attribute.data.invalid.week.before'),
        'attribute-data-invalid-week-after': getPreference(preferencesBranch,
                'attribute.data.invalid.week.after'),
        'attribute-language-prefix-before': getPreference(preferencesBranch,
                'attribute.language.prefix.before'),
        'attribute-language-suffix-before': getPreference(preferencesBranch,
                'attribute.language.suffix.before'),
        'attribute-language-prefix-after': getPreference(preferencesBranch,
                'attribute.language.prefix.after'),
        'attribute-language-suffix-after': getPreference(preferencesBranch,
                'attribute.language.suffix.after'),
        'attribute-role-prefix-before': getPreference(preferencesBranch,
                'attribute.role.prefix.before'),
        'attribute-role-suffix-before': getPreference(preferencesBranch,
                'attribute.role.suffix.before'),
        'attribute-role-prefix-after': getPreference(preferencesBranch,
                'attribute.role.prefix.after'),
        'attribute-role-suffix-after': getPreference(preferencesBranch,
                'attribute.role.suffix.after'),
        'attribute-headers-prefix-before': getPreference(preferencesBranch,
                'attribute.headers.prefix.before'),
        'attribute-headers-suffix-before': getPreference(preferencesBranch,
                'attribute.headers.suffix.before'),
        'attribute-headers-prefix-after': getPreference(preferencesBranch,
                'attribute.headers.prefix.after'),
        'attribute-headers-suffix-after': getPreference(preferencesBranch,
                'attribute.headers.suffix.after'),
        'attribute-longdescription-prefix-before': getPreference(
                preferencesBranch, 'attribute.longdescription.prefix.before'),
        'attribute-longdescription-suffix-before': getPreference(
                preferencesBranch, 'attribute.longdescription.suffix.before'),
        'attribute-longdescription-prefix-after': getPreference(
                preferencesBranch, 'attribute.longdescription.prefix.after'),
        'attribute-longdescription-suffix-after': getPreference(
                preferencesBranch, 'attribute.longdescription.suffix.after'),
        'elements-heading-before': getPreference(preferencesBranch,
                'elements.heading.before'),
        'elements-heading-after': getPreference(preferencesBranch,
                'elements.heading.after')
    };
}

function getSkippers() {
    var preferencesBranch = Components
            .classes['@mozilla.org/preferences-service;1']
            .getService(Components.interfaces.nsIPrefService)
            .getBranch('extensions.hatemile.');
    
    return {
        'selector': '#container-heading',
        'description': getPreference(preferencesBranch,
                'skipper.tableofcontents'),
        'shortcut': '0'
    };
}
