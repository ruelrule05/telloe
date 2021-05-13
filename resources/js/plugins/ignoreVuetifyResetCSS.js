'use strict';

const fs = require('fs');
const path = require('path');

/*
 * /!\ WARNING /!\
 * The following plugin can be considered a disdgusting hack
 * and some of you might find this an NSFW-way to fix the problem
 *
 * PROCEED AT YOUR OWN RISK
 */

/**
 * @typedef {import('webpack/lib/Compiler')} Compiler
 * @typedef {import("webpack").Plugin} Plugin
 */

/**
 * ##Forgive me source code, for I have sinned
 *
 * This plugin applies a rather disgusting fix to undo the hard-loading of the
 * vuetify stylesheets by editing the source file.
 * It had to be done. I regret nothing.
 *
 * @extends Plugin
 */
class IgnoreVuetifyStylesPlugin {
	static pluginName = 'IgnoreVuetifyStylesPlugin';

	// removeStr = 'import "../../../src/styles/main.sass";';
	// filePath = 'node_modules/vuetify/lib/presets/default/index.js';

	/*
	 * Please leave these be, in case we only need to remove the
	 * css reset instead of the full stylesheet include
	 */
	removeStr = "@import './reset.scss';";
	filePath = 'node_modules/vuetify/src/styles/generic/_index.scss';

	// Local variables
	_content = null;

	get handle() {
		return path.resolve(process.cwd(), this.filePath);
	}

	get content() {
		return this._content;
	}

	set content(data) {
		this._content = !(data instanceof String) ? data.toString() : data;

		return this._content;
	}

	/**
	 * @param {Compiler} compiler
	 */
	async apply(compiler) {
		await compiler.hooks.beforeCompile.tapAsync(IgnoreVuetifyStylesPlugin.pluginName, async (/** @param {Compiler} compiler */ compiler, next) => {
			try {
				await this.readFile();

				if (this.content.indexOf(this.removeStr) >= 0) {
					await this.modFile(this.content);
				}
			} catch (e) {
				console.error(e);
			}

			await next();
		});
	}

	/**
	 * @throws {Error} When failing to open the file
	 * @return {String}
	 */
	readFile() {
		this.content = fs.readFileSync(this.handle, 'utf-8');

		return this.content;
	}

	/**
	 * Modify the file and write it back to its original place
	 *
	 * @param {String} content
	 * @throws {NodeJS.ErrnoException} When failing to open the file.
	 */
	async modFile(content) {
		const writeContent = content.replace(this.removeStr, '');

		await fs.writeFile(this.handle, writeContent, err => {
			if (!err) {
				console.info('\n\n>>> Hard-modded vuetify source file. <<<\n\n');
			} else {
				throw err;
			}
		});
	}
}

module.exports = IgnoreVuetifyStylesPlugin;
