function updateSuggestionPosition() {
    const keyboardHeight = 300; // This should be dynamically calculated or set based on your app's UI
    const suggestionBox = document.getElementById('local-suggestions');
    suggestionBox.style.bottom = `${keyboardHeight}px`;
}

document.addEventListener('DOMContentLoaded', function () {
    updateSuggestionPosition(); // Update position on load
    window.addEventListener('resize', updateSuggestionPosition); // Update on resize if necessary

    const textOutput = document.getElementById('textOutput');
    const copyButton = document.getElementById('copyButton');
    const notification = document.getElementById('notification');
    const emojiButton = document.getElementById('emojiButton');
    const emojiDropdown = document.getElementById('emojiDropdown');
    const keyboard = document.getElementById('keyboard');
    const localSuggestionBox = document.getElementById('local-suggestions');
    const wikipediaSuggestionBox = document.getElementById('wikipedia-suggestions');
    const clearButton = document.getElementById('clearButton');

    let savedSelection;
    let currentFocus = -1;
    let debounceTimeout = null;


    localSuggestionBox.style.display = 'block';

    clearButton.addEventListener('click', function () {
        textOutput.value = '';
    });

    textOutput.addEventListener('blur', function () {
        savedSelection = [textOutput.selectionStart, textOutput.selectionEnd];
    });

    textOutput.addEventListener('input', function () {
        const value = this.value;
        closeAllLists();
        if (!value) return false;

        currentFocus = -1;

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const words = value.split(' ');
            const lastWord = words[words.length - 1];
            if (lastWord.length >= 3) {
                fetchSuggestions(lastWord);
            }
        }, 300);
    });


    function fetchLocalSuggestions(query) {
        closeAllLists();
        if (!query.trim()) {
            return;
        }
    
        const gistUrl = 'https://raw.githubusercontent.com/adam-abed-abud/arabic-words-list/main/arabic-words.txt';
    
        fetch(gistUrl)
            .then(response => response.text())
            .then(data => {
                const wordList = data.split('\n');
                const regex = new RegExp(`^${query}`, 'i');
                const suggestions = wordList.filter(word => regex.test(word));
    
                localSuggestionBox.style.display = 'block';
    
                if (suggestions.length === 0) {
                    const item = document.createElement('div');
                    item.textContent = 'No local suggestions';
                    localSuggestionBox.appendChild(item);
                    return;
                }
    
                suggestions.slice(0, 10).forEach(function(suggestion) {
                    const item = document.createElement('div');
                    item.innerHTML = `<strong>${suggestion.substr(0, query.length)}</strong>${suggestion.substr(query.length)}`;
                
                    item.addEventListener('click', function () {
                        textOutput.value = suggestion;
                        closeAllLists();
                    });
                
                    localSuggestionBox.appendChild(item);
                });
            })
            .catch(error => console.error('Error:', error));
    }



    
    function fetchWikipediaSuggestions(query) {
        if (!query.trim()) {
            closeAllLists();
            return;
        }
    
        const apiUrl = `https://ar.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURIComponent(query)}&limit=10&namespace=0&format=json`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const suggestions = data[1];
                const links = data[3];
    
                wikipediaSuggestionBox.style.display = 'block';
    
                const title = document.createElement('h2');
                title.textContent = 'Wikipedia';
                wikipediaSuggestionBox.appendChild(title);
    
                if (suggestions.length === 0) {
                    const item = document.createElement('div');
                    item.textContent = 'No Wikipedia suggestions';
                    wikipediaSuggestionBox.appendChild(item);
                    return;
                }
    
                suggestions.forEach(function(suggestion, index) {
                    const item = document.createElement('div');
                    item.innerHTML = `<strong>${suggestion.substr(0, query.length)}</strong>${suggestion.substr(query.length)}`;
                
                    const link = document.createElement('a');
                    link.href = links[index];
                    link.textContent = ' [wiki]';
                    link.target = '_blank';
                    item.appendChild(link);
                
                    item.addEventListener('click', function (e) {
                        if (e.target !== link) {
                            textOutput.value = suggestion;
                            closeAllLists();
                        }
                    });
                
                    wikipediaSuggestionBox.appendChild(item);
                });


            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
                closeAllLists();
            });
    }


    function fetchSuggestions(query) {
        // if (query.length > 5) {
        //     fetchWikipediaSuggestions(query);
        // } else {
            fetchLocalSuggestions(query);
            fetchWikipediaSuggestions(query);
        // }
    }

    function closeAllLists() {
        while (localSuggestionBox.firstChild) {
            localSuggestionBox.removeChild(localSuggestionBox.firstChild);
        }
        localSuggestionBox.style.display = 'none';

        while (wikipediaSuggestionBox.firstChild) {
            wikipediaSuggestionBox.removeChild(wikipediaSuggestionBox.firstChild);
        }
        wikipediaSuggestionBox.style.display = 'none';
    }

    keyboard.addEventListener('click', function (e) {
        handleKeyClick(e);
    });
    
    keyboard.addEventListener('touchstart', function (e) {
        e.preventDefault(); // Prevent scrolling when touching the keys
        handleKeyClick(e);
    });
    
    function handleKeyClick(e) {
        if (e.target.classList.contains('key')) {
            if (e.target.classList.contains('space-key')) {
                textOutput.value += ' ';
            } else if (e.target.classList.contains('delete-key')) {
                textOutput.value = textOutput.value.slice(0, -1);
            } else {
                textOutput.value += e.target.textContent;
            }

            e.target.classList.add('clicked');
            setTimeout(() => {
                e.target.classList.remove('clicked');
            }, 500);

            textOutput.focus();
            textOutput.dispatchEvent(new Event('input')); // Manually trigger the input event
        }
    };


    emojiButton.addEventListener('click', function (e) {
        if (!emojiButton.contains(e.target) && !emojiDropdown.contains(e.target) && emojiDropdown.classList.contains('show')) {
            emojiDropdown.classList.remove('show');
        }
    });

    copyButton.addEventListener('click', function () {
        textOutput.select();
        document.execCommand('copy');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    });

    emojiButton.addEventListener('click', function () {
        emojiDropdown.classList.toggle('show');
    });

    emojiDropdown.addEventListener('click', function (e) {
        if (e.target.classList.contains('emoji')) {
            textOutput.focus();
            textOutput.selectionStart = savedSelection[0];
            textOutput.selectionEnd = savedSelection[1];
            textOutput.setRangeText(e.target.textContent, textOutput.selectionStart, textOutput.selectionEnd, 'end');
        }
    });

    document.addEventListener('click', function (e) {
        if (!localSuggestionBox.contains(e.target)) {
            closeAllLists();
        }
    });
});