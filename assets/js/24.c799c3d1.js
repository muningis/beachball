(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{316:function(e,a,t){"use strict";t.r(a);var s=t(10),n=Object(s.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"change"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#change"}},[e._v("#")]),e._v(" "),a("code",[e._v("change")])]),e._v(" "),a("p",[e._v("This command walks you through a couple of questions and will generate the appropriate "),a("a",{attrs:{href:"../concepts/change-files"}},[e._v("change file")]),e._v(" in the "),a("code",[e._v("/change")]),e._v(" directory. The generated file will be committed automatically.")]),e._v(" "),a("p",[e._v("One of the niceties of using this utility to generate change files is that it will "),a("a",{attrs:{href:"./check"}},[e._v("check")]),e._v(" whether or not you even need a change file. Also, it will load recent commit messages to ease change file generation.")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ beachball change\n")])])]),a("h3",{attrs:{id:"options"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#options"}},[e._v("#")]),e._v(" Options")]),e._v(" "),a("p",[e._v("Some "),a("a",{attrs:{href:"./options"}},[e._v("general options")]),e._v(" including "),a("code",[e._v("--branch")]),e._v(" and "),a("code",[e._v("--scope")]),e._v(" also apply for this command.")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Option")]),e._v(" "),a("th",[e._v("Alias")]),e._v(" "),a("th",[e._v("Default")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[a("code",[e._v("--all")])]),e._v(" "),a("td"),e._v(" "),a("td",[e._v("false")]),e._v(" "),a("td",[e._v("Generate change files for all packages")])]),e._v(" "),a("tr",[a("td",[a("code",[e._v("--message")])]),e._v(" "),a("td",[a("code",[e._v("-m")])]),e._v(" "),a("td",[e._v("(interactive prompt)")]),e._v(" "),a("td",[e._v("Description for all change files")])]),e._v(" "),a("tr",[a("td",[a("code",[e._v("--no-commit")])]),e._v(" "),a("td"),e._v(" "),a("td",[e._v("false")]),e._v(" "),a("td",[e._v("Stage the change files rather than committing")])]),e._v(" "),a("tr",[a("td",[a("code",[e._v("--package")])]),e._v(" "),a("td"),e._v(" "),a("td",[e._v("(changed packages)")]),e._v(" "),a("td",[e._v("Generate change files for these packages (option can be specified multiple times)")])]),e._v(" "),a("tr",[a("td",[a("code",[e._v("--type")])]),e._v(" "),a("td"),e._v(" "),a("td",[e._v("(interactive prompt)")]),e._v(" "),a("td",[e._v("Type for all the change files (must be valid for each package)")])])])]),e._v(" "),a("h3",{attrs:{id:"examples"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[e._v("#")]),e._v(" Examples")]),e._v(" "),a("p",[e._v("Basic interactive prompt (see "),a("a",{attrs:{href:"#prompt-walkthrough"}},[e._v("walkthrough")]),e._v(" for details):")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("beachball change\n")])])]),a("p",[e._v("Skip the interactive prompt by specifying a message and type for all changed packages:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("beachball change --type patch --message 'some message'\n")])])]),a("p",[e._v("Generate change file for specific package(s), regardless of changes, and even if a change file already exists for the package in this branch. Each package must be specified with a separate "),a("code",[e._v("--package")]),e._v(" option. (You can also use the "),a("code",[e._v("--message")]),e._v(" and "),a("code",[e._v("--type")]),e._v(" options here.)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("beachball change --package foo --package bar\n")])])]),a("p",[e._v("Generate change files for all packages, regardless of changes. This would most often be used for build config updates which only touch a shared config file, but actually impact the output of all packages.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("beachball change --all --type patch --message 'update build output settings'\n")])])]),a("h3",{attrs:{id:"prompt-walkthrough"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prompt-walkthrough"}},[e._v("#")]),e._v(" Prompt walkthrough")]),e._v(" "),a("p",[e._v("If you have changes that are not committed yet (i.e. "),a("code",[e._v("git status")]),e._v(" reports changes), then "),a("code",[e._v("beachball change")]),e._v(" will warn you about these:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('$ beachball change\nDefaults to "origin/master"\nThere are uncommitted changes in your repository. Please commit these files first:\n- a-new-file\n')])])]),a("p",[e._v("Make sure to commit "),a("em",[e._v("all")]),e._v(" changes before proceeding with the "),a("code",[e._v("change")]),e._v(" command.")]),e._v(" "),a("p",[e._v("After committing, run "),a("code",[e._v("beachball change")]),e._v(":")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('$ beachball change\n\nValidating options and change files...\nChecking for changes against "origin/main"\nFound changes in the following packages:\n  some-pkg\n')])])]),a("p",[e._v("For each package, the prompt will start by asking for a change "),a("strong",[e._v("type")]),e._v(". This should be chosen based on "),a("a",{attrs:{href:"https://semver.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("semantic versioning rules"),a("OutboundLink")],1),e._v(" because it determines how to update the package version. If the change doesn't affect the published package at all (e.g. you just updated some comments), choose "),a("code",[e._v("none")]),e._v(".")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Please describe the changes for: some-pkg\n? Change type › - Use arrow-keys. Return to submit.\n❯ Patch - bug fixes; no backwards incompatible changes.\n  Minor - small feature; backwards compatible changes.\n  None - this change does not affect the published package in any way.\n  Major - major feature; breaking changes.\n")])])]),a("p",[e._v("Next, it asks for a "),a("strong",[e._v("description")]),e._v(" of the change. You can type any text or choose from a list of recent commit messages.")]),e._v(" "),a("blockquote",[a("p",[e._v("Tip: These descriptions will be collated into a changelog when the change is published by "),a("code",[e._v("beachball publish")]),e._v(", so think about how to describe your change in a way that's helpful and relevant for consumers of the package.")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Please describe the changes for: some-pkg\n? Describe changes (type or choose one) ›\nadding a new file\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);