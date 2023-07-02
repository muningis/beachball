(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{295:function(e,t,s){"use strict";s.r(t);var a=s(10),i=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"publish"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#publish"}},[e._v("#")]),e._v(" "),t("code",[e._v("publish")])]),e._v(" "),t("p",[e._v("Publishing automates all the bumping and synchronizing of package versions in the git remote as well as the npm registry.")]),e._v(" "),t("h3",{attrs:{id:"options"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#options"}},[e._v("#")]),e._v(" Options")]),e._v(" "),t("p",[e._v("See the "),t("a",{attrs:{href:"./options"}},[e._v("options page")]),e._v(".")]),e._v(" "),t("h3",{attrs:{id:"algorithm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#algorithm"}},[e._v("#")]),e._v(" Algorithm")]),e._v(" "),t("p",[e._v("The "),t("code",[e._v("publish")]),e._v(" command is designed to run steps in an order that minimizes the chances of mid-publish failure by doing validation upfront.")]),e._v(" "),t("p",[t("code",[e._v("beachball publish")]),e._v(" performs the following steps:")]),e._v(" "),t("ol",[t("li",[e._v("Validate that options and change files are valid")]),e._v(" "),t("li",[e._v("Bump and publish to npm (unless disabled):\n"),t("ol",[t("li",[e._v("Bump the package versions locally")]),e._v(" "),t("li",[e._v("Generate the changelog files (unless disabled)")]),e._v(" "),t("li",[e._v("Delete change files locally (unless disabled)")]),e._v(" "),t("li",[e._v("Validate that nothing to be published depends on a private package")]),e._v(" "),t("li",[e._v("Publish packages to npm in topological order based on the dependency graph (to reduce the chances that if there's a failure partway through, a published package might require unpublished versions)")])])]),e._v(" "),t("li",[e._v("Bump and push to git (unless bumping or pushing is disabled):\n"),t("ol",[t("li",[e._v("Revert any previous changes (from the publish step)")]),e._v(" "),t("li",[e._v("Merge the latest changes from the remote branch to avoid merge conflicts (unless fetching is disabled)")]),e._v(" "),t("li",[e._v("Bump the versions locally")]),e._v(" "),t("li",[e._v("Generate the changelog files (unless disabled)")]),e._v(" "),t("li",[e._v("Delete change files locally (unless disabled)")]),e._v(" "),t("li",[e._v("Commit the changes")]),e._v(" "),t("li",[e._v("Create git tags for new package versions (unless disabled)")]),e._v(" "),t("li",[e._v("Push the changes and tags")])])])]),e._v(" "),t("p",[e._v("It might be surprising that "),t("code",[e._v("beachball publish")]),e._v(" does so many steps, especially the step about reverting changes! In most version bumping systems that automate syncing the git repo and npm registry, they assume that the source code is still fresh once it's time to push changes back to the git repository. This is rarely the case for large repos with many developers. So, "),t("code",[e._v("beachball")]),e._v(" fetches the latest changes before pushing back to the target branch to avoid merge conflicts.")]),e._v(" "),t("h3",{attrs:{id:"example-ci-workflow"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#example-ci-workflow"}},[e._v("#")]),e._v(" Example CI workflow")]),e._v(" "),t("p",[e._v("See the "),t("a",{attrs:{href:"../concepts/ci-integration"}},[e._v("CI integration page")]),e._v(" details and examples for how to run "),t("code",[e._v("beachball publish")]),e._v(" in CI.")]),e._v(" "),t("h3",{attrs:{id:"recovering-from-failed-publish"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#recovering-from-failed-publish"}},[e._v("#")]),e._v(" Recovering from failed publish")]),e._v(" "),t("p",[e._v("If the "),t("code",[e._v("publish")]),e._v(" command fails partway through, after some versions have been published to the registry, you'll need to run "),t("a",{attrs:{href:"./sync"}},[t("code",[e._v("beachball sync")])]),e._v(" and commit the changes.")])])}),[],!1,null,null,null);t.default=i.exports}}]);