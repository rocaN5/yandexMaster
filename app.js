document.addEventListener("DOMContentLoaded", function() {
    const togglerWrapper = document.querySelector('.toggler-wrapper');
    const checkboxInputs = document.querySelectorAll('.toggler-wrapper input[type="checkbox"]');
    const extraOptionDivs = document.querySelectorAll('.extraOption');
    const extraOptionHolderDivs = document.querySelectorAll('.extraOptionHolder');
    const togglerSlider = togglerWrapper.querySelector('.toggler-slider');

    function updateMainOptionClass() {
        let isChecked = false;
        checkboxInputs.forEach(function(input) {
            if (input.checked) {
                isChecked = true;
            }
        });

        if (!isChecked) {
            extraOptionDivs.forEach(function(div) {
                div.classList.add('mainOptionUnchecked');
                const checkboxInput = div.querySelector('input[type="checkbox"]');
                if (checkboxInput) {
                    checkboxInput.disabled = true;
                }
            });
        } else {
            extraOptionDivs.forEach(function(div) {
                div.classList.remove('mainOptionUnchecked');
                const checkboxInput = div.querySelector('input[type="checkbox"]');
                if (checkboxInput) {
                    checkboxInput.disabled = false;
                }
            });
        }
    }

    function shakeToggleWrapper() {
        togglerSlider.style.animation = 'horizontal-shaking 0.35s';
        setTimeout(function() {
            togglerSlider.style.animation = '';
        }, 400);
    }

    extraOptionHolderDivs.forEach(function(optionHolder) {
        optionHolder.addEventListener('click', function() {
            if (!checkboxInputs[0].checked) {
                shakeToggleWrapper();
            } else {
                return;
            }
        });
    });

    extraOptionDivs.forEach(function(div) {
        const checkboxInput = div.querySelector('input[type="checkbox"]');
        if (checkboxInput) {
            checkboxInput.addEventListener('change', function() {
                updateMainOptionClass();
                saveCheckboxStates();
            });
        }
    });

    checkboxInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            updateMainOptionClass();
            saveCheckboxStates();
        });
    });

    function saveCheckboxStates() {
        checkboxInputs.forEach(function(input, index) {
            localStorage.setItem('checkbox' + index, input.checked);
        });

        extraOptionDivs.forEach(function(div, index) {
            const checkboxInput = div.querySelector('input[type="checkbox"]');
            if (checkboxInput) {
                localStorage.setItem('extraCheckbox' + index, checkboxInput.checked);
            }
        });
    }

    function loadCheckboxStates() {
        checkboxInputs.forEach(function(input, index) {
            const checked = localStorage.getItem('checkbox' + index) === 'true';
            input.checked = checked;
        });

        extraOptionDivs.forEach(function(div, index) {
            const checkboxInput = div.querySelector('input[type="checkbox"]');
            if (checkboxInput) {
                const checked = localStorage.getItem('extraCheckbox' + index) === 'true';
                checkboxInput.checked = checked;
            }
        });
    }

    loadCheckboxStates();
    updateMainOptionClass();
});
