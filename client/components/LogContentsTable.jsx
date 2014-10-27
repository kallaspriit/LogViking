/** @jsx React.DOM */
define([
	'jquery',
	'React',
	'logviking/Logger',
	'src/Formatter',
	'timeago'
], function($, React, logger, formatter) {
	'use strict';
	
	var log = logger.get('LogContentsTableComponent'),
		colors = [
			'lightseagreen',
			'forestgreen',
			'goldenrod',
			'dodgerblue',
			'darkorchid',
			'crimson',
			'darkred',
			'darkslategray'
		],
		colorIndex = 0,
		componentToColorIndexMap = {};

	// configure timeago
	jQuery.timeago.settings.strings = {
			prefixAgo: null,
			prefixFromNow: null,
			suffixAgo: "ago",
			suffixFromNow: "from now",
			inPast: 'any moment now',
			seconds: "seconds",
			minute: "minute",
			minutes: "%dm",
			hour: "hour",
			hours: "%d hours",
			day: "day",
			days: "%d days",
			month: "month",
			months: "%d months",
			year: "year",
			years: "%d years",
			wordSeparator: " ",
			numbers: []
		  };

	var LogContentsTable = React.createClass({

		componentDidMount: function() {
			this.updateTableColumnWidths();

			$(window).resize(this.updateTableColumnWidths);
		},

		componentDidUpdate: function() {
			$('.app-entry-date').timeago().removeClass('app-entry-date');
		},

		updateTableColumnWidths: function() {
			var $headerTable = $('#log-table-header'),
				$contentsTable = $(this.refs.table.getDOMNode()),
				columnWidths = this.getColumnWidths($headerTable),
				i;

			log.info('columnWidths', columnWidths);

			for (i = 0; i < columnWidths.length; i++) {
				$contentsTable.find('TR:eq(0) TD:eq(' + i + ')').attr('width', columnWidths[i]);
			}
		},

		getColumnWidths: function($headerTable) {
			var self = this,
				columns = $headerTable.find('TR:eq(0) TH'),
				columnCount = columns.length,
				columnWidths = [],
				i;

			for (i = 0; i < columnCount - 1; i++) {
				columnWidths.push($(columns[i]).innerWidth());
			}

			return columnWidths;
		},

		render: function () {
			log.info('render', this.props.logEntries.length);

			var rows = this.props.logEntries.map(function(entry) {
				var color,
					style;

				if (typeof componentToColorIndexMap[entry.component] === 'undefined') {
					componentToColorIndexMap[entry.component] = colorIndex;

					colorIndex = (colorIndex + 1) % colors.length;
				}

				color = colors[componentToColorIndexMap[entry.component]];
				style = {color: color};

				return (
					<tr key={entry.id} className={'app-entry-' + entry.type}>
						<td className="app-entry-date" title={entry.date.toISOString()}>{entry.date.toLocaleDateString()}</td>
						<td style={style}>{entry.component}</td>
						<td dangerouslySetInnerHTML={{__html: formatter.format(entry.data)}}></td>
					</tr>
				);
			});

			return (
				<table id="log-table-contents" className="table table-hover app-log-table" ref="table">
					<tbody>
						<tr className="app-layout-row">
							<td></td>
							<td></td>
							<td></td>
						</tr>
						{rows}
					</tbody>
				</table>
			);
		}
	});
	
	return LogContentsTable;
});