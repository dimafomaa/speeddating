$(document).ready(function () {
    $('input[type="tel"]').inputmask("+38 (999) 999-99-99");

    $('form').on('submit', function (e) {
        e.preventDefault(); // предотвращение стандартного поведения формы
        let form = $(this);

        // Сброс классов ошибок перед проверкой и отправкой формы
        form.find('.error').removeClass('error');

        // Проверяем все поля на заполненность и добавляем класс ошибки при необходимости
        let hasEmptyField = false;
        form.find('input').each(function() {
            let input = $(this);
            if (input.hasClass('required') && input.val().trim() === '') {
                input.addClass('error');
                hasEmptyField = true;
            }
        });

        // Проверяем телефон
        let phoneNumberInput = form.find('input[type="tel"]');
        let phoneNumber = phoneNumberInput.val();
        let phoneNumberWithoutFormatting = phoneNumber.replace(/\D/g, ''); // Удаление всех нецифровых символов

        if (phoneNumberWithoutFormatting.length !== 12) {
            phoneNumberInput.addClass('error');
            hasEmptyField = true;
        }

        if (hasEmptyField) {
            return;
        }

        form.find('button[type="submit"]').prop('disabled', true);

        let loadingIcon = form.find('.loading-icon');
        loadingIcon.addClass('active');

        $.ajax({
            url: 'send-mail.php',
            type: 'POST',
            data: form.serialize(),
            success: function (data) {
                form[0].reset();
                const thankPopup = document.getElementById('modal-thank');
                popupOpen(thankPopup);
                loadingIcon.removeClass('active');
            },

            complete: function () {
                form.find('button[type="submit"]').prop('disabled', false);
            }
        });
    });

    // Добавляем проверку событий для полей ввода, чтобы убрать класс ошибки, когда пользователь начинает вводить данные
    $('form input').on('input', function() {
        $(this).removeClass('error');
    });
});
