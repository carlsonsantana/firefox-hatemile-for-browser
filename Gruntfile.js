module.exports = function(grunt) {
	var hatemileDirectory = 'dist/content/scripts/hatemile/';
	
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
			remove_unused_files: [hatemileDirectory + '.github/', hatemileDirectory + 'bower.json', hatemileDirectory + 'CODE_OF_CONDUCT.md', hatemileDirectory + 'README.md', hatemileDirectory + 'README.md', hatemileDirectory + '.git', hatemileDirectory + 'coffee/', hatemileDirectory + 'js/hatemile/AccessibleAssociation.js', hatemileDirectory + 'js/hatemile/AccessibleCSS.js', hatemileDirectory + 'js/hatemile/AccessibleDisplay.js', hatemileDirectory + 'js/hatemile/AccessibleEvent.js', hatemileDirectory + 'js/hatemile/AccessibleForm.js', hatemileDirectory + 'js/hatemile/AccessibleNavigation.js', hatemileDirectory + 'js/hatemile/util/html/HTMLDOMElement.js', hatemileDirectory + 'js/hatemile/util/html/HTMLDOMNode.js', hatemileDirectory + 'js/hatemile/util/html/HTMLDOMParser.js', hatemileDirectory + 'js/hatemile/util/html/HTMLDOMTextNode.js', hatemileDirectory + '_locales/', hatemileDirectory + 'js/hatemile/util/html/jquery/', hatemileDirectory + 'js/hatemile/util/css/', hatemileDirectory + 'js/hatemile/implementation/AccessibleCSSImplementation.js'],
			remove_source_files: ['dist/content/', 'dist/defaults/', 'dist/locale/', 'dist/skin/', 'dist/chrome.manifest', 'dist/install.rdf']
		},
		comments: {
			hatemile_for_javascript: {
				options: {
					singleline: true,
					multiline: true,
					keepSpecialComments: false
				},
				src: [hatemileDirectory + '**/*.js']
			},
		},
		'regex-replace': {
			main: {
				src: [hatemileDirectory + 'js/hatemile/util/html/vanilla/VanillaHTMLDOMElement.js'],
				actions: [
					{
						name: 'remove_get_inner_html',
						search: 'VanillaHTMLDOMElement\\.prototype\\.getInnerHTML = function\\(\\) {[\\n\\r\\t\\s]*return this\\.data\\.innerHTML;[\\n\\r\\t\\s]*};',
						replace: '',
						flags: 'g'
					},
					{
						name: 'remove_set_inner_html',
						search: 'VanillaHTMLDOMElement\\.prototype\\.setInnerHTML = function\\(html\\) {[\\n\\r\\t\\s]*this\\.data\\.innerHTML = html;[\\n\\r\\t\\s]*};',
						replace: '',
						flags: 'g'
					},
					{
						name: 'remove_get_outer_html',
						search: 'VanillaHTMLDOMElement\\.prototype\\.getOuterHTML = function\\(\\) {[\\n\\r\\t\\s]*return this\\.data\\.outerHTML;[\\n\\r\\t\\s]*};',
						replace: '',
						flags: 'g'
					},
					{
						name: 'remove_clone_element',
						search: 'VanillaHTMLDOMElement\\.prototype\\.cloneElement = function\\(\\) {[\\n\\r\\t\\s]*var div;[\\n\\r\\t\\s]*div = this\\.data\\.ownerDocument\\.createElement\\(\'div\'\\);[\\n\\r\\t\\s]*div\\.innerHTML = this\\.getOuterHTML\\(\\);[\\n\\r\\t\\s]*return new __exports\\.hatemile\\.util\\.html\\.vanilla\\.VanillaHTMLDOMElement\\(div\\.firstElementChild\\);[\\n\\r\\t\\s]*};',
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
	grunt.registerTask('default', ['clean:remove_dist_files', 'copy', 'clean:remove_unused_files', 'comments', 'regex-replace', 'compress', 'clean:remove_source_files']);
};
