var ko_calendar = function() {
    var result = {};

    function log(message) {}

    function error(message) {
        if (typeof console == "object" && typeof console.error == "function") {
            console.error(message);
        }
    }

    function buildDate(entry) {
        var dateString = ko_calendar_loc.all_day_event;
        var startTime = getStartTime(entry);
        var endTime = getEndTime(entry);
        if (startTime && endTime) {
            var startJSDate = startTime.getDate();
            var endJSDate = endTime.getDate();
            var allDayEvent = false;
            if (startTime.isDateOnly() && endTime.isDateOnly()) {
                endJSDate.setDate(endJSDate.getDate() - 1);
                if (endJSDate.getTime() == startJSDate.getTime()) {
                    allDayEvent = true;
                }
            }
            var oneDayEvent = false; {
                var startDay = new Date(startJSDate.getFullYear(), startJSDate.getMonth(), startJSDate.getDate());
                var endDay = new Date(endJSDate.getFullYear(), endJSDate.getMonth(), endJSDate.getDate());
                if (startDay.getTime() == endDay.getTime()) {
                    oneDayEvent = true;
                }
            }
            if (allDayEvent) {
                dateString = ko_calendar_loc.all_day_event;
            } else if (oneDayEvent) {
                dateString = startJSDate.toString("ddd, MMM d, yyyy");
                dateString += ', ';
                dateString += startJSDate.toString("h:mm tt");
                dateString += ' - ';
                dateString += endJSDate.toString("h:mm tt");
            } else {
                if (!startTime.isDateOnly()) {
                    dateString = startJSDate.toString("ddd, MMM d, yyyy h:mm tt");
                } else {
                    dateString = startJSDate.toString("ddd, MMM d, yyyy");
                }
                dateString += ' - ';
                if (!endTime.isDateOnly()) {
                    dateString += endJSDate.toString("ddd, MMM d, yyyy h:mm tt");
                } else {
                    dateString += endJSDate.toString("ddd, MMM d, yyyy");
                }
            }
        }
        var dateRow = document.createElement('div');
        dateRow.setAttribute('className', 'ko-calendar-entry-date-row');
        dateRow.setAttribute('class', 'ko-calendar-entry-date-row');
        dateDisplay = document.createElement('div');
        dateDisplay.innerHTML = dateString;
        dateDisplay.setAttribute('className', 'ko-calendar-entry-date-text');
        dateDisplay.setAttribute('class', 'ko-calendar-entry-date-text');
        dateRow.appendChild(dateDisplay);
        return dateRow;
    }

    function buildLocation(entry) {
        var locationDiv = document.createElement('div');
        var locationString = entry.location;
        if (locationString != null) {
            locationDiv.appendChild(document.createTextNode(locationString));
            locationDiv.setAttribute('className', 'ko-calendar-entry-location-text');
            locationDiv.setAttribute('class', 'ko-calendar-entry-location-text');
        }
        return locationDiv;
    }

    function formatEventDetails(titleFormat, event) {
        var startTimeString = null;
        var endTimeString = null;
        var title = event.summary;
        var startDateTime = getStartTime(event);
        var endDateTime = getEndTime(event);
        if (startDateTime) {
            if (startDateTime.isDateOnly()) {
                startTimeString = ko_calendar_loc.all_day;
            } else {
                startTimeString = startDateTime.getDate().toString("h:mm tt");
                if (endDateTime) {
                    endTimeString = endDateTime.getDate().toString("h:mm tt");
                }
            }
        }

        function replaceTITLE(strMatchingString, strGroup1, strGroup2) {
            return title ? strGroup1 + title + strGroup2 : "";
        }

        function replaceSTARTTIME(strMatchingString, strGroup1, strGroup2) {
            return startTimeString ? strGroup1 + startTimeString + strGroup2 : "";
        }

        function replaceENDTIME(strMatchingString, strGroup1, strGroup2) {
            return endTimeString ? strGroup1 + endTimeString + strGroup2 : "";
        }
        var output = titleFormat.replace(/\[([^\]]*)TITLE([^\]]*)\]/g, replaceTITLE);
        output = output.replace(/\[([^\]]*)STARTTIME([^\]]*)\]/g, replaceSTARTTIME);
        output = output.replace(/\[([^\]]*)ENDTIME([^\]]*)\]/g, replaceENDTIME);
        return output;
    }

    function getTime(calendarTime) {
        result = {
            "getDate": function() {
                if (calendarTime.dateTime) {
                    return new Date(calendarTime.dateTime);
                } else if (calendarTime.date) {
                    var date = new Date(calendarTime.date);
                    date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
                    return date;
                }
                return null;
            },
            "isDateOnly": function() {
                return calendarTime.date != null
            }
        }
        return result;
    }

    function getStartTime(calendarEntry) {
        var result = null;
        if (calendarEntry != null) {
            result = getTime(calendarEntry.start);
        }
        return result;
    }

    function getEndTime(calendarEntry) {
        var result = null;
        if (calendarEntry != null) {
            result = getTime(calendarEntry.end);
        }
        return result;
    }

    function createClickHandler(item, entry) {
        var descDiv = null;
        return function() {
            if (descDiv == null) {
                descDiv = document.createElement('div');
                descDiv.appendChild(buildDate(entry));
                descDiv.appendChild(buildLocation(entry));
                bodyDiv = document.createElement('div');
                bodyDiv.setAttribute('className', 'ko-calendar-entry-body');
                bodyDiv.setAttribute('class', 'ko-calendar-entry-body');
                bodyDiv.innerHTML = Wiky.toHtml(entry.description != null ? entry.description : "");
                descDiv.appendChild(bodyDiv);
                item.appendChild(descDiv);
            } else {
                item.removeChild(descDiv);
                descDiv = null;
            }
        }
    }

    function createListEvents(titleId, outputId, maxResults, autoExpand, googleService, calendars, titleFormat) {
        function mergeFeeds(resultObject) {
            var entries = new Array();
            for (var key in resultObject) {
                var entry = resultObject[key].result
                if (entry) {
                    if (entry.error) {
                        error("Error downloading Calendar " + key + " : " + entry.error.message);
                    } else {
                        log("Feed " + key + " has " + entry.items.length + " entries");
                        entries.push(entry.items);
                    }
                }
            }
            log("Merging " + entries.length + " feeds into " + maxResults + " results.");
            var output = new Array();
            while (output.length < maxResults) {
                var firstStartTime = null;
                var firstStartIndex = null;
                for (var i = 0; i < entries.length; i++) {
                    var startTime = getStartTime(entries[i][0]);
                    if (startTime != null) {
                        var startDate = startTime.getDate();
                        if (firstStartTime == null || startDate < firstStartTime) {
                            firstStartTime = startDate;
                            firstStartIndex = i;
                        }
                    }
                }
                if (firstStartTime != null) {
                    var uid = entries[firstStartIndex][0].id;
                    log("Pushing " + firstStartTime + " " + uid);
                    var uniqueEntry = true;
                    if (output.length > 0) {
                        var lastOutput = output[output.length - 1];
                        var lastStartTime = getStartTime(lastOutput);
                        var lastUid = lastOutput.id;
                        if ((lastStartTime.getDate().getTime() == firstStartTime.getTime()) && (lastUid == uid)) {
                            log("Duplicate event");
                            uniqueEntry = false;
                        }
                    }
                    if (uniqueEntry) {
                        output.push(entries[firstStartIndex].shift());
                    } else {
                        entries[firstStartIndex].shift();
                    }
                } else {
                    break;
                }
            }
            return output;
        }

        function processFinalFeed(feedRoot) {
            var entries = feedRoot;
            var eventDiv = document.getElementById(outputId);
            while (eventDiv.childNodes.length > 0) {
                eventDiv.removeChild(eventDiv.childNodes[0]);
            }
            var prevDateString = null;
            var eventList = null;
            var len = entries.length;
            for (var i = 0; i < len; i++) {
                var entry = entries[i];
                var title = entry.summary;
                var startDateTime = getStartTime(entry);
                var startJSDate = startDateTime ? startDateTime.getDate() : null;
                var entryLinkHref = null;
                if (entry.htmlLink != null) {
                    entryLinkHref = entry.htmlLink;
                }
                dateString = startJSDate.toString('MMM dd');
                if (dateString != prevDateString) {
                    if (eventList != null) {
                        eventDiv.appendChild(eventList);
                    }
                    var dateDiv = document.createElement('div');
                    dateDiv.setAttribute('className', 'ko-calendar-date');
                    dateDiv.setAttribute('class', 'ko-calendar-date');
                    dateDiv.appendChild(document.createTextNode(dateString));
                    eventDiv.appendChild(dateDiv);
                    eventList = document.createElement('div');
                    eventList.setAttribute('className', 'ko-calendar-event-list');
                    eventList.setAttribute('class', 'ko-calendar-event-list');
                    prevDateString = dateString;
                }
                var li = document.createElement('div'); {
                    var entryTitle = document.createElement('a');
                    entryTitle.setAttribute('className', 'ko-calendar-entry-title');
                    entryTitle.setAttribute('class', 'ko-calendar-entry-title');
                    entryTitle.setAttribute('href', "javascript:;");
                    var titleString = formatEventDetails(titleFormat, entry);
                    entryTitle.innerHTML = titleString;
                    entryTitle.onclick = createClickHandler(li, entry);
                    li.appendChild(entryTitle);
                    if (autoExpand) {
                        entryTitle.onclick();
                    }
                }
                eventList.appendChild(li);
            }
            if (eventList != null) {
                eventDiv.appendChild(eventList);
            }
        }
        var batch = gapi.client.newBatch();
        for (var calenderIndex = 0; calenderIndex < calendars.length; calenderIndex++) {
            var idString = calendars[calenderIndex];
            if (idString != undefined && idString != '') {
                var idArray = idString.split(',');
                for (var idIndex = 0; idIndex < idArray.length; idIndex++) {
                    var calendarId = idArray[idIndex];
                    var timeMin = new Date().toISOString();
                    var params = {
                        'maxResults': maxResults,
                        'calendarId': calendarId,
                        'singleEvents': true,
                        'orderBy': 'startTime',
                        'timeMin': timeMin
                    };
                    batch.add(googleService.events.list(params), {
                        'id': calendarId
                    });
                }
            }
        }
        batch.then(function(resp) {
            var finalFeed = mergeFeeds(resp.result);
            processFinalFeed(finalFeed);
        });
    }

    function loadCalendar(apiKey, titleId, outputId, maxResults, autoExpand, calendars, titleFormat) {
        if (typeof ko_calendar_loc === 'undefined') {
            ko_calendar_loc = {
                'all_day': 'All Day',
                'all_day_event': 'All Day Event'
            };
        }
        gapi.client.setApiKey(apiKey);
        gapi.client.load("calendar", "v3").then(function(result) {
            if (result && result.error) {
                error("Error loading calendar client API (Could be due to an invalid API Key) : " + result.error.message);
            } else {
                createListEvents(titleId, outputId, maxResults, autoExpand, gapi.client.calendar, calendars, titleFormat);
            }
        });
    }
    var callbacks = []

    function addInitCallback(func) {
        if (callbacks != null) {
            callbacks.push(func);
        } else {
            func();
        }
    }

    function runInitCallbacks() {
        if (callbacks != null) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i]();
            }
            callbacks = null;
        }
    }
    result.loadCalendarDefered = function(apiKey, titleId, outputId, maxResults, autoExpand, calendarUrl, calendarUrl2, calendarUrl3, titleFormat) {
        var calendars = new Array();
        calendars.push(calendarUrl);
        calendars.push(calendarUrl2);
        calendars.push(calendarUrl3);
        addInitCallback(function() {
            loadCalendar(apiKey, titleId, outputId, maxResults, autoExpand, calendars, titleFormat)
        });
    }
    result.init = function() {
        runInitCallbacks();
    }
    return result;
}();

function ko_calendar_google_init() {
    ko_calendar.init();
}