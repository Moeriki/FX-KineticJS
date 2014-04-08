/**
 @author: Ruben Tytgat
*/
define([
    'lodash',
    'jquery',
    'origin',
    'kinetic',
    'dancer',
    'include/code',
    'include/math/misc',
    './dataset',
    './barchart',
    './lineplot',
    './piechart',
    './scatterplot',
    './table'
], function (_,$,Origin,Kinetic,Dancer,Code,MiscMath,Dataset,BarChart,LinePlot,PieChart,ScatterPlot,Table) {
    'use strict';

    var colors = ['#343745','#FEC436','#2AB69D','#E75849','#7BBADE','#93DE7F','#FFED5D','#F29E4A','#FF7050'];

    return Origin.extend({
        _init: function (attrs) {
            this.node = new Kinetic.Group(Code.extend(attrs, {
                width: 800,
                height: 500
            }));
            var data = Dataset.create({
                "0": 1,
                "1": 1,
                "2": 1,
                "3": 1,
                "4": 1,
                "5": 1,
                "6": 120
            });
            this._dataset = data;
            var colrs = _.shuffle(colors);
            this.test = ScatterPlot.VerticalScatterPlot.create(data, colrs, { y: 100 });
            this.test2 = Table.create(data, 0, 200);
            this.test3 = LinePlot.VerticalLinePlot.create(data, colrs, { y: -200 });
            this.test4 = BarChart.VerticalBarChart.create(data, colrs, { x: -430, y: 100 });
            this.test5 = PieChart.create(data, colrs, { x: -380, y: 300 });
            this.test6 = ScatterPlot.HorizontalScatterPlot.create(data, colrs, { y: 200 });
            this.test7 = BarChart.HorizontalBarChart.create(data, colrs, { x: -480, y: -400 });
            this.node.add(this.test.node);
            this.node.add(this.test3.node);
            this.node.add(this.test4.node);
            this.node.add(this.test5.node);
            this.node.add(this.test6.node);
            this.node.add(this.test7.node);
            this.node.on('click',function () {
                this.test.dataset.set('Mushimush', this.test.dataset.get('Mushimush') + 30);
            }.bind(this));

            var circle = new Kinetic.Circle({
                radius: 300,
                fill: 'green'
            });
            this.node.add(circle);
            var box = circle.calculateBoundingBox();
            this.node.add(new Kinetic.Rect({
                stroke: 'red',
                strokeWidth: 3,
                x: box.left,
                y: box.top,
                width: box.right - box.left,
                height: box.bottom - box.top
            }));
            console.log(box);

            this.dancer = new Dancer();
            this.dancer.load({src: '/sandbox/morning.mp3'});
            this.dancer.play();

        },

        placed: function () {
            console.log('placed');
            this.test.placed();
            this.test2.update();
            this.test3.placed();
            this.test4.placed();
            this.test5.placed();
            this.test6.placed();
            this.test7.placed();
            this.anim = new Kinetic.Animation(_.bind(function () {
                var i = 0;
                MiscMath.partitionRange(64,512,7).forEach(_.bind(function (p) {
                    var a = this.dancer.getFrequency(p.lowerBound,p.upperBound) * 100000
                    if(isNaN(a))
                        return;
                    this._dataset.set((i++).toString(), a);
                }, this));
            }, this, this.node.getLayer()));
            this.anim.start();
        }
    });
});
