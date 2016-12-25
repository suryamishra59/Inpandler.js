/**
 * @author: Surya Deep Mishra
 */

$(document).ready(function() {
    /*
     * Scrpiting text fields
     */

    // Creating label
    var allTexts = $('.ip-text');
    for (var i = 0; i < allTexts.length; i++) {
        var labelName = $(allTexts[i]).attr('label');
        var span = document.createElement('span');
        $(span).attr('class', 'ip-text-label');
        $(span).text(labelName);
        $(span).appendTo($(allTexts[i]).parent());
    }

    $(".ip-text").parent().addClass('ip-container');

    // Check if value is null by default
    var textFields = $(".ip-text");
    $.each(textFields, function(index, field) {
        var value = $(field).val();
        if (value != "") {
            onFocusLabel($(field).next());
        } else
            outFocusLabel($(field).next());
    });

    $(".ip-text").focus(function() { // At focus of text-field
        onFocusLabel($(this).next());
    }).blur(function() { // At focus out from text-field
        value = $(this).val();
        if (value == "") {
            outFocusLabel($(this).next());
        } else {
            onFocusLabel($(this).next());
        }
    });

    $(".ip-text").next().click(function() {
        onFocusLabel($(this));
        $(this).prev().focus();
    });

    function onFocusLabel(label) {
        var fontSize = $(label).prev().css('font-size');
        fontSize = fontSize.substring(0, fontSize.length - 2);
        fontSize = (75 / 100) * fontSize;
        fontSize += 'px';
        $(label).css({
            'font-size': fontSize
        });
        $(label).addClass('on-focus-label');
    }

    function outFocusLabel(label) {
        var fontSize = $(label).prev().css('font-size');
        $(label).css({
            'font-size': fontSize
        });
        $(label).removeClass('on-focus-label');
    }

    /*
     * Scrpiting checkboxes
     */

    $(".ip-check").parent().addClass('ip-container');

    var allBoxes = document.getElementsByClassName('ip-check');
    for (var i = 0; i < allBoxes.length; i++) {
        var checkBox = $(allBoxes[i]).parent().find('input[type="checkbox"]');
        var parent = $(checkBox).parent();
        var lineHeight = $(parent).css('height');
        $(parent).css('line-height', lineHeight);

        // Creating elements
        var trueSpan = $(checkBox).attr('true-label');
        var falseSpan = $(checkBox).attr('false-label');
        if (trueSpan == undefined) {
            trueSpan = 'Checked'
        }
        if (falseSpan == undefined) {
            falseSpan = 'Unchecked'
        }


        var tSpan = document.createElement('span');
        $(tSpan).attr('class', 'true-value');
        $(tSpan).text(trueSpan);
        var tSpanContainer = document.createElement('div');
        $(tSpanContainer).addClass('tSpanContainer');
        $(tSpan).appendTo($(tSpanContainer));
        $(parent).append(tSpanContainer);

        var fSpan = document.createElement('span');
        $(fSpan).attr('class', 'false-value');
        $(fSpan).text(falseSpan);
        var fSpanContainer = document.createElement('div');
        $(fSpanContainer).addClass('fSpanContainer');
        $(fSpan).appendTo($(fSpanContainer));
        $(parent).append(fSpanContainer);

        var rollDiv = document.createElement('div');
        $(rollDiv).attr('class', 'cover-up-check');
        $(parent).append(rollDiv);

        // Check if it is already checked or not
        var coverUpCheck = $(parent).find('div.cover-up-check');
        var spanTrueValue = $(parent).find(".true-value");
        var spanFalseValue = $(parent).find(".false-value");

        var tSpanWidth = parseInt($(tSpan).width());
        var fSpanWidth = parseInt($(fSpan).width());

        var parentWidth = tSpanWidth + fSpanWidth + parseInt($(parent).css('padding-left')) + parseInt($(parent).css('padding-right'));
        $(parent).css('min-width', parentWidth + 'px');

        if ($(checkBox).attr('checked') == 'checked') {
            var marginL = tSpanWidth + parseInt($(parent).css('padding-left')) + parseInt($(parent).css('padding-right')) + 5;
            marginL += 'px';
            $(coverUpCheck).stop().animate({
                'width': fSpanWidth + 10 + 'px',
                'margin-left': marginL
            }, 150);
            $(coverUpCheck).addClass('cover-up-checked');
            $(spanTrueValue).stop().animate({
                'opacity': '1'
            }, 100);
            $(spanFalseValue).stop().animate({
                'opacity': '0'
            }, 100);
        } else {
            marginL = $(parent).css('padding-left');
            $(coverUpCheck).stop().animate({
                'width': tSpanWidth + parseInt($(parent).css('padding-left')) + 'px',
                'margin-left': '-' + marginL
            }, 150);
            $(coverUpCheck).removeClass('cover-up-checked');
            $(coverUpCheck).addClass('cover-up-unchecked');
        }

    }

    // On click of the checkbox
    $(".cover-up-check, .tSpanContainer, .fSpanContainer, .ip-container-check").click(function(e) {
        if ($(this).hasClass('ip-container-check')) {
            var checkBox = $(this).find('input[type="checkbox"]');
            var coverUpCheck = $(this).find('.cover-up-check');
            var spanTrueValue = $(this).find(".true-value");
            var spanFalseValue = $(this).find(".false-value");
            e.stopPropagation();
        } else {
            var checkBox = $(this).parent().find('input[type="checkbox"]');
            var coverUpCheck = $(this).parent().find('.cover-up-check');
            var spanTrueValue = $(this).parent().find(".true-value");
            var spanFalseValue = $(this).parent().find(".false-value");
            e.stopPropagation();
        }

        $(checkBox).focus();

        tSpanWidth = parseInt($(spanTrueValue).width());
        fSpanWidth = parseInt($(spanFalseValue).width());
        var parent = $(coverUpCheck).parent();

        if ($(checkBox).attr('checked') != 'checked') {
            var marginL = tSpanWidth + parseInt($(parent).css('padding-left')) + parseInt($(parent).css('padding-right')) + 5;
            marginL += 'px';
            $(coverUpCheck).stop().animate({
                'width': fSpanWidth + 10 + 'px',
                'margin-left': marginL
            }, 150);
            $(spanTrueValue).stop().animate({
                'opacity': '1'
            }, 100);
            $(spanFalseValue).stop().animate({
                'opacity': '0'
            }, 100);

            $(coverUpCheck).removeClass('cover-up-unchecked').addClass('cover-up-checked');
            $(checkBox).attr('checked', 'checked').prop("checked", false).click();
        } else {
            marginL = $(parent).css('padding-left');
            $(coverUpCheck).stop().animate({
                'width': tSpanWidth + 10 + 'px',
                'margin-left': '-' + marginL
            }, 150);
            $(spanTrueValue).stop().animate({
                'opacity': '0'
            }, 100);
            $(spanFalseValue).stop().animate({
                'opacity': '1'
            }, 100);

            $(coverUpCheck).removeClass('cover-up-checked').addClass('cover-up-unchecked');
            $(checkBox).removeAttr('checked').prop("checked", true).click();
        }
    });

    // On focus and keyboard controls change
    $('.ip-check').click(function(e) {
        e.stopPropagation();
    }).focus(function() {
        $(this).parent().addClass('ip-check-focus');
    }).blur(function() {
        $(this).parent().removeClass('ip-check-focus');
    }).change(function(e) {
        e.stopPropagation();
        var checkBox = $(this);
        var coverUpCheck = $(this).parent().find('.cover-up-check');
        var spanTrueValue = $(this).parent().find(".true-value");
        var spanFalseValue = $(this).parent().find(".false-value");

        tSpanWidth = parseInt($(spanTrueValue).width());
        fSpanWidth = parseInt($(spanFalseValue).width());
        var parent = $(this).parent();

        if ($(this).is(':checked')) {
            var marginL = tSpanWidth + parseInt($(parent).css('padding-left')) + parseInt($(parent).css('padding-right')) + 5;
            marginL += 'px';
            $(coverUpCheck).stop().animate({
                'width': fSpanWidth + 10 + 'px',
                'margin-left': marginL
            }, 150);
            $(spanTrueValue).stop().animate({
                'opacity': '1'
            }, 100);
            $(spanFalseValue).stop().animate({
                'opacity': '0'
            }, 100);

            $(coverUpCheck).removeClass('cover-up-unchecked').addClass('cover-up-checked');
            $(this).attr('checked', 'checked');
        } else {
            var marginL = $(parent).css('padding-left');
            $(coverUpCheck).stop().animate({
                'width': tSpanWidth + 10 + 'px',
                'margin-left': '-' + marginL
            }, 150);
            $(spanTrueValue).stop().animate({
                'opacity': '0'
            }, 100);
            $(spanFalseValue).stop().animate({
                'opacity': '1'
            }, 100);

            $(coverUpCheck).removeClass('cover-up-checked').addClass('cover-up-unchecked');
            $(this).removeAttr('checked');
        }
    });

    /*
     * Scrpiting radiobuttons
     */

    // Creating radio labels and elements
    var radioContainer = document.createElement('div');
    $(radioContainer).addClass('radio-container');
    $(".ip-radio").wrap(radioContainer);
    var radioParentContainer = document.createElement('div');
    $(radioParentContainer).addClass('radio-p-container');
    $('.radio-container').wrap(radioParentContainer);

    var radios = document.getElementsByClassName('ip-radio');
    for (var i = 0; i < radios.length; i++) {
        var radioLabel = $(radios[i]).attr('label');
        var label = document.createElement('label');
        $(label).addClass('radio-labels');
        $(label).text(radioLabel);
        $(radios[i]).parent().parent().append(label);
    }

    $('.inline').css('width', 'auto');
    $('.inline').find('br').remove();

    //On click of a radio
    $(".radio-container").click(function() {
        $(this).find('.ip-radio').focus();
        if ($(this).hasClass('radio-selected')) {
            $(this).find('.ip-radio').trigger('click');
        } else {
            var currentRadio = $(this).find('input[type="radio"]');
            var name = $(currentRadio).attr('name');
            var allRadiosWithName = $('input[name="' + name + '"]');
            for (var j = 0; j < allRadiosWithName.length; j++) {
                $(allRadiosWithName[j]).prop("checked", false);
                $(allRadiosWithName[j]).parent().removeClass('radio-selected');
            }
            $(this).addClass('radio-selected');
            $(currentRadio).prop("checked", true).change().click();
        }
    });

    // On focus and keyboard controls change
    $(".ip-radio").focus(function() {
        $(this).parent().addClass('ip-radio-focus');
    }).blur(function() {
        $(this).parent().removeClass('ip-radio-focus');
    }).click(function(e) {
        e.stopPropagation();
    }).change(function(e) {
        var radioParent = $(this).parent();
        if (!$(radioParent).hasClass('radio-selected')) {
            var currentRadio = $(radioParent).find('input[type="radio"]');
            var name = $(currentRadio).attr('name');
            var allRadiosWithName = $('input[name="' + name + '"]');
            for (var j = 0; j < allRadiosWithName.length; j++) {
                $(allRadiosWithName[j]).prop("checked", false);
                $(allRadiosWithName[j]).parent().removeClass('radio-selected');
            }
            $(radioParent).addClass('radio-selected');
        }
        e.stopPropagation();
    });

    /*
     * Scrpiting files
     */

    $(".ip-file").parent().addClass('ip-container');

    //Create file buttons elements
    var allFile = document.getElementsByClassName('ip-file');
    for (var i = 0; i < allFile.length; i++) {
        var fileLabel = document.createElement('label');
        var fileLabeText = $(allFile[i]).attr('label');
        $(fileLabel).text(fileLabeText);
        $(fileLabel).appendTo($(allFile[i]).parent());
    }

    $(document).on('change', ".ip-file", function() {
        var files = $(this)[0].files;
        var thisInput = $(this);
        $(thisInput).next().text($(thisInput).attr('label'));
        jQuery.each(files, function(fileNo, file) {
            if (fileNo == 0)
                $(thisInput).next().text(file['name']);
            else
                $(thisInput).next().text(fileNo + 1 + " files selected");
        });
    });

    $(".ip-file").focus(function() {
        $(this).parent().addClass('ip-file-focus');
    }).blur(function() {
        $(this).parent().removeClass('ip-file-focus');
    })

    /*
     * Scrpiting select
     */
    // Creating label
    var allSelects = $('.ip-select');
    for (var i = 0; i < allSelects.length; i++) {
        var labelName = $(allSelects[i]).attr('label');
        var span = document.createElement('span');
        $(span).attr('class', 'ip-select-label');
        $(span).text(labelName);
        $(span).appendTo($(allSelects[i]).parent());
    }

    $(".ip-select").parent().addClass('ip-container');
    $(".ip-select").prepend('<option value="" disabled="disabled" selected="selected" hidden="hidden"></option>');

    // Check if value is null by default
    var selectFields = $(".ip-select");
    $.each(selectFields, function(index, field) {
        var value = $(field).prop('selectedIndex');
        if (value != 0) {
            onSelectFocusLabel($(field).next());
        } else
            outSelectFocusLabel($(field).next());
    });

    $(".ip-select").focus(function() { // At focus of select
        onSelectFocusLabel($(this).next());
    }).blur(function() { // At focus out from select
        value = $(this).prop('selectedIndex');
        if (value != 0) {
            onSelectFocusLabel($(this).next());
        } else
            outSelectFocusLabel($(this).next());
    });

    $(".ip-select").next().click(function() {
        onSelectFocusLabel($(this));
        var selectInput = $(this).prev();
        $(selectInput).focus().prop('selectedIndex', 1);
        $(selectInput).click().change();
    });

    function onSelectFocusLabel(label) {
        var fontSize = $(label).prev().css('font-size');
        fontSize = fontSize.substring(0, fontSize.length - 2);
        fontSize = (75 / 100) * fontSize;
        fontSize += 'px';
        $(label).css({
            'font-size': fontSize,
        });
        $(label).addClass('ip-select-label-focus');
    }

    function outSelectFocusLabel(label) {
        var fontSize = $(label).prev().css('font-size');
        $(label).css({
            'font-size': fontSize
        });
        $(label).removeClass('ip-select-label-focus');
    }

    // Remove all the placeholders other than textarea
    $('.ip-text').removeAttr('placeholder');
    $('.ip-check').removeAttr('placeholder');
    $('.ip-radio').removeAttr('placeholder');
    $('.ip-button').removeAttr('placeholder');
    $('.ip-file').removeAttr('placeholder');
    $('.ip-select').removeAttr('placeholder');
});