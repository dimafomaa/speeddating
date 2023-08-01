$(document).ready(function() {

	$('input[type="tel"]').inputmask("+38 (999) 999-99-99");

	$('form').on('submit', function (e) {
		e.preventDefault(); // предотвращение стандартного поведения формы
		let form = $(this);

		
		let phoneNumberInput = form.find('input[type="tel"]');// Проверка, что номер телефона полностью введен
		let phoneNumber = phoneNumberInput.val();
		let phoneNumberWithoutFormatting = phoneNumber.replace(/\D/g, ''); // Удаление всех нецифровых символов

		if (phoneNumberWithoutFormatting.length !== 12) {
			
			phoneNumberInput.addClass('error');// Если номер телефона не полный (12 цифр), бордер красным
			return;
		}

		// Если номер телефона полный, удалить класс ошибки
		phoneNumberInput.removeClass('error');


        // спам-блокировка кнопки отправки формы
		form.find('button[type="submit"]').prop('disabled', true);
		
		
		let loadingIcon = form.find('.loading-icon');
        loadingIcon.addClass('active'); // показ иконки loading
		
		// отправка формы с помощью AJAX
		$.ajax({
			url: 'send-mail.php',
			type: 'POST',
			data: form.serialize(),
			success: function (data) {
				form[0].reset(); // очистка формы
				// Открываем модальное окно благодарности после успешной отправки
				const thankPopup = document.getElementById('modal-thank');
				popupOpen(thankPopup);
				
				loadingIcon.removeClass('active');
				
			},
			
			complete: function() {
				// разблокировка кнопки отправки формы
				form.find('button[type="submit"]').prop('disabled', false);
			}
			
		});
	});
	
});
