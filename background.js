chrome.commands.onCommand.addListener(function (name) {
    console.log(name);
    switch (name) {
        case 'switch-tab-focus-left':
            focus_tab(-1);
            break;
        case 'switch-tab-focus-right':
            focus_tab(1);
            break;
    }
});

function focus_tab(direction_right) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
        var active_tab = tab[0];

        chrome.tabs.query({currentWindow: true}, function (tabs) {
            var next_index = (active_tab.index + tabs.length + 1 * direction_right) % tabs.length;
            var next_tab_id;
            tabs.forEach(function (t) {
                if (t.index == next_index) {
                    next_tab_id = t.id;
                    console.log(t.index);
                }
            });
            chrome.tabs.update(next_tab_id, {active: true});
        })
    });
}