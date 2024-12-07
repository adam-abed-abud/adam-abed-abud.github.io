function loadKeyboard() {
    const keyboard = document.getElementById('keyboard');
    const keyboardKeys = [
        ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠', 'Del '],
        ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'],
        ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
        ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'],
        ['Space'],
        ['پ','چ','گ'],
        ['لآ', 'آ', ',','.','؟',';']
    ];

    keyboardKeys.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'key-row';
        keyboard.appendChild(rowDiv);

        row.forEach(key => {
            const keyButton = document.createElement('button');
            keyButton.className = 'key';
            keyButton.textContent = key;

            if (key === "Space") {
                keyButton.classList.add('space-key');
                keyButton.textContent = ''; // Optionally set text content if needed
            } else if (key === "Delete") {
                keyButton.classList.add('delete-key');
            }

            rowDiv.appendChild(keyButton);
        });
    });
}

document.addEventListener('DOMContentLoaded', loadKeyboard);