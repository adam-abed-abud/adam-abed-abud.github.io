const emojis = {
    "Smileys & Emotion": ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍"],
    "People & Body": ["👋", "🤚", "🖐", "✋", "🖖", "👌", "🤏", "✌️", "🤞", "🤟", "🤘", "👍", "👎", "✊", "👊"],
    "Animals & Nature": ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸"],
    "Food & Drink": ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🍍", "🥭", "🥥"],
    "Travel & Places": ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🏍️", "🛵"],
    "Activities": ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍"],
    "Objects": ["💼", "🎒", "👝", "👛", "👜", "💼", "🎒", "👝", "👛", "👜", "👓", "🕶️", "🥽", "🥼", "🦺"],
    "Symbols": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗"],
    "Flags": ["🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍🌈", "🏳️‍⚧️", "🏴‍☠️", "🇺🇳", "🇪🇺", "🇺🇸", "🇬🇧", "🇫🇷", "🇩🇪", "🇮🇹"]
};


function loadEmojis() {
    const emojiDropdown = document.getElementById('emojiDropdown');
    const tabs = document.createElement('div');
    tabs.className = 'emoji-tabs';
    emojiDropdown.appendChild(tabs);
    const sections = document.createElement('div');
    sections.className = 'emoji-sections';
    emojiDropdown.appendChild(sections);

    let first = true;
    for (const category in emojis) {
        // Create tab
        const tab = document.createElement('button');
        tab.className = 'emoji-tab';
        tab.textContent = category;
        if (first) {
            tab.classList.add('active');
            first = false;
        }
        tabs.appendChild(tab);

        // Create section
        const section = document.createElement('div');
        section.className = 'emoji-section';
        if (!tab.classList.contains('active')) {
            section.style.display = 'none';
        }

        emojis[category].forEach(emoji => {
            const emojiDiv = document.createElement('div');
            emojiDiv.className = 'emoji';
            emojiDiv.textContent = emoji;
            section.appendChild(emojiDiv);
        });

        sections.appendChild(section);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadEmojis();

    // Switch tabs
    const tabs = document.querySelectorAll('.emoji-tab');
    const sections = document.querySelectorAll('.emoji-section');
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function () {
            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add('active');
                    sections[i].style.display = 'block';
                } else {
                    tab.classList.remove('active');
                    sections[i].style.display = 'none';
                }
            });
        });
    });
});
