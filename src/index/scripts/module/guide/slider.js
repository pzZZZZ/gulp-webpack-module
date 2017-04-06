/**
 * Created by ww 
 */
module.exports = function (options) {
    this.slideQueue_ = options.slideQueue;
    this.$titleEl_ = options.$titleEl;
    this.step_ = -1;
    this.next = function (title) {
        this.step_++;
        // prev out
        if (this.step_ > 0) {
            var prevStepObj = this.slideQueue_[this.step_ - 1];
            var $prevStepEl = $('.' + prevStepObj.stepContainerCls);
            for (var i = 0; i < prevStepObj.subAnimateUnit.length; i++) {
                if (!prevStepObj.subAnimateUnit[i].keep) {
                    (function (i) {
                        var animateUnit = prevStepObj.subAnimateUnit[i];
                        setTimeout(function () {
                            $prevStepEl.find('.' + animateUnit.cls).animateCss('slideOutLeft');
                            // if (i + 1 === prevStepObj.subAnimateUnit.length) {
                            //     setTimeout(function () {
                            //         $prevStepEl.addClass('slide-disappear');
                            //     }, 500);
                            // }
                        }, animateUnit.delay);
                    })(i);
                }
            }
            setTimeout(function () {
                $prevStepEl.addClass('slide-disappear');
            }, 500);
        }
        // next in
        var currStepObj = this.slideQueue_[this.step_];
        var $currStepEl = $('.' + currStepObj.stepContainerCls);
        $currStepEl.addClass('slide-appear');
        for (var i = 0; i < currStepObj.subAnimateUnit.length; i++) {
            (function (i) {
                var animateUnit = currStepObj.subAnimateUnit[i];
                setTimeout(function () {
                    $currStepEl.find('.' + animateUnit.cls).animateCss('slideInRight');
                }, animateUnit.delay);
            })(i);
        }
        if (typeof currStepObj.time !== 'undefined') {
            // auto go next
            (function (_this) {
                setTimeout(function () {
                    if (typeof currStepObj.onSlideOut === 'function') {
                        currStepObj.onSlideOut();
                    }
                    if (_this.step_ + 1 < _this.slideQueue_.length)
                        _this.next();
                }, currStepObj.time);
            })(this);
        }
        if (typeof currStepObj.onSlideIn === 'function') {
            // calc longest time animate takes
            var time = 0;
            for (var i = 0; i < currStepObj.subAnimateUnit.length; i++) {
                if (currStepObj.subAnimateUnit[i].delay > time) {
                    time = currStepObj.subAnimateUnit[i].delay;
                }
            }
            setTimeout(function () {
                currStepObj.onSlideIn();
            }, time);
        }
        if (typeof title !== 'undefined')
            this.$titleEl_.html(title);
    }
}