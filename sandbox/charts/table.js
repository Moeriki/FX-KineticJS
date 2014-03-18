define([
	'lodash',
    'origin',
	'include/code'
], function (_, Origin, Code) {

    var tableTemplate = _.template('\
        <table class="widgets-charts-datatable">\
            <thead>\
                <th>&nbsp;</th>\
                <th>Name</th>\
                <th>Value</th>\
            </thead>\
            <tbody>\
            </tbody>\
            <tfoot>\
                <tr>\
                    <form name="data-adder">\
                        <td><input type="submit" value="Add" /></td>\
                        <td><input name="label" type="text" /></td>\
                        <td><input name="value" type="text" /></td>\
                    </form>\
                </tr>\
            </tfoot>\
        </table>');
    var tableBodyTemplate = _.template('\
                <% var i = 1; %>\
                <% _(dataset).forOwn(function (value, label) { %>\
                    <tr>\
                        <td><%- i++ %></td>\
                        <td><%- label %></td>\
                        <td><%- value %></td>\
                    </tr>\
                <% }); %>')

	return Origin.extend({
        _init: function (dataset, x, y) {
            this.domObj = $(document.createElement('div'));
            this.domObj.css({
                position: 'absolute',
                left: x,
                top: y,
                overflow: 'scroll',
                maxHeight: 200
                //width: 600,
                //height: 400
            });
            this.domObj.html(tableTemplate());
            this.tableBody = this.domObj.find('tbody').first();
            this.domObj.find('[name="data-adder"]').on('submit', _.bind(function () {
                var label = this.domObj.find('[name="label"]').first().val();
                var value = parseFloat(this.domObj.find('[name="value"]').first().val());

                if(label == null || isNaN(value))
                    return false;

                this._dataset.set(label, value);
                this.domObj.find('[name="label"]').focus();
                return false;
            },this));
            
            this._dataset = dataset;
            this._observerToken = this._dataset.registerObserver(_.bind(this.update,this));
            $(document.body).append(this.domObj);
        },

        update: function () {
            this.tableBody.html(tableBodyTemplate({ dataset: this._dataset.data }));
        },

        dispose: function () {
            this._dataset.unregisterObserver(this._observerToken);
            this.domObj.remove();
        }
    });
})