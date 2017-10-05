module.exports = function(grunt) {
    var hatemilePath = 'dist/content/scripts/hatemile/';
    var hatemilePathJS = hatemilePath + 'js/hatemile/';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, cwd: 'src/', src: ['**'], dest: 'dist/'},
                ],
            },
        },
        clean: {
            remove_dist_files: ['dist/'],
            remove_unused_files: [
                hatemilePath + 'bower.json',
                hatemilePath + 'CODE_OF_CONDUCT.md',
                hatemilePath + 'README.md',
                hatemilePath + '.git',
                hatemilePath + '.github/',
                hatemilePath + 'coffee/',
                hatemilePath + '_locales/',
                hatemilePathJS + 'AccessibleAssociation.js',
                hatemilePathJS + 'AccessibleCSS.js',
                hatemilePathJS + 'AccessibleDisplay.js',
                hatemilePathJS + 'AccessibleEvent.js',
                hatemilePathJS + 'AccessibleForm.js',
                hatemilePathJS + 'AccessibleNavigation.js',
                hatemilePathJS + 'util/html/HTMLDOMElement.js',
                hatemilePathJS + 'util/html/HTMLDOMNode.js',
                hatemilePathJS + 'util/html/HTMLDOMParser.js',
                hatemilePathJS + 'util/html/HTMLDOMTextNode.js',
                hatemilePathJS + 'util/html/jquery/',
                hatemilePathJS + 'util/css/',
                hatemilePathJS + 'implementation/AccessibleCSSImplementation.js'
            ],
            remove_source_files: [
                'dist/content/',
                'dist/defaults/',
                'dist/locale/',
                'dist/skin/',
                'dist/chrome.manifest',
                'dist/install.rdf'
            ]
        },
        comments: {
            hatemile_for_javascript: {
                options: {
                    singleline: true,
                    multiline: true,
                    keepSpecialComments: false
                },
                src: [hatemilePath + '**/*.js']
            },
        },
        'regex-replace': {
            main: {
                src: [hatemilePathJS +
                        'util/html/vanilla/VanillaHTMLDOMElement.js'],
                actions: [
                    {
                        name: 'remove_get_inner_html',
                        search: 'VanillaHTMLDOMElement\\.prototype\\.' +
                                'getInnerHTML = function\\(\\) {' +
                                '[\\n\\r\\t\\s]*return this\\.data\\.' +
                                'innerHTML;[\\n\\r\\t\\s]*};',
                        replace: '',
                        flags: 'g'
                    },
                    {
                        name: 'remove_set_inner_html',
                        search: 'VanillaHTMLDOMElement\\.prototype\\.' +
                                'setInnerHTML = function\\(html\\) {' +
                                '[\\n\\r\\t\\s]*this\\.data\\.innerHTML' +
                                ' = html;[\\n\\r\\t\\s]*};',
                        replace: '',
                        flags: 'g'
                    },
                    {
                        name: 'remove_get_outer_html',
                        search: 'VanillaHTMLDOMElement\\.prototype\\.' +
                                'getOuterHTML = function\\(\\) {' +
                                '[\\n\\r\\t\\s]*return this\\.data\\.' +
                                'outerHTML;[\\n\\r\\t\\s]*};',
                        replace: '',
                        flags: 'g'
                    },
                    {
                        name: 'remove_clone_element',
                        search: 'VanillaHTMLDOMElement\\.prototype\\.' +
                                'cloneElement = function\\(\\) {' +
                                '[\\n\\r\\t\\s]*var div;[\\n\\r\\t\\s]*div' +
                                ' = this\\.data\\.ownerDocument\\.' +
                                'createElement\\(\'div\'\\);[\\n\\r\\t\\s]*' +
                                'div\\.innerHTML = this\\.getOuterHTML\\(\\);' +
                                '[\\n\\r\\t\\s]*return new __exports\\.' +
                                'hatemile\\.util\\.html\\.vanilla\\.' +
                                'VanillaHTMLDOMElement\\(div\\.' +
                                'firstElementChild\\);[\\n\\r\\t\\s]*};',
                        replace: '',
                        flags: 'g'
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'dist/firefox-hatemile-for-browser.xpi',
                    mode: 'zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**'],
                    dest: '/'
                }]
            }
        }
    });

    // Load dependencies.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-stripcomments');
    grunt.loadNpmTasks('grunt-regex-replace');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    grunt.registerTask('default', ['clean:remove_dist_files', 'copy',
            'clean:remove_unused_files', 'comments', 'regex-replace',
            'compress', 'clean:remove_source_files']);
};
