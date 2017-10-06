/**
 * Execute HaTeMiLe on add-on side.
 * @param {Event} event The browser event of loaded page.
 */
function executeHatemile(event) {
    var doc = event.originalTarget;
    if ((doc instanceof HTMLDocument) &&
            (doc.defaultView === doc.defaultView.top) &&
            (typeof doc.body !== typeof undefined) &&
            (typeof doc.head !== typeof undefined)) {
        var configuration = getConfiguration();

        var configure = new hatemile.util.Configure(configuration);
        var htmlParser = new hatemile.util.html.vanilla
                .VanillaHTMLDOMParser(doc);

        var accessibleAssociation = new hatemile.implementation
                .AccessibleAssociationImplementation(htmlParser, configure);
        accessibleAssociation.associateAllDataCellsWithHeaderCells();
        accessibleAssociation.associateAllLabelsWithFields();

        var accessibleForm = new hatemile.implementation
                .AccessibleFormImplementation(htmlParser, configure);
        accessibleForm.markAllAutoCompleteFields();
        accessibleForm.markAllRangeFields();
        accessibleForm.markAllRequiredFields();

        var accessibleNavigation = new hatemile.implementation
                .AccessibleNavigationImplementation(htmlParser, configure,
                    getSkippers());
        accessibleNavigation.provideNavigationByAllHeadings();
        accessibleNavigation.provideNavigationToAllLongDescriptions();
        accessibleNavigation.provideNavigationByAllSkippers();

        var accessibleDisplay = new hatemile.implementation
                .AccessibleDisplayScreenReaderImplementation(htmlParser,
                    configure, doc.defaultView.navigator.userAgent);
        accessibleDisplay.displayAllCellHeaders();
        accessibleDisplay.displayAllWAIARIAStates();
        accessibleDisplay.displayAllLinksAttributes();
        accessibleDisplay.displayAllDragsAndDrops();
        accessibleDisplay.displayAllAlternativeTextImages();
        accessibleDisplay.displayAllTitles();
        accessibleDisplay.displayAllShortcuts();
    }
}

/**
 * Include scripts and stylesheets on page.
 * @param {HTMLDocument} doc The page document.
 */
function includeAuxiliarScripts(doc) {
    if ((doc instanceof HTMLDocument) &&
            (doc.defaultView === doc.defaultView.top) &&
            (typeof doc.body !== typeof undefined) &&
            (typeof doc.head !== typeof undefined)) {
        var hatemilePath = 'scripts/hatemile/js/hatemile/';
        if (!doc.getElementById('eventlistenerlist')) {
            loadStyle(doc, 'styles/accessiblearia.css', 'accessiblearia');
            loadStyle(doc, 'styles/accessibleformvalidation.css',
                    'accessibleformvalidation');
            loadStyle(doc, 'styles/hide_changes.css', 'hidechanges');
            loadScript(doc, 'scripts/hatemile/js/common.js', true);
            loadScript(doc, 'scripts/hatemile/js/eventlistener.js', true);
            loadScript(doc, hatemilePath + 'util/CommonFunctions.js', false);
            loadScript(doc, hatemilePath + 'util/Configure.js', false);
            loadScript(doc, hatemilePath +
                    'util/html/vanilla/VanillaHTMLDOMElement.js', false);
            loadScript(doc, hatemilePath +
                    'util/html/vanilla/VanillaHTMLDOMParser.js', false);
            loadScript(doc, hatemilePath +
                    'util/html/vanilla/VanillaHTMLDOMTextNode.js', false);
            loadScript(doc, hatemilePath +
                    'implementation/AccessibleEventImplementation.js', false);
            loadScript(doc, hatemilePath +
                    'implementation/AccessibleFormImplementation.js', false);
            loadScript(doc, 'scripts/execute.js', false);
        }
    }
}

/**
 * Include scripts and stylesheets on page to execute before all scripts.
 * @param {Event} event The browser event of loaded page.
 */
function includeAuxiliarScriptsByFirstScript(event) {
    var element = event.originalTarget;
    if (element instanceof Element) {
        includeAuxiliarScripts(element.ownerDocument);
    }
}

/**
 * Include scripts and stylesheets on page to execute after all scripts.
 * @param {Event} event The browser event of loaded page.
 */
function includeAuxiliarScriptsByHead(event) {
    var doc = event.originalTarget;
    if ((doc instanceof HTMLDocument) &&
            (typeof doc.head !== typeof undefined)) {
        includeAuxiliarScripts(doc);
    }
}

window.addEventListener('load', function() {
    var appcontent = document.getElementById('appcontent');
    if (appcontent) {
        appcontent.addEventListener('beforescriptexecute',
                includeAuxiliarScriptsByFirstScript, true);
        appcontent.addEventListener('DOMContentLoaded',
                includeAuxiliarScriptsByHead, true);
        appcontent.addEventListener('load', executeHatemile, true);
    } else {
        gBrowser.addEventListener('beforescriptexecute',
                includeAuxiliarScriptsByFirstScript, true);
        gBrowser.addEventListener('DOMContentLoaded',
                includeAuxiliarScriptsByHead, true);
        gBrowser.addEventListener('load', executeHatemile, true);
    }
}, true);
