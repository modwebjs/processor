function Processor(site) {
	this.site = site;
}

Processor.prototype.render = function(page, request) {
	var data = {};

	data.site = this.site;
	data.request = request;
	data.page = page;
	data.status = 200;
	data.headers = {};

	// TODO: let modules handle this
	data.locale = this.site.locales.nl;
	data.headers.Connection = "close";

	/*
	if (page.modules && page.modules.length) {
		for (var i = 0; i < page.modules.length; i++) {
			var module = page.modules[i];

			// TODO: use hooks and global modules?
			this.modules[module].process(vars);
		}
	}
	*/

	data.headers["Content-Type"] = "text/html; charset=utf-8";

	var view = this.site.views[page.view];

	if (!view) {
		throw new Error("Could not load view: " + page.view);
	}

	data.content = view.render(data);

	if (page.master) {
		var master = this.site.views[page.master];
		data.content = master.render(data);
	}

	return data;
};

module.exports = Processor;
